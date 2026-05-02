const bannerLines = [
  '  running alyssachai.com <span style="color:var(--dim)">v1.0.1</span>',
  '',
  '  <span style="color:var(--text)">Hi! I\'m Alyssa and this is my corner of the internet.</span>',
  '  <span style="color:var(--text)">Type <span style="color:var(--pink)">\'help\'</span> in the terminal to explore my site!</span>',
];

const bannerEl = document.getElementById('banner-text');
bannerLines.forEach((line, i) => {
  const s = document.createElement('span');
  s.className = 'banner-line';
  s.innerHTML = line + (i < bannerLines.length - 1 ? '\n' : '');
  s.style.animationDelay = (i * 60) + 'ms';
  bannerEl.appendChild(s);
});

// live clock
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