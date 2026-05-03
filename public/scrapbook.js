//Shoutout Claude Code
(function () {
  const pages = [
    document.getElementById('pg0'),
    document.getElementById('pg1'),
    document.getElementById('pg2')
  ];
  const dots   = document.querySelectorAll('.dots span');
  const ctr    = document.getElementById('ctr');
  const btnL   = document.getElementById('btn-l');
  const btnR   = document.getElementById('btn-r');
  const n = pages.length;
  let cur = 0, busy = false;

  function sync() {
    dots.forEach((d, i) => d.classList.toggle('on', i === cur));
    ctr.textContent = `${cur + 1} / ${n}`;
    btnL.classList.toggle('off', cur === 0);
    btnR.classList.toggle('off', cur === n - 1);
  }

  function go(dir) {
    if (busy) return;
    if (dir > 0 && cur >= n - 1) return;
    if (dir < 0 && cur <= 0)     return;
    busy = true;

    if (dir > 0) {
      const leaving = pages[cur];
      leaving.classList.add('is-flipping', 'flipped');
      // At the visual midpoint, drop z-index so the page underneath shows
      setTimeout(() => {
        leaving.classList.remove('is-flipping');
        leaving.style.zIndex = '0';
      }, 430);
      setTimeout(() => { cur++; sync(); busy = false; }, 870);
    } else {
      cur--;
      const returning = pages[cur];
      // Restore this page to its natural z-position in the stack
      returning.style.zIndex = String(n - cur);
      // Brief delay so the z-index paint lands before the CSS transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          returning.classList.remove('flipped');
        });
      });
      setTimeout(() => { sync(); busy = false; }, 870);
    }
  }

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft')  go(-1);
  });

  // Button clicks
  btnL.addEventListener('click', () => go(-1));
  btnR.addEventListener('click', () => go(1));

  // Touch swipe
  let tx0 = 0;
  document.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx0;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  sync();
})();