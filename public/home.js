//was going to do something here ??

// live clock
function tick() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toTimeString().slice(0, 8);
}
tick();
setInterval(tick, 1000);


