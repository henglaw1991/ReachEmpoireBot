======================================================================
                  REACHEMPIREBOT V1.6 — README
       Installation and User Guide for Client Bot Tool and MT5 EA
======================================================================

FILES INCLUDED
--------------

1. ReachEmpireBot_Client.exe
   The Windows Client Bot Tool used for Auto Trading, strategy settings,
   risk controls, basket controls, and supported Copy Trading functions.

2. ReachEmpireBot EA Auto Trading Platform V1.6.ex5
   The Expert Advisor installed inside MetaTrader 5. The EA can receive
   Strategy Manager, Risk Control, Basket Control, and runtime commands
   from the ReachEmpireBot Backend Server.


======================================================================
1. SYSTEM REQUIREMENTS
======================================================================

- Windows 10 or Windows 11, 64-bit.
- MetaTrader 5 installed and logged in to a trading account.
- A stable internet connection.
- An approved ReachEmpireBot account.
- A valid Username, Password, and License Key.

IMPORTANT:
One ReachEmpireBot account can be bound to one PC only. The Client Bot Tool
and MT5 EA can share the same account and Machine ID when both applications
are running on the same Windows PC. Multiple MT5 terminals, accounts, or
charts may be used on that same PC according to the permissions of your
license.

Never share your password or License Key with another person.


======================================================================
2. HOW TO REGISTER AND RECEIVE A LOGIN ACCOUNT
======================================================================

STEP 1 — OPEN THE REGISTRATION PAGE
-----------------------------------

1. Run ReachEmpireBot_Client.exe.
2. On the Login window, click the “GET ACCOUNT” button.
3. The ReachEmpireBot account registration page or signup form will open.

If the page does not open automatically, contact ReachEmpireBot Support and
request the official signup link. Do not register through an unofficial link.


STEP 2 — COMPLETE THE REGISTRATION FORM
---------------------------------------

Enter the requested information carefully. The form may include:

- Full Name:
  Enter your real full name.

- Username:
  Create the username you want to use for ReachEmpireBot login. Remember it
  exactly. The same approved Username will also identify the EA.

- Password:
  Create a secure password. Do not share it with anyone.

- Phone Number:
  Enter an active phone number that can be used to contact you.

- Telegram / WhatsApp:
  Select or enter your preferred support contact method.

- Country:
  Select your country.

- Other Information:
  Complete any additional fields required by the registration form.

Check your Username and contact information before submitting the form.
Do not create multiple duplicate requests for the same person or PC.


STEP 3 — SUBMIT AND WAIT FOR ADMIN APPROVAL
------------------------------------------

1. Click Submit or Create Account.
2. Your new request will initially have a Pending status.
3. A ReachEmpireBot Admin will review your information and license plan.
4. The account cannot be used normally until Admin approval is completed.
5. After approval, you will receive or have confirmed:

   - Username
   - Password
   - License Key
   - License Type
   - Expiry information, if the plan is not Lifetime

If approval takes longer than expected, contact official ReachEmpireBot
Support and provide your registered Username. Never send your password in a
support message. Support may ask for your Username, phone number, or a
screenshot of the pending status to identify your request.


STEP 4 — KEEP YOUR LOGIN INFORMATION SAFE
-----------------------------------------

- Keep your Username, Password, and License Key in a secure place.
- Do not post your License Key publicly.
- Do not allow another person to use your account on another PC.
- Contact Admin if you lose access to the registered PC.


======================================================================
3. HOW TO LOG IN TO THE CLIENT BOT TOOL
======================================================================

1. Run ReachEmpireBot_Client.exe.
2. Enter the following information:

   Username:
   The Username approved by ReachEmpireBot Admin.

   Password:
   The password belonging to the approved account.

   License Key:
   The License Key assigned to the same account.

3. Enable “Remember Login” only if this is your personal and trusted PC.
4. Click “LOGIN”.
5. After successful verification, the application will display the license
   status and open the ReachEmpireBot Client Dashboard.

FIRST LOGIN AND MACHINE BINDING
-------------------------------

During the first successful login, the Backend Server binds the Machine ID of
the current PC to your ReachEmpireBot account.

- The Client Bot Tool and EA on the same PC must use the same account.
- Opening the Bot Tool first or the EA first must not create separate machine
  permissions when they are running on the same Windows PC.
- Logging in from a different PC without an Admin reset will be rejected.


======================================================================
4. HOW TO INSTALL THE EA IN METATRADER 5
======================================================================

1. Open MetaTrader 5.
2. Select File > Open Data Folder.
3. Open the MQL5 folder, then open Experts.
4. Copy this file into the Experts folder:

   ReachEmpireBot EA Auto Trading Platform V1.6.ex5

5. Return to MetaTrader 5.
6. In Navigator, right-click Expert Advisors and select Refresh.
7. If the EA does not appear, close and reopen MetaTrader 5.
8. Open the symbol chart and timeframe you want to use.
9. Drag the ReachEmpireBot EA from Navigator onto the chart.


METATRADER 5 PERMISSIONS
------------------------

1. Open Tools > Options > Expert Advisors.
2. Enable “Allow algorithmic trading”.
3. Enable “Allow WebRequest for listed URL” if required by the EA.
4. Add the official Backend Server URL supplied by ReachEmpireBot Admin.
   The standard server address is:

   https://admin.reachempirebot.com

5. Click OK.
6. Make sure the “Algo Trading” button on the MT5 toolbar is enabled.


======================================================================
5. HOW TO LOG IN TO THE EA
======================================================================

When attaching the EA to a chart, open the Inputs tab and enter:

Username / EA ID:
Use the same approved Username used by the Client Bot Tool.

License Key:
Use the same License Key assigned to that Username.

Lot Size:
Set the local Base Lot according to the account balance and risk level you
are prepared to accept.

Click OK. The EA will verify the account, license, and Machine ID with the
Backend Server. After successful verification, the EA Dashboard should show
an Active/Connected status and the currently applied strategy information.

IMPORTANT:
The EA does not require the account password in its Inputs. The EA uses the
Username / EA ID and License Key. The password is used when logging in to the
Client Bot Tool.


======================================================================
6. MACHINE ID AND MOVING TO A NEW PC
======================================================================

- One Username/License is authorized for one PC only.
- The Client Bot Tool and EA share the same Machine ID on the same PC.
- Removing the EA from a chart and attaching it again on the same PC does not
  require a Machine ID reset.
- Changing an MT5 account or using multiple MT5 terminals on the same PC does
  not count as changing the PC.

TO MOVE THE ACCOUNT TO A NEW PC
-------------------------------

1. Contact ReachEmpireBot Admin.
2. Provide the Username that needs to be reset. Do not send your password.
3. Ask Admin to perform “Reset Machine ID”.
4. Wait until Admin confirms that the reset is complete.
5. Log in on the new PC.
6. The first successful login will bind the new PC Machine ID.

If you try to use the account on another PC before the reset, the Bot Tool or
EA may display:

   Machine is Locked!

This is a license security feature, not a trading strategy error.


======================================================================
7. HOW TO START AUTO TRADING IN THE CLIENT BOT TOOL
======================================================================

1. Open MetaTrader 5 and log in to the trading account first.
2. Run ReachEmpireBot_Client.exe and log in.
3. Open the General tab.
4. Select at least one trading symbol.
5. Review the selected Strategy and its settings.
6. Review Risk Control and Basket Control before starting.
7. Click “UPDATE BOT STRATEGY” if you changed local settings.
8. Click “START AUTO TRADING”.
9. After a successful start, the Log should display “BOT STARTED” and the
   button should change to “STOP AUTO TRADING”.

If the Backend Server controls the account in Server Mode, the Bot Tool or EA
can receive Strategy Manager, Risk Control, Basket Control, and runtime
commands sent by Admin.


======================================================================
8. LOT SIZE AND FORCE SYNC RULES
======================================================================

- Under normal Client control, the Client may select the local Base Lot based
  on the trading account balance and preferred risk.
- A normal Backend profile application should preserve the Client's local
  Base Lot.
- Backend Lot Size can override the local Lot Size only when Admin sends a
  Force Sync for full Server Lot Control.
- Scale Multiplier, Max Lot, Rescue settings, and position limits may cause
  later entries to use a different lot. Always review all lot-related settings,
  not only the Base Lot.
- A Manual Trade uses the lot entered in the Manual Trade form.

WARNING:
Never use an oversized Lot Size for a small account. Test every strategy and
risk configuration on a Demo Account before using a Live Account.


======================================================================
9. COMMON STATUS MESSAGES AND TROUBLESHOOTING
======================================================================

1. PENDING APPROVAL
-------------------
Meaning:
The registration request has not been approved by Admin.

Solution:
Contact Admin and provide your registered Username.


2. INVALID USERNAME / PASSWORD / LICENSE KEY
--------------------------------------------
Meaning:
One or more login fields are incorrect or do not belong to the same account.

Solution:
- Check spelling, capitalization, spaces, and copied characters.
- Use the Username, Password, and License Key of the same approved account.


3. MACHINE IS LOCKED!
---------------------
Meaning:
The account is already bound to a different PC.

Solution:
Ask Admin to Reset Machine ID before logging in on the new PC.


4. DISCONNECTED / SERVER OFFLINE
--------------------------------
Solution:
- Check the internet connection.
- Check Windows Firewall or Antivirus restrictions.
- Check the allowed WebRequest URL in MetaTrader 5.
- Confirm that the official ReachEmpireBot server is available.


5. BOT REMAINS ON “VALIDATING MT5 SYMBOLS AND RUNTIME SETTINGS”
--------------------------------------------------------------
Solution:
- Use the latest V1.6 Client Bot build.
- Open and log in to MT5 before starting the Bot Tool.
- Select at least one trading symbol.
- Refresh the MT5 scan once and try again.
- Check the Log for a “BOT START FAILED” message and send its screenshot to
  Support if the problem continues.


6. NO SELECTED SYMBOLS / NO ACTIVE SYMBOL
-----------------------------------------
Solution:
- Select a symbol in the General tab.
- Make the symbol visible in MT5 Market Watch.
- Check the broker suffix. Examples include XAUUSDm, XAUUSDc, and BTCUSDm.


7. EA DASHBOARD DOES NOT DISPLAY FULL INFORMATION
-------------------------------------------------
Solution:
- Check Username / EA ID and License Key.
- Check License status and Machine ID authorization.
- Check Algo Trading and the allowed WebRequest URL.
- Make sure the account has been approved and is active.


8. WINDOWS SMARTSCREEN BLOCKS THE BOT TOOL
------------------------------------------
Only continue if the file came from an official ReachEmpireBot source.
Select More info > Run anyway. Some antivirus products may take longer to
scan an application built from Python.


======================================================================
10. SAFE USE AND LIVE ACCOUNT WARNING
======================================================================

- Always test on a Demo Account first.
- Before starting, verify Symbol, Lot Size, Max Positions, Rescue settings,
  Equity Guard, Max Loss Protection, Daily Profit, and Basket Control.
- Do not mix old and new Bot Tool/EA files in the same installation package.
- Do not close MT5 or disconnect the internet while positions are open without
  checking the account first.
- Automated trading cannot guarantee profit and may result in partial or total
  loss of trading capital.
- The user is responsible for the selected Lot Size, account balance, strategy,
  and acceptable risk.


======================================================================
11. CONTACTING SUPPORT
======================================================================

Website:
https://www.reachempirebot.com

E-mail: reachempirebot@gmail.com

Tel: +855 93 525 363

Use only the official contact information displayed in the Bot Tool, EA
Dashboard, or ReachEmpireBot website.

WHEN REQUESTING SUPPORT, PROVIDE:

- Username — never send your password.
- Screenshot of the complete Error or Status.
- Product: Client Bot Tool or MT5 EA.
- Version: V1.6.
- Demo or Live Account.
- Date and time when the problem occurred.
- Relevant Bot Tool Log or MT5 Experts/Journal message.


======================================================================
                    © ReachEmpireBot — V1.6
======================================================================
