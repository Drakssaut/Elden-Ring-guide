document.documentElement.classList.add('js-motion');
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
