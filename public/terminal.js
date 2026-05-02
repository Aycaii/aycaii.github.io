const output = document.getElementById('output');
const input  = document.getElementById('cmd-input');

const MAX_LINES = 10;

function trimOutput() {
  while (output.children.length > MAX_LINES) output.removeChild(output.firstChild);
}

function print(content, mode = 'text', cls = 'out-line') {
  const d = document.createElement('div');
  d.className = cls;
  if (mode === 'html') d.innerHTML = content;
  else d.textContent = content;
  output.appendChild(d);
  trimOutput();
  output.scrollTop = output.scrollHeight;
}

// banned
function printPrompt(cmd) {
  const d = document.createElement('div');
  d.className = 'out-line';
  const label = document.createElement('span');
  label.style.color = 'var(--pink)';
  label.textContent = 'guest@alyssachai.com ~ $ ';
  d.appendChild(label);
  d.appendChild(document.createTextNode(cmd));
  output.appendChild(d);
  if (typeof trimOutput === 'function') trimOutput();
}

const helpText = `  <span style="color:var(--pink)">help</span>             show this message
  <span style="color:var(--pink)">whoami</span>           about me
  <span style="color:var(--pink)">ls</span>               list table of contents
  <span style="color:var(--pink)">cd blogs</span>         see what i've been up to!
  <span style="color:var(--pink)">cd projects</span>      navigate to projects
  <span style="color:var(--pink)">cat socials.txt</span>  show social links
  <span style="color:var(--pink)">clear</span>            clear terminal display`;

const socialsText = `  email     →  <a href="mailto:alyssa8chai@gmail.com">alyssa8chai@gmail.com</a>
  github    →  <a href="https://github.com/Aycaii" target="_blank" rel="noopener noreferrer">github.com/Aycaii</a>
  linkedin  →  <a href="https://linkedin.com/in/alyssa-chai-i7" target="_blank" rel="noopener noreferrer">linkedin.com/in/alyssa-chai-i7</a>`;

const commands = {
  help:              () => print(helpText, 'html'),
  ls:                () => print('blogs/  projects/  socials.txt', 'text', 'out-line pink'),
  whoami:            () => { print('navigating...', 'text', 'out-line muted'); setTimeout(()=>{ window.location.href='/about/'; }, 400); },
  'cd blogs':        () => { print('navigating...', 'text', 'out-line muted'); setTimeout(()=>{ window.location.href='/blog/'; }, 400); },
  'cd projects':     () => { print('navigating...', 'text', 'out-line muted'); setTimeout(()=>{ window.location.href='/projects/'; }, 400); },
  'cat socials.txt': () => print(socialsText, 'html'),
  clear:             () => { output.innerHTML = ''; }
};

input.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const raw = input.value.trim();
  const cmd = raw.toLowerCase();
  input.value = '';
  if (!cmd) return;

  printPrompt(raw);

  if (/[<>&]/.test(raw)) {
    print('suspicious pattern detected...', 'text', 'out-line muted');
  }

  if (commands[cmd]) {
    commands[cmd]();
  } else {
    print(`bash: ${cmd}: command not found. try 'help'`, 'text', 'out-line err');
  }
});

document.getElementById('terminal-wrap').addEventListener('click', () => input.focus());