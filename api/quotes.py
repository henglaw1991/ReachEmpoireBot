from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler
from urllib.parse import quote
from urllib.request import Request, urlopen
import json


SYMBOLS = (
    {"group": "Forex", "label": "EUR/USD", "yahoo": "EURUSD=X", "decimals": 5},
    {"group": "Forex", "label": "GBP/USD", "yahoo": "GBPUSD=X", "decimals": 5},
    {"group": "Forex", "label": "USD/JPY", "yahoo": "JPY=X", "decimals": 3},
    {"group": "Crypto", "label": "BTC/USD", "yahoo": "BTC-USD", "decimals": 2},
    {"group": "Crypto", "label": "ETH/USD", "yahoo": "ETH-USD", "decimals": 2},
    {"group": "Metal", "label": "XAU/USD", "yahoo": "GC=F", "decimals": 2},
    {"group": "Metal", "label": "XAG/USD", "yahoo": "SI=F", "decimals": 3},
)


def fetch_quote(symbol):
    item = {key: symbol[key] for key in ("group", "label", "decimals")}
    try:
        url = "https://query1.finance.yahoo.com/v8/finance/chart/{}?range=1d&interval=1m".format(
            quote(symbol["yahoo"], safe="")
        )
        request = Request(url, headers={"User-Agent": "Mozilla/5.0 ReachEmpireBot-Market/1.0"})
        with urlopen(request, timeout=6) as response:
            payload = json.loads(response.read().decode("utf-8"))
        result = payload["chart"]["result"][0]
        meta = result.get("meta", {})
        price = meta.get("regularMarketPrice")
        previous = meta.get("chartPreviousClose") or meta.get("previousClose")
        if price is None:
            closes = result.get("indicators", {}).get("quote", [{}])[0].get("close", [])
            price = next((value for value in reversed(closes) if value is not None), None)
        percent = ((price - previous) / previous * 100) if price is not None and previous else 0
        item.update({"price": price, "change": (price - previous) if price is not None and previous else None,
                     "percent": percent, "live": price is not None})
    except Exception:
        item.update({"price": None, "change": None, "percent": None, "live": False})
    return item


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        with ThreadPoolExecutor(max_workers=len(SYMBOLS)) as executor:
            items = list(executor.map(fetch_quote, SYMBOLS))
        body = json.dumps({
            "items": items,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "source": "Yahoo Finance",
        }).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "s-maxage=15, stale-while-revalidate=45")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)
