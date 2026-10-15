(function(){
'use strict';
var btn=document.getElementById('menu-btn'),nav=document.getElementById('site-nav');
if(btn&&nav){
  var setMenu=function(o){nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o?'true':'false');};
  btn.addEventListener('click',function(){setMenu(btn.getAttribute('aria-expanded')!=='true');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){setMenu(false);btn.focus();}});
}
var form=document.getElementById('quote-form');
if(!form){return;}
var NUM='27734554160';
var $=function(id){return document.getElementById(id);};
var status=$('form-status'),fb=$('fallback');
form.hidden=false;
try{
  var pre=new URLSearchParams(window.location.search).get('service');
  if(pre){var o=$('service').options;for(var i=0;i<o.length;i++){if(o[i].value&&o[i].value===pre){$('service').value=pre;break;}}}
}catch(err){}
function setErr(id,msg){var el=$(id),er=$(id+'-err');if(msg){el.setAttribute('aria-invalid','true');er.textContent=msg;}else{el.removeAttribute('aria-invalid');er.textContent='';}return !msg;}
form.addEventListener('submit',function(ev){
  ev.preventDefault();
  var name=$('name').value.trim(),phone=$('phone').value.trim(),email=$('email').value.trim(),svc=$('service');
  var msg=$('message').value.replace(/\r\n?/g,'\n').trim(),digits=phone.replace(/\D/g,'');
  var ok=true;
  ok=setErr('name',name?'':'Enter your name.')&&ok;
  ok=setErr('phone',(/^\+?[0-9\s()\-]+$/.test(phone)&&digits.length>=9&&digits.length<=15)?'':'Enter a valid phone number, for example 073 455 4160.')&&ok;
  ok=setErr('email',(!email||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))?'':'Enter a valid email address.')&&ok;
  ok=setErr('service',svc.value?'':'Choose a service.')&&ok;
  ok=setErr('consent',$('consent').checked?'':'Tick the box to agree before you continue.')&&ok;
  fb.hidden=true;
  if(!ok){status.textContent='Fix the marked fields. Nothing has been sent.';var bad=form.querySelector('[aria-invalid="true"]');if(bad){bad.focus();}return;}
  var label=svc.options[svc.selectedIndex].text;
  var text='Hello Ntongwase Holdings, I would like a quote.\n\nName: '+name+'\nPhone: '+phone+'\nEmail: '+(email||'not provided')+'\nService: '+label+'\nDetails:\n'+(msg||'not provided');
  var url='https://wa.me/'+NUM+'?text='+encodeURIComponent(text);
  var w=null;try{w=window.open(url,'_blank');}catch(err){}
  if(w){try{w.opener=null;}catch(err){}status.textContent='WhatsApp should open with your message ready. Nothing is sent until you press Send in WhatsApp.';}
  else{$('fb-link').href=url;$('fb-text').value=text;fb.hidden=false;status.textContent='Your browser blocked the WhatsApp window. Use the link or copy the message below. Nothing has been sent.';}
});
var copy=$('copy-btn');
if(copy){copy.addEventListener('click',function(){
  var t=$('fb-text');
  var done=function(){status.textContent='Message copied. Paste it into WhatsApp and press Send.';};
  var fallback=function(){t.focus();t.select();try{if(document.execCommand('copy')){done();return;}}catch(err){}status.textContent='Select the message text and copy it manually.';};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t.value).then(done,fallback);}else{fallback();}
});}
})();
