(function(){
  var intro=document.getElementById('intro');
  document.body.classList.add('intro-active');
  var introClosed=false;
  function closeIntro(){
    if(introClosed){return;}
    introClosed=true;
    intro.classList.add('is-skipped');
    setTimeout(function(){
      intro.classList.add('is-leaving');
      document.body.classList.remove('intro-active');
    },120);
    setTimeout(function(){intro.style.display='none';},1250);
  }
  window.addEventListener('load',function(){setTimeout(closeIntro,4200)});
  var loader=document.getElementById('loader');
  if(loader){loader.classList.add('hide');}
  /* Purple command menu */
  var sideMenuBtn=document.getElementById('sideMenuBtn');
  var sideMenu=document.getElementById('sideMenu');
  var sideMenuClose=document.getElementById('sideMenuClose');
  var sideMenuBackdrop=document.getElementById('sideMenuBackdrop');
  function openSideMenu(){
    sideMenu.classList.add('open');
    sideMenuBackdrop.classList.add('open');
    sideMenuBtn.classList.add('active');
    sideMenuBtn.setAttribute('aria-expanded','true');
    sideMenu.setAttribute('aria-hidden','false');
  }
  function closeSideMenu(){
    sideMenu.classList.remove('open');
    sideMenuBackdrop.classList.remove('open');
    sideMenuBtn.classList.remove('active');
    sideMenuBtn.setAttribute('aria-expanded','false');
    sideMenu.setAttribute('aria-hidden','true');
  }
  sideMenuBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(sideMenu.classList.contains('open')){closeSideMenu();}else{openSideMenu();}
  });
  sideMenuClose.addEventListener('click',closeSideMenu);
  sideMenuBackdrop.addEventListener('click',closeSideMenu);

  /* Section-as-page navigation: HOME + ABOUT are the landing view.
     All other sections open as focused terminal-style pages without deleting content. */
  var main=document.querySelector('main');
  var sectionIds=['home','about','domains','tools','mission','events','team','contact'];
  var sectionNames={home:'home',about:'about','domains':'cyber-world',tools:'tools',mission:'mission',events:'events',team:'team',contact:'contact'};
  function clearSectionView(){
    main.classList.remove('section-view-active');
    document.body.classList.remove('section-page');
    document.querySelectorAll('main > section').forEach(function(section){
      section.classList.remove('active-section');
    });
  }
  function showSectionPage(id, updateHash){
    var target=document.getElementById(id);
    if(!target){return;}
    if(id==='home' || id==='about'){
      clearSectionView();
      if(updateHash){history.pushState(null,'','#'+id);}
      setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'start'});},20);
      return;
    }
    main.classList.add('section-view-active');
    document.body.classList.add('section-page');
    document.querySelectorAll('main > section').forEach(function(section){
      section.classList.remove('active-section');
    });
    target.classList.add('active-section');
    if(updateHash){history.pushState(null,'','#'+id);}
    window.scrollTo(0,0);
    setTimeout(function(){
      target.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')});
    },80);
  }
  function handleSectionLink(link){
    var href=link.getAttribute('href')||'';
    if(href.charAt(0)!=='#'){return;}
    var id=href.substring(1);
    if(sectionIds.indexOf(id)!==-1){
      showSectionPage(id,true);
    }
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click',function(e){
      var href=link.getAttribute('href')||'';
      var id=href.substring(1);
      if(sectionIds.indexOf(id)!==-1){
        e.preventDefault();
        handleSectionLink(link);
      }
    });
  });
  document.querySelectorAll('.side-menu-links a').forEach(function(link){
    link.addEventListener('click',function(){closeSideMenu();});
  });
  window.addEventListener('popstate',function(){
    var id=location.hash.replace('#','');
    if(sectionIds.indexOf(id)!==-1){showSectionPage(id,false);}
    else{clearSectionView();}
  });
  var initialHash=location.hash.replace('#','');
  if(sectionIds.indexOf(initialHash)!==-1 && initialHash!=='home' && initialHash!=='about'){
    showSectionPage(initialHash,false);
  }else{
    clearSectionView();
  }


  var nav=document.getElementById('navbar');
  window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>20)});

  var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){revealObserver.observe(el)});
  var hero=document.querySelector('.hero'), visual=document.querySelector('.hero-visual');
  hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;visual.style.setProperty('--px',(x*18).toFixed(1)+'px');visual.style.setProperty('--py',(y*14).toFixed(1)+'px')});
  hero.addEventListener('mouseleave',function(){visual.style.setProperty('--px','0px');visual.style.setProperty('--py','0px')});
  /* Cinematic parallax layers — subtle, keeps the original hacker position intact. */
  var parallaxItems=document.querySelectorAll('[data-parallax-layer]');
  function updateParallax(){
    var viewport=window.innerHeight || document.documentElement.clientHeight;
    parallaxItems.forEach(function(el){
      var r=el.getBoundingClientRect();
      var center=r.top+r.height/2;
      var offset=(center-viewport/2)/viewport;
      var speed=parseFloat(el.getAttribute('data-parallax-layer'))||0.06;
      el.style.setProperty('--parallax-y',(-offset*42*speed)+'px');
    });
    var heroVisual=document.querySelector('.hero-visual');
    if(heroVisual){
      var hr=heroVisual.getBoundingClientRect();
      var heroOffset=(hr.top+hr.height/2-viewport/2)/viewport;
      heroVisual.style.setProperty('--hero-scroll-y',(-heroOffset*18).toFixed(1)+'px');
      heroVisual.style.setProperty('--hacker-y',(-heroOffset*7).toFixed(1)+'px');
    }
  }
  window.addEventListener('scroll',updateParallax,{passive:true});
  window.addEventListener('resize',updateParallax);
  setTimeout(updateParallax,120);
  var parallaxSections=document.querySelectorAll('.section, .mission-band, .contact');
  parallaxSections.forEach(function(section){
    section.addEventListener('mousemove',function(e){
      var r=section.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5;
      var y=(e.clientY-r.top)/r.height-.5;
      section.style.setProperty('--mx',(x*12).toFixed(2)+'px');
      section.style.setProperty('--my',(y*8).toFixed(2)+'px');
    });
    section.addEventListener('mouseleave',function(){section.style.setProperty('--mx','0px');section.style.setProperty('--my','0px')});
  });

  var filters=document.querySelectorAll('.filter'), cards=document.querySelectorAll('.event-card');
  filters.forEach(function(btn){btn.addEventListener('click',function(){filters.forEach(function(b){b.classList.remove('active')});btn.classList.add('active');var f=btn.getAttribute('data-filter');cards.forEach(function(card){var types=card.getAttribute('data-type')||'';card.style.display=(f==='all'||types.split(' ').indexOf(f)!==-1)?'grid':'none'})})});
  var sections=document.querySelectorAll('main section[id]'), links=document.querySelectorAll('.navbar nav a');
  var activeObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id)})}})},{rootMargin:'-35% 0px -55% 0px'}); sections.forEach(function(s){activeObserver.observe(s)});
  document.getElementById('contactForm').addEventListener('submit',function(e){
    e.preventDefault();
    var form=this;
    var note=document.getElementById('formNote');
    var name=document.getElementById('contactName').value.trim();
    var email=document.getElementById('contactEmail').value.trim();
    var message=document.getElementById('contactMessage').value.trim();
    note.textContent='Sending message...';
    fetch('/api/contact',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:name,email:email,message:message})
    }).then(function(response){
      return response.json().then(function(data){return {ok:response.ok,data:data};});
    }).then(function(result){
      if(!result.ok){throw new Error(result.data.message||'Unable to send message.');}
      note.textContent='Message sent successfully to cyberclub@raghuenggcollege.in';
      form.reset();
    }).catch(function(error){
      note.textContent='Message could not be sent. Please start the backend server and try again.';
      console.log(error);
    });
  });
})();
