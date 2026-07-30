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
    var done=function(){clearSession();window.location.href='./login.html';};
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
      var signup=area.querySelector('a[href*="signup.html"]');
      var login=area.querySelector('a[href*="login.html"]');
      var oldAccount=area.querySelector('[data-auth-action="dashboard"], .reb-session-account');
      var oldLogout=area.querySelector('[data-auth-action="logout"], .reb-session-logout');
      if(token){
        if(signup)signup.remove();
        if(login)login.remove();
        if(!oldAccount){
          var account=makeLink(login||signup, displayName(), './dashboard.html', 'reb-session-account');
          account.setAttribute('data-auth-action','dashboard');
          account.title='Open Dashboard';
          area.appendChild(account);
        }else{
          oldAccount.textContent=displayName();
          oldAccount.href='./dashboard.html';
        }
        if(!oldLogout){
          var logoutLink=makeLink(login||signup, 'Log Out', './login.html', 'reb-session-logout');
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
