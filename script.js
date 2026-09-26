const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const menu=document.querySelector('[data-mobile-menu]');
const revealEls=document.querySelectorAll('.reveal');
const year=document.querySelector('[data-year]');
const glow=document.querySelector('.cursor-glow');

if(year) year.textContent=new Date().getFullYear();

const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>20);
onScroll();
window.addEventListener('scroll',onScroll,{passive:true});

const setMenu=(open)=>{
  menu?.classList.toggle('open',open);
  document.body.classList.toggle('menu-open',open);
  menuButton?.setAttribute('aria-expanded',String(open));
  menu?.setAttribute('aria-hidden',String(!open));
};
menuButton?.addEventListener('click',()=>setMenu(!menu?.classList.contains('open')));
menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

const io=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:.13,rootMargin:'0px 0px -5% 0px'});
revealEls.forEach(el=>io.observe(el));

if(matchMedia('(pointer:fine)').matches && glow){
  window.addEventListener('pointermove',(e)=>{
    glow.animate({left:e.clientX+'px',top:e.clientY+'px'},{duration:700,fill:'forwards'});
  });
}

const rows=document.querySelectorAll('.service-row');
rows.forEach(row=>{
  row.addEventListener('pointermove',e=>{
    const rect=row.getBoundingClientRect();
    const x=(e.clientX-rect.left)/rect.width-.5;
    row.style.transform='translateX('+(x*3)+'px)';
  });
  row.addEventListener('pointerleave',()=>row.style.transform='');
});
