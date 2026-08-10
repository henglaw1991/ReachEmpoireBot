ReachEmpireBot Dashboard Route + Live Sync Fix

Replace these 3 files in the FRONTEND source:
1. dashboard/index.html
2. dashboard.html
3. vercel.json

Public dashboard URL:
https://reachempirebot.com/dashboard/

Fixes:
- dashboard/index.html is the single canonical dashboard page.
- dashboard.html redirects to /dashboard/ so old links do not create a second dashboard version.
- Legacy /dashboard/index.html redirects to /dashboard/.
- Dashboard HTML is no-cache on production.
- Production frontend always uses https://admin.reachempirebot.com as its backend API.
- Client report refreshes every 5 seconds while the page is open, and refreshes again on focus/visibility.
- Client Account Report fields stay:
  Login Account, Account Type, Broker, Current Balance, Equity, Symbols, Positions.

Note:
If the page shows "Backend offline: cached data" after this frontend fix, the remaining problem is on the backend API/session side, not the dashboard display code.
