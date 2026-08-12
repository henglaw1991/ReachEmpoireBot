ReachEmpireBot.com — Clean Full Frontend Package
Build date: 2026-08-10

PURPOSE
This is the cleaned production frontend package with old backup/history files removed.

LATEST INCLUDED FIXES
1. EA Bot Market
   - Backend-published EA bots are the only marketplace data source.
   - No hard-coded demo/sample EA cards.
   - Published = 0 -> frontend shows 0 EA bots.
   - Marketplace pages use no-cache production headers.

2. Client Dashboard routing
   - Canonical public URL: /dashboard/
   - dashboard/index.html is the real dashboard page.
   - dashboard.html is compatibility-only and redirects to /dashboard/.
   - /dashboard/index.html redirects to /dashboard/ through vercel.json.
   - Dashboard HTML uses no-cache production headers.

3. Client Dashboard live data
   - Production dashboard uses https://admin.reachempirebot.com as backend API.
   - Backend dashboard data refreshes every 5 seconds while logged in.
   - Refresh also runs when the page/tab becomes visible or focused.

4. Client Account Report
   - Login Account
   - Account Type
   - Broker
   - Current Balance
   - Equity
   - Symbols
   - Positions

CLEANUP PERFORMED
- Removed _backups/ and backups/ history folders.
- Removed duplicated fortradex_vercel_ready/ staging copy.
- Removed *.bak / backup-chain files.
- Removed .DS_Store / OS metadata and temporary files.
- Removed obsolete fix-specific README files.

IMPORTANT
Deploy this clean package as the single production frontend source.
Do not restore old backup folders into the production repository.
Public dashboard URL should remain:
https://reachempirebot.com/dashboard/
