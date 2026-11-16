/* «Отвес» — прототип. Общие шапка/подвал и простая интерактивность.
   В рабочей версии (Astro) шапка и подвал станут компонентами, JS для них не нужен. */

const LOGO = `<svg viewBox="0 0 168 44" role="img" aria-label="Отвес">
  <line x1="14" y1="2" x2="14" y2="18" stroke="#2B59C3" stroke-width="2"/>
  <path d="M10.5 18 h7 v3 l4 4 l-7.5 12 l-7.5 -12 l4 -4 z" fill="currentColor"/>
  <text x="34" y="31" font-family="'IBM Plex Sans','Segoe UI',Arial,sans-serif" font-weight="600" font-size="24" letter-spacing="4" fill="currentColor">ОТВЕС</text>
</svg>`;

const PHONE = '+7 (900) 000-00-00';
const PHONE_HREF = 'tel:+79000000000';

const NAV = [
  ['obekty', 'obekty.html', 'Объекты'],
  ['ceny', 'ceny.html', 'Цены'],
  ['process', 'kak-my-rabotaem.html', 'Как мы работаем'],
  ['about', 'o-brigade.html', 'О бригаде'],
  ['kontakty', 'kontakty.html', 'Контакты'],
];

const ICONS = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 8-6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 1c-1 0-2.5-1.5-2.5-2.5l1-1-1-2z"/></svg>',
  max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="14" rx="3"/><path d="M8 21l3-3"/><path d="M7 13V9l2.5 3L12 9v4"/><path d="M15 9l3 4M18 9l-3 4"/></svg>',
  menu: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 5h16M2 10h16M2 15h16"/></svg>',
};

function header(active) {
  const links = NAV.map(([k, h, t]) => `<a href="${h}"${k === active ? ' aria-current="page"' : ''}>${t}</a>`).join('');
  return `
  <div class="proto-flag">Прототип · данные черновые, отзывы — образцы · <a href="styles.html">другие стили</a></div>
  <header class="site-header">
    <div class="wrap">
      <a class="logo" href="index.html" aria-label="Отвес — на главную">${LOGO}</a>
      <nav class="nav" aria-label="Основное меню">${links}</nav>
      <div class="header-contact">
        <div class="phone-block"><a class="header-phone" href="${PHONE_HREF}">${PHONE}</a><span class="header-hours">ежедневно 9:00–21:00</span></div>
        <a class="btn btn-primary header-cta" href="kalkulyator.html">Рассчитать ремонт</a>
      </div>
      <button class="menu-btn" aria-expanded="false" aria-controls="mnav" aria-label="Меню">${ICONS.menu}</button>
    </div>
    <nav class="mobile-nav" id="mnav" aria-label="Меню">${links}<a href="${PHONE_HREF}" class="mono">${PHONE}</a></nav>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div style="display:flex;flex-direction:column;gap:14px">
        <a class="logo" href="index.html" style="color:#fff">${LOGO}</a>
        <p style="max-width:34ch">Частная бригада. Ремонт квартир под ключ в новостройках Москвы и Подмосковья: от бетона до заезда.</p>
      </div>
      <div><h4>Услуги</h4><ul>
        <li><a href="remont-kvartir-pod-klyuch.html">Ремонт под ключ</a></li>
        <li><a href="remont-kvartir-pod-klyuch.html">Ремонт в новостройке</a></li>
        <li><a href="remont-kvartir-pod-klyuch.html">Ремонт white box</a></li>
        <li><a href="remont-kvartir-pod-klyuch.html">По дизайн-проекту</a></li>
      </ul></div>
      <div><h4>Квартиры</h4><ul>
        <li><a href="ceny.html#tipovye">Студия</a></li>
        <li><a href="ceny.html#tipovye">Однокомнатная</a></li>
        <li><a href="ceny.html#tipovye">Двухкомнатная</a></li>
        <li><a href="ceny.html#tipovye">Трёхкомнатная</a></li>
      </ul></div>
      <div><h4>Связь</h4><ul>
        <li><a href="${PHONE_HREF}" class="mono">${PHONE}</a></li>
        <li><a href="#">Telegram</a></li><li><a href="#">WhatsApp</a></li><li><a href="#">MAX</a></li>
        <li style="color:#8895B3">ежедневно 9:00–21:00</li>
      </ul></div>
      <div class="legal">
        <span>ИП [ФИО скрыто], ИНН 000000000000 · Москва и Московская область</span>
        <a href="#">Политика обработки персональных данных</a>
      </div>
    </div>
  </footer>
  <nav class="contact-bar" aria-label="Связаться">
    <a class="call" href="${PHONE_HREF}">${ICONS.phone}Позвонить</a>
    <a href="#">${ICONS.tg}Telegram</a>
    <a href="#">${ICONS.wa}WhatsApp</a>
    <a href="#">${ICONS.max}MAX</a>
  </nav>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || '';
  document.body.insertAdjacentHTML('afterbegin', header(page));
  document.body.insertAdjacentHTML('beforeend', footer());

  // мобильное меню
  const btn = document.querySelector('.menu-btn');
  const mnav = document.getElementById('mnav');
  btn?.addEventListener('click', () => {
    const open = mnav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // до / после
  document.querySelectorAll('.ba').forEach(ba => {
    const r = ba.querySelector('input');
    const set = () => ba.style.setProperty('--pos', r.value + '%');
    r.addEventListener('input', set); set();
  });

  // фильтры портфолио
  const fbtns = document.querySelectorAll('.filters button');
  fbtns.forEach(b => b.addEventListener('click', () => {
    fbtns.forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    const f = b.dataset.f;
    document.querySelectorAll('[data-tags]').forEach(card => {
      card.hidden = !(f === 'all' || card.dataset.tags.split(' ').includes(f));
    });
  }));

  // калькулятор
  const calc = document.querySelector('.calc');
  if (calc) {
    const area = calc.querySelector('#area');
    const areaOut = calc.querySelector('#areaOut');
    const pk = calc.querySelectorAll('input[name=pkg]');
    const fmt = n => Math.round(n / 1000) * 1000;
    const rub = n => fmt(n).toLocaleString('ru-RU') + ' ₽';
    const run = () => {
      const a = +area.value;
      const rate = +[...pk].find(p => p.checked).value;
      areaOut.textContent = a + ' м²';
      calc.querySelector('#work').textContent = rub(a * rate) + ' – ' + rub(a * rate * 1.15);
      calc.querySelector('#mat').textContent = rub(a * 5000) + ' – ' + rub(a * 7000);
      const days = Math.round(35 + a * 1.35);
      calc.querySelector('#days').textContent = days + '–' + (days + 15) + ' дней';
      calc.querySelector('#acts').textContent = a < 35 ? '5 актов' : '6 актов';
    };
    area.addEventListener('input', run); pk.forEach(p => p.addEventListener('change', run)); run();
  }

  // форма — в прототипе никуда не отправляется
  document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    f.querySelector('.form-ok').style.display = 'block';
  }));
});
