document.documentElement.classList.add('js-motion');
// Плавная прокрутка с кастомным ускорением (easeInOutCubic)
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 1) return;
  const startTime = performance.now();
  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo({ top: startY + diff * easeInOutCubic(progress), behavior: 'instant' });
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
// Перехват кликов по якорным ссылкам для плавной прокрутки
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView();
      return;
    }
    const topbar = document.querySelector('.topbar');
    const offset = topbar ? topbar.offsetHeight : 0;
    const targetY = target.getBoundingClientRect().top + window.scrollY - offset;
    smoothScrollTo(targetY, 1100);
    history.replaceState(null, '', hash);
  });
});
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.textContent=open?'Закрыть ✕':'Меню ☰';
});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.textContent='Меню ☰';
}));
let toastTimer;
function showToast(message){
  const toast=document.getElementById('toast');
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3800);
}
document.querySelectorAll('.choose-class').forEach(button=>{
  button.addEventListener('click',()=>{
    const selected=button.dataset.class;
    const messages={
      'Воин':'Воин подойдёт, если тебе нравится быстрый ближний бой. Развивай выживаемость и характеристики выбранного оружия.',
      'Самурай':'Самурай хорош для сочетания катаны и лука. Следи за выносливостью и подбирай улучшения под свой стиль.',
      'Астролог':'Астролог подойдёт для боя на расстоянии. Следи за запасом ОК и не забывай о здоровье и безопасной позиции.'
    };
    showToast(messages[selected]);
  });
});
const samuraiLink=document.querySelector('.class-hint a');
if(samuraiLink){
  samuraiLink.addEventListener('click',()=>{
    showToast('Самурай хорош для сочетания катаны и лука. Следи за выносливостью и подбирай улучшения под свой стиль.');
  });
}
const checks=[...document.querySelectorAll('#checklist input[type="checkbox"]')];
const progressBar=document.getElementById('progressBar');
const progressText=document.getElementById('progressText');
function updateProgress(){
  const count=checks.filter(input=>input.checked).length;
  progressBar.style.width=(count/checks.length*100)+'%';
  progressText.textContent=`Готово: ${count} из ${checks.length}`;
}
checks.forEach(input=>input.addEventListener('change',updateProgress));
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
