(function () {
  'use strict';
  var API = (window.REB_API_BASE || 'https://admin.reachempirebot.com').replace(/\/$/, '');
  var symbol = document.getElementById('rebTrendSymbol');
  var timeframe = document.getElementById('rebTrendTimeframe');
  var refresh = document.getElementById('rebTrendRefresh');
  var timer = null;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character];
    });
  }
  function tfLabel(value) {
    return {'1':'1m','3':'3m','5':'5m','15':'15m','30':'30m','45':'45m','60':'1H','120':'2H','180':'3H','240':'4H','D':'1D','W':'1W','M':'1M'}[value] || value;
  }
  function normalizeTrend(value) {
    value = String(value || '').toUpperCase().replace(/\s+/g, '');
    if (value === 'BULLISH' || value === 'UP') return 'UPTREND';
    if (value === 'BEARISH' || value === 'DOWN') return 'DOWNTREND';
    if (value === 'RANGE' || value === 'RANGING' || value === 'NEUTRAL') return 'SIDEWAYS';
    return value;
  }
  function value(id, content) {
    var element = document.getElementById(id);
    if (element) element.textContent = content === null || content === undefined || content === '' ? '—' : content;
  }
  function setConnection(ok, text) {
    var pill = document.getElementById('rebTrendLivePill');
    if (!pill) return;
    pill.innerHTML = '<span class="reb-live-dot"></span><span>' + esc(text) + '</span>';
    pill.style.borderColor = ok ? 'rgba(34,197,94,.35)' : 'rgba(245,176,38,.35)';
    pill.style.color = ok ? '#7df0a5' : '#f5b026';
  }
  function loadChart() {
    var selectedSymbol = (symbol.value || 'OANDA:XAUUSD').trim().toUpperCase();
    var selectedTimeframe = timeframe.value;
    value('rebChartTitle', selectedSymbol + ' · ' + tfLabel(selectedTimeframe));
    var box = document.getElementById('rebTradingViewChart');
    box.innerHTML = '<div class="tradingview-widget-container" style="height:100%;width:100%"><div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div></div>';
    var script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.text = JSON.stringify({autosize:true,symbol:selectedSymbol,interval:selectedTimeframe,timezone:'Etc/UTC',theme:'dark',style:'1',locale:'en',allow_symbol_change:true,hide_side_toolbar:false,withdateranges:true,save_image:true,calendar:false,support_host:'https://www.tradingview.com'});
    box.firstChild.appendChild(script);
  }
  function renderItem(item) {
    item = item || {};
    var trend = normalizeTrend(item.trend);
    var state = document.getElementById('rebTrendState');
    state.className = 'reb-trend-state ' + (trend === 'UPTREND' ? 'uptrend' : trend === 'DOWNTREND' ? 'downtrend' : trend === 'SIDEWAYS' ? 'sideways' : 'waiting');
    value('rebTrendDirection', trend || 'Awaiting Analysis');
    value('rebTrendStructure', item.structure);
    var signal = item.entry_signal || item.signal;
    value('rebTrendEntry', signal || 'WAIT');
    value('rebTrendSweep', item.liquidity_sweep || item.sweep);
    value('rebTrendSession', item.session);
    value('rebTrendFvg', item.fvg_active);
    value('rebTrendIfvg', item.ifvg_active);
    value('rebTrendPrice', item.price);
    var strength = item.trend_score != null ? 'Score ' + item.trend_score + '/100' : (item.strength != null ? item.strength : item.adx);
    if (item.adx != null) strength += ' · ADX ' + item.adx;
    value('rebTrendStrength', strength);
    value('rebTrendSupport', item.support);
    value('rebTrendResistance', item.resistance);
    value('rebTrendUpdated', item.updated_at ? 'Updated ' + new Date(item.updated_at).toLocaleString() : 'Waiting for analysis');
  }
  function renderHistory(items) {
    var body = document.getElementById('rebTrendHistory');
    if (!items || !items.length) {
      body.innerHTML = '<tr><td class="reb-history-empty" colspan="6">Automatic analysis is waiting for OHLC market data.</td></tr>';
      return;
    }
    body.innerHTML = items.map(function (item) {
      return '<tr><td>' + esc(item.updated_at ? new Date(item.updated_at).toLocaleString() : '—') + '</td><td>' + esc(normalizeTrend(item.trend) || '—') + '</td><td>' + esc(item.structure || '—') + '</td><td>' + esc(item.entry_signal || item.signal || '—') + '</td><td>' + esc(item.liquidity_sweep || item.sweep || '—') + '</td><td>' + esc(item.price == null ? '—' : item.price) + '</td></tr>';
    }).join('');
  }
  function fetchTrend() {
    var selectedSymbol = (symbol.value || '').trim().toUpperCase();
    var selectedTimeframe = timeframe.value;
    if (!selectedSymbol) return;
    setConnection(false, 'Calculating Auto ICT');
    fetch(API + '/api/market-trends?symbol=' + encodeURIComponent(selectedSymbol) + '&timeframe=' + encodeURIComponent(selectedTimeframe) + '&limit=12&_=' + Date.now(), {cache:'no-store',mode:'cors',headers:{Accept:'application/json'}})
      .then(function (response) { if (!response.ok) throw new Error('API ' + response.status); return response.json(); })
      .then(function (data) {
        var item = data.item || data.latest || null;
        var items = data.history || data.items || [];
        if (item) {
          renderItem(item);
          setConnection(true, item.automatic ? 'Auto ICT Live' : 'Stored ICT Data');
          value('rebTrendNote', item.automatic ? 'Automatic ICT analysis calculated from live OHLC candles. No TradingView alert or webhook is required.' : 'Stored ICT data is displayed while the market-data provider reconnects.');
        } else {
          renderItem({});
          setConnection(false, 'Market data unavailable');
          value('rebTrendNote', data.provider_error || 'The Backend could not calculate this symbol and timeframe yet.');
        }
        renderHistory(items);
      })
      .catch(function () {
        renderItem({});
        renderHistory([]);
        setConnection(false, 'Auto ICT API unavailable');
        value('rebTrendNote', 'The automatic Market Trends API cannot be reached. The TradingView chart can still load independently.');
      });
  }
  function loadAll() {
    symbol.value = (symbol.value || 'OANDA:XAUUSD').trim().toUpperCase();
    loadChart();
    fetchTrend();
    clearInterval(timer);
    timer = setInterval(fetchTrend, 30000);
  }
  refresh.addEventListener('click', loadAll);
  timeframe.addEventListener('change', loadAll);
  symbol.addEventListener('keydown', function (event) { if (event.key === 'Enter') { event.preventDefault(); loadAll(); } });
  loadAll();
})();
