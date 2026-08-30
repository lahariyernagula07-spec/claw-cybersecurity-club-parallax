(function(){
  var loader=document.getElementById('loader');
  window.addEventListener('load',function(){setTimeout(function(){loader.classList.add('hide')},450)});
  var nav=document.getElementById('navbar'), menu=document.getElementById('menuBtn'), navMenu=document.getElementById('navMenu');
  menu.addEventListener('click',function(){navMenu.classList.toggle('open')});
  document.querySelectorAll('#navMenu a').forEach(function(link){link.addEventListener('click',function(){navMenu.classList.remove('open')})});
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>20)});
  var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){revealObserver.observe(el)});
  var hero=document.querySelector('.hero'), visual=document.querySelector('.hero-visual');
  hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;visual.style.setProperty('--px',(x*18).toFixed(1)+'px');visual.style.setProperty('--py',(y*14).toFixed(1)+'px')});
  hero.addEventListener('mouseleave',function(){visual.style.setProperty('--px','0px');visual.style.setProperty('--py','0px')});
  var filters=document.querySelectorAll('.filter'), cards=document.querySelectorAll('.event-card');
  filters.forEach(function(btn){btn.addEventListener('click',function(){filters.forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.getAttribute('data-filter');cards.forEach(function(card){card.style.display=(f==='all'||card.getAttribute('data-type')===f)?'grid':'none'})})});
  var sections=document.querySelectorAll('main section[id]'), links=document.querySelectorAll('.navbar nav a');
  var activeObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id)})}})},{rootMargin:'-35% 0px -55% 0px'}); sections.forEach(function(s){activeObserver.observe(s)});
  document.getElementById('contactForm').addEventListener('submit',function(e){e.preventDefault();document.getElementById('formNote').textContent='Thanks! Your message is ready to be connected to the club email service.';this.reset()});
})();
