ReachEmpireBot Trade Account Auth Standard — All Pages

This package does NOT invent a new button size.
It copies the dedicated mobile Sign Up / Login geometry from create-trade-account/index.html:
- top padding 12px 20px
- auth wrapper width: auto
- display: flex
- right aligned
- 8px gap
- each button min-width 86px
- each button height 40px
- horizontal padding 14px
- font size 15px
- border radius 8px

The copied rule is placed last with higher specificity so older shared mobile auth rules cannot stretch it back to 280/300px.
Desktop is untouched because the rule applies only at max-width:640px.

Replace the included files at the same paths.
