(function(){
  var REAL_BACKEND_API='https://admin.reachempirebot.com';
  var token=localStorage.getItem('REB_CLIENT_TOKEN')||'';
  var storedApi=localStorage.getItem('REB_API_BASE')||'';
  var apiBase=(storedApi||window.REB_API_BASE||REAL_BACKEND_API).replace(/\/$/,'');

  function storedUser(){
    try{return JSON.parse(localStorage.getItem('REB_CLIENT_USER')||'{}')||{};}catch(e){return{};}
  }

  function displayName(){
    var data=storedUser();
    var profile=data.profile||{};
    return (profile.name||profile.username||data.username||'Account').toString().trim()||'Account';
  }

  function clearSession(){
    localStorage.removeItem('REB_CLIENT_TOKEN');
    localStorage.removeItem('REB_CLIENT_USER');
    localStorage.removeItem('REB_CLIENT_LAST_STATUS');
  }

  function logout(event){
    if(event)event.preventDefault();
    var done=function(){clearSession();window.location.href='/login/';};
    if(!token){done();return;}
    fetch(apiBase+'/api/mobile/logout',{method:'POST',headers:{'Authorization':'Bearer '+token}}).catch(function(){}).finally(done);
  }

  function makeLink(template, text, href, cls){
    var link=document.createElement('a');
    link.href=href;
    link.textContent=text;
    link.className=template&&template.className?template.className:'';
    link.classList.add(cls);
    return link;
  }

  function applyAuthState(){
    var areas=[
      document.querySelector('.main-header .header-top .option-block'),
      document.querySelector('.reb-top .reb-actions'),
      document.querySelector('.reb-top .reb-login')
    ].filter(Boolean);
    areas.forEach(function(area){
      var signup=area.querySelector('a[href*="signup.html"], a[href="/signup/"], a[href$="/signup"], a[href="./signup/"]');
      var login=area.querySelector('a[href*="login.html"], a[href="/login/"], a[href$="/login"], a[href="./login/"]');
      var oldAccount=area.querySelector('[data-auth-action="dashboard"], .reb-session-account');
      var oldLogout=area.querySelector('[data-auth-action="logout"], .reb-session-logout');
      if(token){
        if(signup)signup.remove();
        if(login)login.remove();
        if(!oldAccount){
          var account=makeLink(login||signup, displayName(), '/dashboard.html', 'reb-session-account');
          account.setAttribute('data-auth-action','dashboard');
          account.title='Open Dashboard';
          area.appendChild(account);
        }else{
          oldAccount.textContent=displayName();
          oldAccount.href='/dashboard.html';
        }
        if(!oldLogout){
          var logoutLink=makeLink(login||signup, 'Log Out', '/login/', 'reb-session-logout');
          logoutLink.setAttribute('data-auth-action','logout');
          logoutLink.addEventListener('click',logout);
          area.appendChild(logoutLink);
        }
        area.classList.add('reb-auth-logged-in');
      }else{
        if(oldAccount)oldAccount.remove();
        if(oldLogout)oldLogout.remove();
        area.classList.remove('reb-auth-logged-in');
      }
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyAuthState);
  else applyAuthState();
})();
/* V29: mobile-only wording standard: Sign Up + Log In. */
(function(){
  function normalizeMobileAuthLabels(){
    if(!window.matchMedia||!window.matchMedia('(max-width:767px)').matches)return;
    var links=document.querySelectorAll('a[href*="login.html"],a[href="/login/"],a[href$="/login"],a[href="./login/"]');
    for(var i=0;i<links.length;i++){
      if(!links[i].classList.contains('reb-session-logout'))links[i].textContent='Log In';
    }
    var signup=document.querySelectorAll('a[href*="signup.html"],a[href="/signup/"],a[href$="/signup"],a[href="./signup/"]');
    for(var j=0;j<signup.length;j++)signup[j].textContent='Sign Up';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',normalizeMobileAuthLabels);
  else normalizeMobileAuthLabels();
})();
/* END V29 */
/* V32 MOBILE AUTH UI: one clean container, equal buttons, orange Sign Up. */
(function(){
 function mobile(){return Math.min(innerWidth||9999,document.documentElement.clientWidth||9999,(screen&&screen.width)||9999)<=767||/Android|iPhone|Mobile/i.test(navigator.userAgent||'')}
 function run(){
  if(!mobile())return;
  if(!document.getElementById('reb-mobile-auth-v31-style')){
   var s=document.createElement('style');s.id='reb-mobile-auth-v31-style';s.textContent='@media(max-width:767px){.main-header .header-top .option-block,.reb-top .reb-actions,.reb-top .reb-login{box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;width:min(300px,calc(100vw - 28px))!important;margin-left:auto!important;margin-right:14px!important;padding:0!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important}.main-header .header-top .option-block>a,.reb-top .reb-actions>a,.reb-top .reb-login>a{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-width:0!important;height:42px!important;min-height:42px!important;margin:0!important;padding:0 8px!important;border:1px solid #59605f!important;border-radius:9px!important;background:#101413!important;color:#fff!important;font-size:13px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;box-shadow:none!important}.main-header .header-top .option-block>a[href*="signup"],.reb-top .reb-actions>a[href*="signup"],.reb-top .reb-login>a[href*="signup"]{background:#ffb11b!important;border-color:#ffb11b!important;color:#090909!important}.main-header .header-top .option-block.reb-auth-logged-in>a,.reb-top .reb-actions.reb-auth-logged-in>a,.reb-top .reb-login.reb-auth-logged-in>a{background:#181b18!important;border-color:#a27618!important;color:#fff!important}.main-header .header-top .option-block.reb-auth-logged-in>.reb-session-logout,.reb-top .reb-actions.reb-auth-logged-in>.reb-session-logout,.reb-top .reb-login.reb-auth-logged-in>.reb-session-logout{background:#321919!important;border-color:#8b3b3b!important;color:#fff!important}}';document.head.appendChild(s);
  }
  var logins=document.querySelectorAll('a[href*="/login"]');for(var i=0;i<logins.length;i++)if(!logins[i].classList.contains('reb-session-logout'))logins[i].textContent='Log In';
  var signups=document.querySelectorAll('a[href*="/signup"]');for(var j=0;j<signups.length;j++)signups[j].textContent='Sign Up';
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,0);setTimeout(run,250)});else{setTimeout(run,0);setTimeout(run,250)}
})();
/* END V32 MOBILE AUTH UI */
