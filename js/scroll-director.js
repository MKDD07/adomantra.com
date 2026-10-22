/* Adomantra scene director: one ScrollTrigger owner, native scrolling. */
(()=>{'use strict';
const init=()=>{
if(!window.gsap||!window.ScrollTrigger)return;
const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const specs=[
['.hero','hero'],['#why-us','reveal'],['#services','cards'],['#industries','horizontal'],
['#approach','cinematic'],['.journey-section','journey'],['#clients','logos'],
['#work','cards'],['#inquiry','reveal'],['.final-cta','final'],['.site-footer','footer']];
const scenes=specs.map(([selector,type])=>({el:document.querySelector(selector),type})).filter(x=>x.el);
if(reduced)return;
const stage=document.createElement('div');stage.className='scroll-atmosphere';stage.setAttribute('aria-hidden','true');document.body.prepend(stage);
const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
gsap.to(bar,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});
const desktop=window.matchMedia('(min-width: 768px)').matches;
const reveal=(els,trigger,options={})=>{if(!els.length)return;gsap.fromTo(els,{autoAlpha:0,y:options.y??36},{autoAlpha:1,y:0,duration:.85,stagger:options.stagger??.09,ease:'power2.out',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger,start:'top 83%',once:true}})};
scenes.forEach(({el,type},i)=>{
const title=[...el.querySelectorAll('h1,h2,.eyebrow')].filter(x=>!x.closest('.modal,[aria-hidden="true"]'));
const cards=[...el.querySelectorAll('.service-card,.industry-card,.case-card,.swiper-slide,.problem-list li,.clients-grid img,.journey-card')].slice(0,18);
el.classList.add('motion-scene');
if(type!=='hero')reveal(title,el,{y:type==='final'?65:30,stagger:.08});
if(type==='hero'){
const h=el.querySelector('h1'),video=el.querySelector('.hero-bg-video-wrap');
if(h)gsap.fromTo(h,{autoAlpha:0,y:55},{autoAlpha:1,y:0,duration:1,ease:'power3.out',clearProps:'all'});
if(video&&desktop)gsap.to(video,{yPercent:13,scale:1.08,ease:'none',scrollTrigger:{trigger:el,start:'top top',end:'bottom top',scrub:true}});
}else if(type==='cards'||type==='logos'||type==='horizontal'){
// Preserve Swiper's own slide transforms and touch handling.
const safe=cards.filter(x=>!x.closest('.swiper-wrapper'));
reveal(safe,el,{y:38,stagger:.06});
}else if(type==='cinematic'&&desktop){
const layers=el.querySelectorAll('.think-split-left,.think-split-right');
if(layers.length===2){gsap.fromTo(layers[0],{xPercent:0},{xPercent:-12,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}});
gsap.fromTo(layers[1],{xPercent:0},{xPercent:12,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}});}
}else if(type==='journey'){
const track=el.querySelector('.journey-track');if(track&&desktop)gsap.fromTo(track,{xPercent:4},{xPercent:-4,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:1}});
}else if(type==='final'){const card=el.querySelector('.final-cta-card');if(card)reveal([card],el,{y:60});}
else if(type==='footer'){reveal([...el.querySelectorAll('.footer-col')].slice(0,6),el);}
const tint=i%2===0?'#101c2a':'#243448';
gsap.to(stage,{backgroundColor:tint,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 30%',scrub:1}});
});
window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();