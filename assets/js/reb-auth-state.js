(function(){
  var REAL_BACKEND_API='https://admin.reachempirebot.com';
  var token=localStorage.getItem('REB_CLIENT_TOKEN')||'';
  var storedApi=localStorage.getItem('REB_API_BASE')||'';
  if(storedApi && storedApi.replace(/\/$/,'')!==REAL_BACKEND_API){localStorage.removeItem('REB_API_BASE');storedApi='';}
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
    /* Never inherit page-specific theme button classes.  Those classes are
       the source of the orange/clipped account button on subpages. */
    link.className=cls;
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
          oldAccount.className='reb-session-account';
          oldAccount.textContent=displayName();
          oldAccount.href='/dashboard.html';
        }
        if(!oldLogout){
          var logoutLink=makeLink(login||signup, 'Log Out', '/login/', 'reb-session-logout');
          logoutLink.setAttribute('data-auth-action','logout');
          logoutLink.addEventListener('click',logout);
          area.appendChild(logoutLink);
        }else{
          oldLogout.className='reb-session-logout';
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
/* V34 MOBILE HEADER STANDARD
   Home is the single source of truth for the mobile account bar.  These
   selectors intentionally win over page-local legacy rules so authenticated
   users never receive an orange/clipped username on individual routes. */
(function(){
 function mobile(){return Math.min(innerWidth||9999,document.documentElement.clientWidth||9999,(screen&&screen.width)||9999)<=767||/Android|iPhone|Mobile/i.test(navigator.userAgent||'')}
 function run(){
  if(!mobile())return;
  /* Home owns its mobile auth sizing.  Do not replace its intrinsic,
     content-sized account controls with the shared full-width grid. */
  if(document.body&&document.body.classList.contains('reb-home'))return;
  if(!document.getElementById('reb-mobile-header-standard-v43')){
   var s=document.createElement('style');
   s.id='reb-mobile-header-standard-v43';
   s.textContent='@media(max-width:767px){html body .reb-top{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;height:82px!important;min-height:82px!important;margin:0!important;padding:10px 14px!important;overflow:hidden!important}html body .reb-top .reb-phone{display:none!important}html body .main-header .header-top .option-block,html body .reb-top .reb-actions,html body .reb-top .reb-login{box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(0,1fr) 112px!important;align-items:center!important;gap:10px!important;width:calc(100vw - 28px)!important;max-width:420px!important;min-width:0!important;height:62px!important;min-height:62px!important;margin:0 auto!important;padding:5px!important;position:static!important;inset:auto!important;transform:none!important;background:#111513!important;border:1px solid rgba(245,176,38,.48)!important;border-radius:13px!important;box-shadow:none!important;overflow:hidden!important}html body .main-header .header-top .option-block>a,html body .reb-top .reb-actions>a,html body .reb-top .reb-login>a{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-width:0!important;max-width:none!important;height:50px!important;min-height:50px!important;margin:0!important;padding:0 12px!important;position:static!important;transform:none!important;overflow:hidden!important;text-overflow:ellipsis!important;border:1px solid #59605f!important;border-radius:10px!important;background:#101413!important;color:#fff!important;font-size:14px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;box-shadow:none!important;text-decoration:none!important}html body .main-header .header-top .option-block>a[href*="signup"],html body .reb-top .reb-actions>a[href*="signup"],html body .reb-top .reb-login>a[href*="signup"]{background:#ffb11b!important;border-color:#ffb11b!important;color:#090909!important}html body .main-header .header-top .option-block.reb-auth-logged-in>.reb-session-account,html body .reb-top .reb-actions.reb-auth-logged-in>.reb-session-account,html body .reb-top .reb-login.reb-auth-logged-in>.reb-session-account{grid-column:1!important;background:#181b18!important;border-color:#a27618!important;color:#fff!important}html body .main-header .header-top .option-block.reb-auth-logged-in>.reb-session-logout,html body .reb-top .reb-actions.reb-auth-logged-in>.reb-session-logout,html body .reb-top .reb-login.reb-auth-logged-in>.reb-session-logout{grid-column:2!important;background:#321919!important;border-color:#8b3b3b!important;color:#fff!important}html body.reb-subpage .reb-header .reb-mobile-menu-toggle,html body .reb-market-menu-toggle{box-sizing:border-box!important;display:flex!important;flex:0 0 56px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:6px!important;width:56px!important;min-width:56px!important;max-width:56px!important;height:56px!important;min-height:56px!important;margin:0!important;padding:0!important;border:1px solid rgba(245,176,38,.45)!important;border-radius:12px!important;background:#050807!important;box-shadow:0 8px 18px rgba(0,0,0,.12)!important}html body.reb-subpage .reb-header .reb-mobile-menu-toggle span,html body .reb-market-menu-toggle span{display:block!important;width:26px!important;height:3px!important;margin:0!important;border-radius:3px!important;background:#f5b026!important;opacity:1!important;transform:none!important;transition:none!important}html body.reb-subpage .reb-header .reb-mobile-menu-toggle.is-open span:nth-child(1),html body.reb-subpage .reb-header .reb-mobile-menu-toggle.is-open span:nth-child(2),html body.reb-subpage .reb-header .reb-mobile-menu-toggle.is-open span:nth-child(3),html body .reb-market-menu-toggle.is-open span{opacity:1!important;transform:none!important}}';
   document.head.appendChild(s);
  }
  function important(node,name,value){if(node)node.style.setProperty(name,value,'important')}
  /* V44 owns auth geometry; keep this legacy pass only for menu-button normalization. */
  var authAreas=[];
  for(var a=0;a<authAreas.length;a++){
   var area=authAreas[a];
   important(area,'box-sizing','border-box');important(area,'display','grid');important(area,'grid-template-columns','minmax(0,1fr) 112px');important(area,'align-items','center');important(area,'gap','10px');important(area,'width','calc(100vw - 28px)');important(area,'max-width','420px');important(area,'min-width','0');important(area,'height','62px');important(area,'min-height','62px');important(area,'margin','0 auto');important(area,'padding','5px');important(area,'position','static');important(area,'left','auto');important(area,'right','auto');important(area,'transform','none');important(area,'background','#111513');important(area,'border','1px solid rgba(245,176,38,.48)');important(area,'border-radius','13px');important(area,'box-shadow','none');important(area,'overflow','hidden');
   var areaLinks=area.querySelectorAll(':scope > a');
   for(var k=0;k<areaLinks.length;k++){
    var link=areaLinks[k];
    important(link,'box-sizing','border-box');important(link,'display','flex');important(link,'align-items','center');important(link,'justify-content','center');important(link,'width','100%');important(link,'min-width','0');important(link,'max-width','none');important(link,'height','50px');important(link,'min-height','50px');important(link,'margin','0');important(link,'padding','0 12px');important(link,'position','static');important(link,'left','auto');important(link,'right','auto');important(link,'transform','none');important(link,'overflow','hidden');important(link,'text-overflow','ellipsis');important(link,'border','1px solid #59605f');important(link,'border-radius','10px');important(link,'background','#101413');important(link,'color','#fff');important(link,'font-size','14px');important(link,'font-weight','800');important(link,'line-height','1');important(link,'white-space','nowrap');important(link,'direction','ltr');important(link,'text-indent','0');important(link,'box-shadow','none');
    if(link.classList.contains('reb-session-account')){important(link,'grid-column','1');important(link,'background','#181b18');important(link,'border-color','#a27618');important(link,'color','#fff')}
    else if(link.classList.contains('reb-session-logout')){important(link,'grid-column','2');important(link,'background','#321919');important(link,'border-color','#8b3b3b');important(link,'color','#fff')}
    else if((link.getAttribute('href')||'').indexOf('signup')!==-1){important(link,'background','#ffb11b');important(link,'border-color','#ffb11b');important(link,'color','#090909')}
   }
  }
  var menuButtons=document.querySelectorAll('.reb-mobile-menu-toggle,.reb-market-menu-toggle');
  for(var m=0;m<menuButtons.length;m++){
   var button=menuButtons[m];
   important(button,'box-sizing','border-box');important(button,'display','flex');important(button,'flex','0 0 56px');important(button,'flex-direction','column');important(button,'align-items','center');important(button,'justify-content','center');important(button,'gap','6px');important(button,'width','56px');important(button,'min-width','56px');important(button,'max-width','56px');important(button,'height','56px');important(button,'min-height','56px');important(button,'margin','0');important(button,'padding','0');important(button,'border','1px solid rgba(245,176,38,.45)');important(button,'border-radius','12px');important(button,'background','#050807');important(button,'box-shadow','0 8px 18px rgba(0,0,0,.12)');
   var bars=button.querySelectorAll('span');for(var b=0;b<bars.length;b++){important(bars[b],'display','block');important(bars[b],'width','26px');important(bars[b],'height','3px');important(bars[b],'margin','0');important(bars[b],'border-radius','3px');important(bars[b],'background','#f5b026');important(bars[b],'opacity','1');important(bars[b],'transform','none')}
  }
  var logins=document.querySelectorAll('a[href*="/login"]');for(var i=0;i<logins.length;i++)if(!logins[i].classList.contains('reb-session-logout'))logins[i].textContent='Log In';
  var signups=document.querySelectorAll('a[href*="/signup"]');for(var j=0;j<signups.length;j++)signups[j].textContent='Sign Up';
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(run,0);setTimeout(run,250);setTimeout(run,900)});else{setTimeout(run,0);setTimeout(run,250);setTimeout(run,900)}
})();
/* END V34 MOBILE HEADER STANDARD */
/* V44: apply the approved Home auth geometry after every legacy page rule. */
(function(){
 function mobile(){return Math.min(innerWidth||9999,document.documentElement.clientWidth||9999,(screen&&screen.width)||9999)<=767||/Android|iPhone|Mobile/i.test(navigator.userAgent||'')}
 function set(node,name,value){if(node)node.style.setProperty(name,value,'important')}
 function run(){
  if(!mobile()||(document.body&&document.body.classList.contains('reb-home')))return;
  var tops=document.querySelectorAll('.reb-top');
  for(var t=0;t<tops.length;t++){
   set(tops[t],'box-sizing','border-box');set(tops[t],'display','flex');set(tops[t],'align-items','center');set(tops[t],'justify-content','flex-end');set(tops[t],'width','100%');set(tops[t],'height','64px');set(tops[t],'min-height','64px');set(tops[t],'margin','0');set(tops[t],'padding','7px 14px');set(tops[t],'overflow','hidden');
  }
  var areas=document.querySelectorAll('.main-header .header-top .option-block,.reb-top .reb-actions,.reb-top .reb-login');
  for(var a=0;a<areas.length;a++){
   var area=areas[a];
   set(area,'box-sizing','border-box');set(area,'display','inline-flex');set(area,'grid-template-columns','none');set(area,'flex-wrap','nowrap');set(area,'align-items','center');set(area,'justify-content','flex-end');set(area,'gap','8px');set(area,'width','auto');set(area,'max-width','calc(100vw - 28px)');set(area,'min-width','0');set(area,'height','50px');set(area,'min-height','50px');set(area,'margin','0 0 0 auto');set(area,'padding','4px');set(area,'position','static');set(area,'inset','auto');set(area,'transform','none');set(area,'overflow','hidden');set(area,'background','#111513');set(area,'border','1px solid rgba(245,176,38,.48)');set(area,'border-radius','13px');set(area,'box-shadow','none');
   var links=area.querySelectorAll(':scope > a');
   for(var i=0;i<links.length;i++){
    var link=links[i];
    set(link,'box-sizing','border-box');set(link,'display','flex');set(link,'align-items','center');set(link,'justify-content','center');set(link,'grid-column','auto');set(link,'width','auto');set(link,'min-width','0');set(link,'max-width','none');set(link,'height','40px');set(link,'min-height','40px');set(link,'margin','0');set(link,'padding','0 15px');set(link,'position','static');set(link,'inset','auto');set(link,'transform','none');set(link,'overflow','hidden');set(link,'white-space','nowrap');set(link,'text-overflow','ellipsis');set(link,'font-family','Ubuntu, Arial, Helvetica, sans-serif');set(link,'font-size','13px');set(link,'font-weight','700');set(link,'line-height','40px');set(link,'text-align','center');set(link,'text-indent','0');set(link,'text-decoration','none');set(link,'box-shadow','none');
    if(link.classList.contains('reb-session-account')){set(link,'flex','0 1 auto');set(link,'max-width','calc(100vw - 132px)');set(link,'background','#181b18');set(link,'border','1px solid #a27618');set(link,'color','#fff')}
    else if(link.classList.contains('reb-session-logout')){set(link,'flex','0 0 auto');set(link,'background','#321919');set(link,'border','1px solid #8b3b3b');set(link,'color','#fff')}
    else {set(link,'flex','0 0 auto')}
   }
  }
 }
 function schedule(){setTimeout(run,0);setTimeout(run,300);setTimeout(run,1100)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
})();
/* END V44 */
