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

/* ============================================================
   Стартовые классы Elden Ring
   Данные сверены с вики (eldenring.wiki.fextralife.com/Classes),
   актуально для базовой игры (DLC Shadow of the Erdtree не меняет
   стартовые классы; классы из Tarnished Pack сюда не включены).
   ============================================================ */
const CLASSES = [
  {
    id: 'vagabond',
    name: 'Бродяга',
    nameEn: 'Vagabond',
    tag: 'Ближний бой',
    level: 9,
    description: 'Рыцарь в латах с мечом и алебардой. Самый живучий старт — отличный выбор для новичка.',
    style: 'Сбалансированный ближний бой: и меч со щитом, и алебарда подойдут.',
    pros: [
      'Самое высокое здоровье среди классов — прощает ошибки',
      'Крепкая броня и щит с самого начала',
      'Гибкий старт: можно качать и Силу, и Ловкость'
    ],
    cons: [
      'Нет магии и заклинаний на старте',
      'Тяжёлая броня — следи за нагрузкой экипировки'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'больше здоровья — проще переживать ошибки' },
      { stat: 'Выносливость (Endurance)', why: 'носить броню и чаще атаковать' },
      { stat: 'Сила (Strength)', why: 'под тяжёлое оружие и щит' }
    ],
    stats: { vig: 15, mnd: 10, end: 11, str: 14, dex: 13, int: 9, fai: 9, arc: 7 },
    gear: 'Длинный меч, алебарда, щит-нагреватель, доспехи бродяги',
    forWhom: 'Для тех, кто хочет надёжный и понятный старт в ближнем бою.'
  },
  {
    id: 'warrior',
    name: 'Воин',
    nameEn: 'Warrior',
    tag: 'Ближний бой · Скорость',
    level: 8,
    description: 'Ловкий боец с двумя изогнутыми клинками. Быстрые серии атак и мобильность.',
    style: 'Динамичный ближний бой: две скимитары и быстрые комбо.',
    pros: [
      'Два клинка с самого начала — мощные комбо',
      'Высокая Ловкость под быстрые атаки',
      'Хороший запас Сознания для навыков оружия'
    ],
    cons: [
      'Низкое здоровье — ошибки наказываются жёстче',
      'Нет магии и дальнего боя на старте'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'компенсировать низкое здоровье' },
      { stat: 'Ловкость (Dexterity)', why: 'усиливать урон клинков' },
      { stat: 'Выносливость (Endurance)', why: 'дольше держать серии атак' }
    ],
    stats: { vig: 11, mnd: 12, end: 11, str: 10, dex: 16, int: 10, fai: 8, arc: 9 },
    gear: 'Два скимитара, клёпаный деревянный щит, доспехи воина',
    forWhom: 'Для тех, кто любит быстрый агрессивный ближний бой.'
  },
  {
    id: 'hero',
    name: 'Герой',
    nameEn: 'Hero',
    tag: 'Сила',
    level: 7,
    description: 'Крепкий воин с боевым топором. Максимальная Сила среди всех классов.',
    style: 'Мощные удары тяжёлым оружием.',
    pros: [
      'Самая высокая Сила — сразу берёт тяжёлое оружие',
      'Хорошее здоровье и выносливость',
      'Высокая Тайная сила — пригодится для особых билдов'
    ],
    cons: [
      'Низкий Интеллект и Вера — магия почти закрыта',
      'Медленные атаки требуют терпения'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'выживать в ближнем бою' },
      { stat: 'Сила (Strength)', why: 'под тяжёлое оружие' },
      { stat: 'Выносливость (Endurance)', why: 'носить тяжёлое и бить чаще' }
    ],
    stats: { vig: 14, mnd: 9, end: 12, str: 16, dex: 9, int: 7, fai: 8, arc: 11 },
    gear: 'Боевой топор, большой кожаный щит, доспехи героя',
    forWhom: 'Для тех, кто хочет давить силой и тяжёлым оружием.'
  },
  {
    id: 'bandit',
    name: 'Разбойник',
    nameEn: 'Bandit',
    tag: 'Скрытность · Дальний бой',
    level: 5,
    description: 'Хитрый стрелок с луком и кинжалом. Максимальная Тайная сила.',
    style: 'Скрытность, кровотечение и стрельба с дистанции.',
    pros: [
      'Лук и стрелы с самого начала — удобно снимать врагов издалека',
      'Самая высокая Тайная сила — старт для билдов с кровотечением',
      'Баклер позволяет учиться парированию'
    ],
    cons: [
      'Самый низкий уровень и мало здоровья',
      'Слабая броня — ошибки стоят дорого'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'переживать ошибки' },
      { stat: 'Ловкость (Dexterity)', why: 'урон лука и кинжала' },
      { stat: 'Тайная сила (Arcane)', why: 'кровотечение и поиск предметов' }
    ],
    stats: { vig: 10, mnd: 11, end: 10, str: 9, dex: 13, int: 9, fai: 8, arc: 14 },
    // TODO: проверить — «Костяная стрела (с оперением)» в официальной локализации
    gear: 'Большой кинжал, короткий лук, баклер, 30 костяных стрел, доспехи разбойника',
    forWhom: 'Для тех, кто любит скрытность, лук и статусные эффекты.'
  },
  {
    id: 'astrologer',
    name: 'Астролог',
    nameEn: 'Astrologer',
    tag: 'Магия',
    level: 6,
    description: 'Чародей с посохом и заклинаниями. Максимальный Интеллект.',
    style: 'Колдовство с дистанции: камешки и дуги глинтстоуна.',
    pros: [
      'Два заклинания и посох с самого начала',
      'Максимальный Интеллект — сразу сильное колдовство',
      'Большой запас Сознания под заклинания'
    ],
    cons: [
      'Самое низкое здоровье — держи дистанцию',
      'Слабая броня и мало выносливости'
    ],
    priority: [
      { stat: 'Сознание (Mind)', why: 'больше ОК для заклинаний' },
      { stat: 'Интеллект (Intelligence)', why: 'усиливать колдовство' },
      { stat: 'Жизненная сила (Vigor)', why: 'чтобы не умирать с одного удара' }
    ],
    stats: { vig: 9, mnd: 15, end: 9, str: 8, dex: 12, int: 16, fai: 7, arc: 9 },
    // TODO: проверить — «Деревянный щит с письменами» (Scripture Wooden Shield) в официальной локализации
    gear: 'Посох астролога, короткий меч, деревянный щит, Глинтстоун-камешек, Глинтстоун-дуга, доспехи астролога',
    forWhom: 'Для тех, кто хочет атаковать магией с безопасной дистанции.'
  },
  {
    id: 'prophet',
    name: 'Пророк',
    nameEn: 'Prophet',
    tag: 'Вера',
    level: 7,
    description: 'Священник с копьём и заклинаниями веры. Максимальная Вера.',
    style: 'Заклинания веры: исцеление и огонь в ближнем бою.',
    pros: [
      'Максимальная Вера — сразу сильные молитвы',
      'Исцеление с самого начала экономит фляги',
      'Копьё позволяет держать врагов на дистанции'
    ],
    cons: [
      'Очень низкая выносливость — быстро устаёшь',
      'Нет колдовства, только вера'
    ],
    priority: [
      { stat: 'Сознание (Mind)', why: 'ОК для молитв' },
      { stat: 'Вера (Faith)', why: 'усиливать заклинания веры' },
      { stat: 'Жизненная сила (Vigor)', why: 'выживать в ближнем бою' }
    ],
    stats: { vig: 10, mnd: 14, end: 8, str: 11, dex: 10, int: 7, fai: 16, arc: 10 },
    gear: 'Короткое копьё, печать пальца, ветхий щит, Исцеление, Ловля пламени, доспехи пророка',
    forWhom: 'Для тех, кто хочет лечиться и жечь врагов верой.'
  },
  {
    id: 'samurai',
    name: 'Самурай',
    nameEn: 'Samurai',
    tag: 'Катана · Универсал',
    level: 9,
    description: 'Воин с катаной и длинным луком. Отличный универсальный старт.',
    style: 'Точные удары катаной и стрельба с дистанции.',
    pros: [
      'Катана с кровотечением — сильна с первых минут',
      'Лук и стрелы для дальнего боя',
      'Хорошая выносливость и броня'
    ],
    cons: [
      'Нет магии и заклинаний на старте',
      'Среднее здоровье — не для бездумных обменов'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'базовая выживаемость' },
      { stat: 'Ловкость (Dexterity)', why: 'урон катаны' },
      { stat: 'Выносливость (Endurance)', why: 'серии ударов и стрельба' }
    ],
    stats: { vig: 12, mnd: 11, end: 13, str: 12, dex: 15, int: 9, fai: 8, arc: 8 },
    gear: 'Утигатана, длинный лук, круглый щит с красным шипом, 20 стрел, 10 огненных стрел, доспехи самурая',
    forWhom: 'Для тех, кто хочет гибкий старт: и вблизи, и издалека.'
  },
  {
    id: 'prisoner',
    name: 'Узник',
    nameEn: 'Prisoner',
    tag: 'Ловкость + Магия',
    level: 9,
    description: 'Загадочный фехтовальщик с рапирой и колдовством. Гибрид.',
    style: 'Гибрид: быстрые уколы рапиры и колдовство.',
    pros: [
      'Гибрид Ловкости и Интеллекта — два стиля сразу',
      'Эсток и посох с заклинанием на старте',
      'Хороший баланс характеристик'
    ],
    cons: [
      'Низкая Вера — молитвы почти недоступны',
      'Среднее здоровье и броня'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'выживать в гибридном бою' },
      { stat: 'Интеллект (Intelligence)', why: 'усиливать колдовство' },
      { stat: 'Ловкость (Dexterity)', why: 'урон рапиры' }
    ],
    stats: { vig: 11, mnd: 12, end: 11, str: 11, dex: 14, int: 14, fai: 6, arc: 9 },
    // TODO: проверить — «Глинтстоун-посох» (Glintstone Staff) в официальной локализации
    gear: 'Эсток, посох, щит-гребень, Магический глинтблейд, доспехи узника',
    forWhom: 'Для тех, кто хочет совмещать фехтование и магию.'
  },
  {
    id: 'confessor',
    name: 'Исповедник',
    nameEn: 'Confessor',
    tag: 'Вера + Ближний бой',
    level: 10,
    description: 'Скрытный воин церкви: меч, щит и заклинания веры. Гибрид.',
    style: 'Гибрид: меч и щит плюс молитвы.',
    pros: [
      'Самый высокий стартовый уровень — больше очков',
      'Меч, щит и вера — сбалансированный гибрид',
      'Скрытность и исцеление с первых минут'
    ],
    cons: [
      'Нет колдовства — только вера',
      'Средние показатели без явной специализации'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'базовая выживаемость' },
      { stat: 'Вера (Faith)', why: 'усиливать молитвы' },
      { stat: 'Сила или Ловкость', why: 'под выбранное оружие' }
    ],
    stats: { vig: 10, mnd: 13, end: 10, str: 12, dex: 12, int: 9, fai: 14, arc: 9 },
    // TODO: проверить — «Щит-нагреватель с синим гербом» (Blue Crest Heater Shield) в официальной локализации
    gear: 'Широкий меч, щит с синим гербом, печать пальца, Срочное исцеление, Подход убийцы, доспехи исповедника',
    forWhom: 'Для тех, кто хочет меч и веру в одном флаконе.'
  },
  {
    id: 'wretch',
    name: 'Оборванец',
    nameEn: 'Wretch',
    tag: 'Чистый лист',
    level: 1,
    description: 'Голый бедняк с дубиной. Самый сложный, но самый гибкий старт.',
    style: 'Полная свобода: любой стиль с нуля.',
    pros: [
      'Все характеристики по 10 — можно качать что угодно',
      'Максимальная гибкость под любой билд',
      'Честный опыт: всему учишься с нуля'
    ],
    cons: [
      'Самый сложный старт: без брони и с дубиной',
      'Нет магии, лука и нормального оружия',
      'Почти без защиты — ошибки очень дороги'
    ],
    priority: [
      { stat: 'Жизненная сила (Vigor)', why: 'первым делом, чтобы выживать' },
      { stat: 'Выносливость (Endurance)', why: 'носить найденную броню' },
      { stat: 'Дальше — под стиль', why: 'выбранное оружие и магия' }
    ],
    stats: { vig: 10, mnd: 10, end: 10, str: 10, dex: 10, int: 10, fai: 10, arc: 10 },
    gear: 'Дубина (без доспехов)',
    forWhom: 'Для опытных игроков, которые хотят собрать персонажа с нуля.'
  }
];

const STAT_LABELS = {
  vig: 'Жизненная сила',
  mnd: 'Сознание',
  end: 'Выносливость',
  str: 'Сила',
  dex: 'Ловкость',
  int: 'Интеллект',
  fai: 'Вера',
  arc: 'Тайная сила'
};

const STORAGE_KEY = 'elden-guide-selected-class';

// Безопасная работа с localStorage (может быть недоступен в приватном режиме)
function loadSavedClass() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}
function saveSelectedClass(id) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch (e) {
    // localStorage недоступен — просто не сохраняем выбор
  }
}

const classGrid = document.getElementById('classGrid');
const classPanel = document.getElementById('classPanel');
let selectedId = null;

// Генерация карточек классов
CLASSES.forEach((cls, index) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'class-card';
  btn.dataset.classId = cls.id;
  btn.setAttribute('aria-pressed', 'false');
  btn.innerHTML =
    '<span class="class-card-tag">' + cls.tag + '</span>' +
    '<span class="class-card-name">' + cls.name + '</span>' +
    '<span class="class-card-en">' + cls.nameEn + '</span>' +
    '<span class="class-card-level">Уровень ' + cls.level + '</span>';
  classGrid.appendChild(btn);
});

const classButtons = [...classGrid.querySelectorAll('.class-card')];

function selectClass(id, { scroll = false } = {}) {
  selectedId = id;
  classButtons.forEach(btn => {
    const isSelected = btn.dataset.classId === id;
    btn.classList.toggle('is-selected', isSelected);
    btn.setAttribute('aria-pressed', String(isSelected));
  });
  saveSelectedClass(id);
  renderPanel(id);
  if (scroll && window.matchMedia('(max-width: 680px)').matches) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      classPanel.scrollIntoView();
    } else {
      classPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function renderPanel(id) {
  const cls = CLASSES.find(c => c.id === id);
  if (!cls) return;
  const stats = Object.entries(cls.stats)
    .map(([key, value]) => '<span class="stat-chip"><b>' + value + '</b> ' + STAT_LABELS[key] + '</span>')
    .join('');
  const pros = cls.pros.map(item => '<li>' + item + '</li>').join('');
  const cons = cls.cons.map(item => '<li>' + item + '</li>').join('');
  const priority = cls.priority
    .map((item, i) => '<li><b>' + (i + 1) + '. ' + item.stat + '</b> — ' + item.why + '</li>')
    .join('');
  classPanel.innerHTML =
    '<div class="class-panel-head">' +
      '<h3>' + cls.name + ' <span class="class-panel-en">(' + cls.nameEn + ')</span></h3>' +
      '<div class="class-panel-meta"><span class="class-panel-tag">' + cls.tag + '</span><span class="class-panel-level">Стартовый уровень: ' + cls.level + '</span></div>' +
      '<p class="class-panel-desc">' + cls.description + '</p>' +
    '</div>' +
    '<div class="class-panel-style"><b>Стиль игры:</b> ' + cls.style + '</div>' +
    '<div class="class-panel-cols">' +
      '<div class="class-panel-pros"><h4>Плюсы</h4><ul>' + pros + '</ul></div>' +
      '<div class="class-panel-cons"><h4>Минусы</h4><ul>' + cons + '</ul></div>' +
    '</div>' +
    '<div class="class-panel-priority"><h4>Что качать</h4><ol>' + priority + '</ol></div>' +
    '<div class="class-panel-stats"><h4>Стартовые характеристики</h4><div class="stat-chips">' + stats + '</div></div>' +
    '<div class="class-panel-gear"><b>Стартовое снаряжение:</b> ' + cls.gear + '</div>' +
    '<div class="class-panel-for"><b>Кому подойдёт:</b> ' + cls.forWhom + '</div>';
}

// Клик по карточке
classButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectClass(btn.dataset.classId, { scroll: true });
  });
});

// Клавиатура: стрелки перемещают фокус, Enter/Space выбирают
classGrid.addEventListener('keydown', e => {
  const current = document.activeElement;
  if (!current || !current.classList.contains('class-card')) return;
  const index = classButtons.indexOf(current);
  if (index === -1) return;
  let next = null;
  const cols = getComputedStyle(classGrid).gridTemplateColumns.split(' ').length;
  switch (e.key) {
    case 'ArrowRight': next = classButtons[(index + 1) % classButtons.length]; break;
    case 'ArrowLeft': next = classButtons[(index - 1 + classButtons.length) % classButtons.length]; break;
    case 'ArrowDown': next = classButtons[Math.min(index + cols, classButtons.length - 1)]; break;
    case 'ArrowUp': next = classButtons[Math.max(index - cols, 0)]; break;
    case 'Home': next = classButtons[0]; break;
    case 'End': next = classButtons[classButtons.length - 1]; break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      selectClass(current.dataset.classId, { scroll: true });
      return;
    default: return;
  }
  if (next) {
    e.preventDefault();
    next.focus();
  }
});

// Восстановление выбора при загрузке
const saved = loadSavedClass();
if (saved && CLASSES.some(c => c.id === saved)) {
  selectClass(saved);
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
