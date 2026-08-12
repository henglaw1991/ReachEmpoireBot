from flask import Flask, jsonify, send_from_directory
from pathlib import Path
from urllib.error import URLError
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import json

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=str(BASE_DIR))


@app.after_request
def add_api_headers(response):
    if response.content_type and "application/json" in response.content_type:
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Cache-Control"] = "public, max-age=15, stale-while-revalidate=45"
    return response

MARKET_SYMBOLS = [
    {"group": "Forex", "label": "EUR/USD", "yahoo": "EURUSD=X", "decimals": 5},
    {"group": "Forex", "label": "GBP/USD", "yahoo": "GBPUSD=X", "decimals": 5},
    {"group": "Forex", "label": "USD/JPY", "yahoo": "JPY=X", "decimals": 3},
    {"group": "Crypto", "label": "BTC/USD", "yahoo": "BTC-USD", "decimals": 2},
    {"group": "Crypto", "label": "ETH/USD", "yahoo": "ETH-USD", "decimals": 2},
    {"group": "Metal", "label": "XAU/USD", "yahoo": "GC=F", "decimals": 2},
    {"group": "Metal", "label": "XAG/USD", "yahoo": "SI=F", "decimals": 3},
]


def fetch_yahoo_quote(symbol):
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=1d&interval=1m"
    request = Request(url, headers={"User-Agent": "ReachEmpireBot/1.0"})
    with urlopen(request, timeout=8) as response:
        payload = json.loads(response.read().decode("utf-8"))

    result = payload["chart"]["result"][0]
    meta = result.get("meta", {})
    price = meta.get("regularMarketPrice")
    previous = meta.get("chartPreviousClose") or meta.get("previousClose")

    if price is None:
        closes = result.get("indicators", {}).get("quote", [{}])[0].get("close", [])
        price = next((value for value in reversed(closes) if value is not None), None)

    change = None
    percent = None
    if price is not None and previous:
        change = price - previous
        percent = (change / previous) * 100

    return price, change, percent

@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/api/quotes")
def quotes():
    def load(symbol):
        item = {key: symbol[key] for key in ("group", "label", "decimals")}
        try:
            price, change, percent = fetch_yahoo_quote(symbol["yahoo"])
            item.update({"price": price, "change": change, "percent": percent, "live": True})
        except Exception:
            item.update({"price": None, "change": None, "percent": None, "live": False})
        return item

    with ThreadPoolExecutor(max_workers=len(MARKET_SYMBOLS)) as executor:
        items = list(executor.map(load, MARKET_SYMBOLS))
    return jsonify({"items": items})

@app.route("/<path:path>")
def static_proxy(path):
    return send_from_directory(BASE_DIR, path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
