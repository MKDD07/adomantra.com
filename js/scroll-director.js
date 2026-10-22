/* Adomantra / unified scroll director — no Lenis or ScrollSmoother */
(()=>{const boot=()=>{if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.getAll().forEach(t=>t.kill());
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections=[...document.querySelectorAll('main section, body > section, section.hero, section.final-cta')].filter((s,i,a)=>a.indexOf(s)===i);
const ordered=[...document.querySelectorAll('section.hero, section#why-us, section#services, section#industries, section#approach, section.journey-section, section#clients, section#work, section#inquiry, section.final-cta')];
const panels=ordered.length?ordered:sections;
const palette=['#101c2a','#f3f6f8','#eaf0f6','#0e2435','#10253b','#071d30','#f1f5f7','#e7eef3','#f3f5f7','#0d2236'];
document.documentElement.classList.add('motion-ready');
const stage=document.createElement('div');stage.className='scroll-atmosphere';stage.setAttribute('aria-hidden','true');document.body.prepend(stage);
const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const headings=s=>[...s.querySelectorAll('h1,h2,.eyebrow')].filter(el=>!el.closest('[hidden]'));
const details=s=>[...s.querySelectorAll('p,.service-card,.industry-card,.case-card,.journey-card,.client-logo,.btn')].filter(el=>!el.closest('nav,header,footer'));
if(reduce){document.documentElement.classList.add('motion-reduced');return;}
gsap.set(stage,{backgroundColor:palette[0]});
gsap.to(progress,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.15}});
panels.forEach((panel,i)=>{
panel.classList.add('motion-panel');panel.style.setProperty('--panel-index',i);
const next=panels[i+1],head=headings(panel),content=details(panel).slice(0,16);
const mode=i%5;
const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:panel,start:'top bottom',end:'bottom top',scrub:1.1,invalidateOnRefresh:true}});
tl.fromTo(panel,{clipPath:'inset(5% 0% 5% 0% round 28px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',duration:.25},0);
if(head.length)tl.fromTo(head,{yPercent:mode===1?-35:45,opacity:.25,rotateX:mode===2?12:0},{yPercent:0,opacity:1,rotateX:0,stagger:.045,duration:.3},.07);
if(content.length)tl.fromTo(content,{y:mode===3?-32:40,opacity:.35,scale:mode===4?.95:1},{y:0,opacity:1,scale:1,stagger:.015,duration:.3},.12);
const media=panel.querySelector('.hero-bg-video-wrap,.think-media,.journey-track,.case-study-swiper,.services-swiper,.industries-swiper,img');
if(media)tl.fromTo(media,{scale:1.09,xPercent:mode===2?3:0},{scale:1,xPercent:0,duration:.7},0);
if(next)tl.to(panel,{yPercent:-2,opacity:.94,duration:.2},.8);
gsap.to(stage,{backgroundColor:palette[i%palette.length],ease:'none',scrollTrigger:{trigger:panel,start:'top 65%',end:'bottom 35%',scrub:1}});
});
const hero=document.querySelector('.hero');if(hero){const h=hero.querySelector('h1');if(h)gsap.fromTo(h,{y:65,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',delay:.12});}
const footer=document.querySelector('.site-footer');if(footer){gsap.fromTo(footer,{y:55},{y:0,ease:'none',scrollTrigger:{trigger:footer,start:'top bottom',end:'top 70%',scrub:1}});}
window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
};document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot):boot();})();