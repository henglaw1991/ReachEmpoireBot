ReachEmpireBot EA Bot Market — Production Sync Fix
Date: 2026-08-10
Version marker: 20260810-backend-only-v2

FILES CHANGED
1) markets/index.html
2) markets.html
3) markets-details/index.html
4) vercel.json

BEHAVIOR
- Frontend marketplace uses ONLY published EA bots returned by:
  https://admin.reachempirebot.com/api/bot-marketplace/listings
- No hard-coded sample/demo EA cards.
- No localStorage/client-upload fallback.
- Backend Published = 0 => Frontend shows 0 EA bots.
- Removed the debug message:
  "Backend connected, but no published EA bots returned."
- Marketplace/detail pages use no-cache headers to reduce stale production HTML after redeploy.

IMPORTANT DEPLOYMENT RULE
Deploy/commit these files in the EXACT source repository/folder connected to the production
reachempirebot.com Vercel project. Redeploying an older GitHub commit or another root folder
will restore the old sample listings.

Production verification marker:
REB_MARKET_DEPLOY_VERSION = 20260810-backend-only-v2
