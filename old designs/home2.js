// neofetch-style banner
const coffee = [
  '  ( (       ',
  '   ) )      ',
  ' ........   ',
  ' |      |]  ',
  ' \\      /   ',
  '  `----\'    ',
];

const stats = [
  ['user',    'alyssa@alyssachai.com'],
  ['os',      'macOS sequoia'],
  ['shell',   'zsh'],
  ['role',    'software engineer'],
  ['status',  'always building'],
  ['uptime',  null], // filled dynamically
];

function getUptime() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function buildBanner() {
  const el = document.getElementById('banner-text');
  el.innerHTML = '';

  const rows = Math.max(coffee.length, stats.length);

  for (let i = 0; i < rows; i++) {
    const line = document.createElement('div');
    line.className = 'banner-row banner-line';
    line.style.animationDelay = (i * 55) + 'ms';

    // coffee side
    const artSpan = document.createElement('span');
    artSpan.className = 'banner-art';
    artSpan.textContent = coffee[i] || '             ';

    // stats side
    const statSpan = document.createElement('span');
    statSpan.className = 'banner-stat';

    if (stats[i]) {
      const [key, val] = stats[i];
      const value = key === 'uptime' ? getUptime() : val;
      statSpan.innerHTML = `<span class="stat-key">${key}</span><span class="stat-sep">~$</span><span class="stat-val">${value}</span>`;
      if (key === 'uptime') statSpan.dataset.uptime = 'true';
    }

    line.appendChild(artSpan);
    line.appendChild(statSpan);
    el.appendChild(line);
  }

  // colour swatch row
  const swatchRow = document.createElement('div');
  swatchRow.className = 'banner-row banner-line';
  swatchRow.style.animationDelay = (rows * 55) + 'ms';
  const spacer = document.createElement('span');
  spacer.className = 'banner-art';
  spacer.textContent = '             ';
  const swatches = document.createElement('span');
  swatches.className = 'banner-swatches';
  ['#ffb3ba','#c47a82','#a08ce0','#6ec6a0','#e0a96d','#aaebed','#888'].forEach(c => {
    const b = document.createElement('span');
    b.className = 'swatch';
    b.style.background = c;
    swatches.appendChild(b);
  });
  swatchRow.appendChild(spacer);
  swatchRow.appendChild(swatches);
  el.appendChild(swatchRow);
}

buildBanner();

// tick uptime live
setInterval(() => {
  const uptimeEl = document.querySelector('[data-uptime] .stat-val');
  if (uptimeEl) uptimeEl.textContent = getUptime();
}, 1000);

// live clock in status bar
function tick() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toTimeString().slice(0, 8);
}
tick();
setInterval(tick, 1000);

// hide fake cursor while typing
{
  const input = document.getElementById('cmd-input');
  const cursor = document.getElementById('fake-cursor');
  if (input && cursor) {
    input.addEventListener('input', () => {
      cursor.style.display = input.value.length ? 'none' : 'inline-block';
    });
  }
}