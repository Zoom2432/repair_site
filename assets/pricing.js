/* «Отвес» — модель расценок (ЧЕРНОВИК, сверить с прорабом).
   Один источник цифр для калькулятора и примеров смет.
   Цены — только работы, ₽. Материалы считаются отдельно. */

(function () {
  // ---------- расценки на работы ----------
  const R = {
    protect:      { name: 'Защита общих зон, подъём и вывоз мусора', unit: 'м²', price: 350 },
    demolition:   { name: 'Демонтаж старой отделки', unit: 'м²', price: 1200 },
    partitions:   { name: 'Перегородки из пазогребневых плит', unit: 'м²', price: 1600 },
    panel:        { name: 'Сборка электрощита', unit: 'шт', price: 25000 },
    elPoint:      { name: 'Электроточка: штроба, кабель, подрозетник', unit: 'точка', price: 1900 },
    lowVoltage:   { name: 'Слаботочка: интернет, ТВ, домофон', unit: 'компл', price: 18000 },
    ledStrip:     { name: 'Подготовка под светодиодную подсветку', unit: 'м', price: 1500 },
    plumbBath:    { name: 'Разводка водоснабжения и канализации, санузел', unit: 'шт', price: 45000 },
    plumbKitchen: { name: 'Разводка водоснабжения и канализации, кухня', unit: 'шт', price: 15000 },
    installation: { name: 'Монтаж инсталляции', unit: 'шт', price: 9000 },
    drain:        { name: 'Душевой трап', unit: 'шт', price: 12000 },
    vent:         { name: 'Короб и воздуховод вытяжки', unit: 'шт', price: 8000 },
    plaster:      { name: 'Штукатурка стен по маякам', unit: 'м²', price: 750 },
    screed:       { name: 'Полусухая стяжка пола', unit: 'м²', price: 900 },
    floorHeat:    { name: 'Тёплый пол электрический', unit: 'м²', price: 1200 },
    waterproof:   { name: 'Гидроизоляция санузла', unit: 'м²', price: 600 },
    tileStd:      { name: 'Плитка стандартного формата', unit: 'м²', price: 2400 },
    tileLarge:    { name: 'Керамогранит крупного формата 60×120', unit: 'м²', price: 3400 },
    tileXL:       { name: 'Керамогранит 120×60 и больше, запил 45°', unit: 'м²', price: 4600 },
    backsplash:   { name: 'Кухонный фартук плиткой', unit: 'м²', price: 3500 },
    ceilStretch:  { name: 'Натяжной потолок', unit: 'м²', price: 750 },
    ceilGkl:      { name: 'Потолок из ГКЛ со шпатлёвкой и покраской', unit: 'м²', price: 2400 },
    ceilComplex:  { name: 'Потолок ГКЛ многоуровневый, теневой профиль', unit: 'м²', price: 3400 },
    puttyWall:    { name: 'Шпатлёвка стен под обои', unit: 'м²', price: 450 },
    puttyPaint:   { name: 'Шпатлёвка стен под покраску, 2 слоя', unit: 'м²', price: 650 },
    wallpaper:    { name: 'Поклейка обоев', unit: 'м²', price: 500 },
    paint:        { name: 'Покраска стен', unit: 'м²', price: 450 },
    decor:        { name: 'Декоративная штукатурка', unit: 'м²', price: 2200 },
    slopes:       { name: 'Откосы окон', unit: 'шт', price: 3500 },
    floorLam:     { name: 'Ламинат или кварцвинил', unit: 'м²', price: 700 },
    floorWood:    { name: 'Инженерная доска', unit: 'м²', price: 1400 },
    floorTile:    { name: 'Керамогранит на пол в комнатах', unit: 'м²', price: 1900 },
    doorStd:      { name: 'Установка межкомнатной двери', unit: 'шт', price: 7000 },
    doorHidden:   { name: 'Дверь скрытого монтажа', unit: 'шт', price: 14000 },
    skirtStd:     { name: 'Плинтус напольный', unit: 'м', price: 450 },
    skirtShadow:  { name: 'Теневой плинтус', unit: 'м', price: 1400 },
    elFinish:     { name: 'Чистовая электрика: розетки, выключатели, свет', unit: 'точка', price: 350 },
    plumbFinish:  { name: 'Чистовая сантехника', unit: 'санузел', price: 25000 },
    clean:        { name: 'Финальная уборка', unit: 'м²', price: 150 },
  };

  // ---------- готовые варианты ----------
  const PRESETS = {
    base: {
      title: 'Базовый', note: 'Аккуратный ремонт без сложных решений',
      walls: 'wallpaper', floor: 'lam', ceiling: 'stretch', tile: 'std', electric: 'std',
      heat: 'none', installations: 0, drain: false, backsplash: false, led: 0, doors: 'std', skirt: 'std', vent: false,
    },
    comfort: {
      title: 'Комфорт', note: 'Продуманный ремонт для жизни',
      walls: 'paint', floor: 'wood', ceiling: 'gkl', tile: 'large', electric: 'ext',
      heat: 'bath', installations: 1, drain: false, backsplash: true, led: 6, doors: 'hidden', skirt: 'std', vent: true,
    },
    design: {
      title: 'Под дизайн-проект', note: 'По чертежам вашего дизайнера',
      walls: 'decor', floor: 'wood', ceiling: 'complex', tile: 'xl', electric: 'project',
      heat: 'bathKitchen', installations: 2, drain: true, backsplash: true, led: 20, doors: 'hidden', skirt: 'shadow', vent: true,
    },
  };

  const MATERIALS = { base: 5500, comfort: 6500, design: 7500 }; // черновые материалы, ₽/м² — ориентир

  const STAGES = [
    'Подготовка', 'Перегородки', 'Электрика, черновой этап', 'Сантехника и вентиляция',
    'Штукатурка стен', 'Стяжка и тёплый пол', 'Санузлы и плитка', 'Потолки',
    'Чистовая отделка стен', 'Чистовые полы', 'Двери и плинтусы', 'Чистовой монтаж и уборка',
  ];

  const DEFAULT_INPUT = {
    area: 58, rooms: 2, baths: 1, height: 2.7, state: 'concrete', partitions: null, level: 'comfort',
    ...PRESETS.comfort,
  };

  function compute(input) {
    const i = { ...DEFAULT_INPUT, ...input };
    const A = Math.max(15, +i.area);
    const bathFloor = 4.5 * i.baths;                 // м² пола санузлов
    const dryFloor = Math.max(0, A - bathFloor);     // полы в комнатах и кухне
    const kitchenFloor = Math.min(14, A * 0.18);
    const wallsAll = A * 2.6 * (i.height / 2.7);     // м² стен по всей квартире
    const tileArea = 28 * i.baths;                   // стены + пол санузлов
    const walls = Math.max(0, wallsAll - tileArea + 4.5 * i.baths); // сухие стены
    const perimeter = A * 1.1;
    const windows = i.rooms + 1;
    const doors = i.rooms + i.baths + 1;
    const ptsK = { std: 1.4, ext: 1.7, project: 2.1 }[i.electric];
    const points = Math.round(A * ptsK);
    const wb = i.state === 'whitebox';
    const old = i.state === 'secondary';
    const partitions = i.partitions != null ? +i.partitions : (wb ? 0 : Math.round(A * 0.35));

    const st = STAGES.map((name, n) => ({ n: n + 1, name, items: [], sum: 0 }));
    const add = (stage, key, qty) => {
      qty = Math.round(qty * 10) / 10;
      if (!qty) return;
      const r = R[key];
      st[stage - 1].items.push({ key, name: r.name, unit: r.unit, qty, price: r.price, sum: Math.round(qty * r.price) });
    };

    add(1, 'protect', A);
    if (old) add(1, 'demolition', A);
    add(2, 'partitions', partitions);
    add(3, 'panel', 1);
    add(3, 'elPoint', wb ? Math.round(points * 0.5) : points);
    add(3, 'lowVoltage', 1);
    add(3, 'ledStrip', +i.led);
    add(4, 'plumbBath', i.baths);
    add(4, 'plumbKitchen', 1);
    add(4, 'installation', +i.installations);
    if (i.drain) add(4, 'drain', 1);
    if (i.vent) add(4, 'vent', 1);
    if (!wb) add(5, 'plaster', walls + tileArea);
    if (!wb) add(6, 'screed', dryFloor);
    const heatArea = { none: 0, bath: bathFloor, bathKitchen: bathFloor + kitchenFloor }[i.heat];
    add(6, 'floorHeat', heatArea);
    add(7, 'waterproof', 8 * i.baths);
    add(7, { std: 'tileStd', large: 'tileLarge', xl: 'tileXL' }[i.tile], tileArea);
    if (i.backsplash) add(7, 'backsplash', 3);
    add(8, { stretch: 'ceilStretch', gkl: 'ceilGkl', complex: 'ceilComplex' }[i.ceiling], A);
    if (i.walls === 'wallpaper') { add(9, 'puttyWall', walls); add(9, 'wallpaper', walls); }
    if (i.walls === 'paint') { add(9, 'puttyPaint', walls); add(9, 'paint', walls); }
    if (i.walls === 'decor') { add(9, 'puttyPaint', walls); add(9, 'paint', walls * 0.75); add(9, 'decor', walls * 0.25); }
    add(9, 'slopes', windows);
    add(10, { lam: 'floorLam', wood: 'floorWood', tile: 'floorTile' }[i.floor], dryFloor - kitchenFloor);
    add(10, 'floorTile', kitchenFloor);
    add(11, i.doors === 'hidden' ? 'doorHidden' : 'doorStd', doors);
    add(11, i.skirt === 'shadow' ? 'skirtShadow' : 'skirtStd', perimeter);
    add(12, 'elFinish', points);
    add(12, 'plumbFinish', i.baths);
    add(12, 'clean', A);

    st.forEach(s => s.sum = s.items.reduce((a, b) => a + b.sum, 0));
    const stages = st.filter(s => s.items.length);
    const work = stages.reduce((a, s) => a + s.sum, 0);
    const lvl = i.level in MATERIALS ? i.level : 'comfort';
    const levelK = { base: 1, comfort: 1.15, design: 1.35 }[lvl];
    const days = Math.round(30 + A * 1.2 * levelK + (old ? 10 : 0) - (wb ? 15 : 0));
    return {
      input: i, stages, work,
      perM2: Math.round(work / A / 100) * 100,
      materials: [Math.round(A * (MATERIALS[lvl] - 500) / 1000) * 1000, Math.round(A * (MATERIALS[lvl] + 500) / 1000) * 1000],
      days, acts: stages.length > 8 ? 6 : 5,
    };
  }

  const fmt = n => Math.round(n).toLocaleString('ru-RU');
  window.OTVES = { R, PRESETS, STAGES, MATERIALS, compute, fmt };
})();
