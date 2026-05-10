const output = document.getElementById('output');
const input  = document.getElementById('cmd-input');
const termBody = document.querySelector('.term-body');

function scrollToBottom() {
  termBody.scrollTop = termBody.scrollHeight;
}

function print(content, mode = 'text', cls = 'out-line') {
  const d = document.createElement('div');
  d.className = cls;
  if (mode === 'html') d.innerHTML = content;
  else d.textContent = content;
  output.appendChild(d);
  scrollToBottom();
}

function printPrompt(cmd) {
  const d = document.createElement('div');
  d.className = 'out-line';
  const label = document.createElement('span');
  label.style.color = 'var(--pink)';
  label.textContent = 'guest@alyssachai.com ~ $ ';
  d.appendChild(label);
  d.appendChild(document.createTextNode(cmd));
  output.appendChild(d);
  scrollToBottom();
}

const helpText = `  <span style="color:var(--pink)">help</span>             show this message
  <span style="color:var(--pink)">whoami</span>           navigate to about me
  <span style="color:var(--pink)">ls</span>               list table of contents
  <span style="color:var(--pink)">cd blog</span>          navigate to blog
  <span style="color:var(--pink)">cd projects</span>      navigate to projects
  <span style="color:var(--pink)">cat socials.txt</span>  show social links
  <span style="color:var(--pink)">clear</span>            clear terminal display`;

const socialsText = `  email     →  <a href="mailto:alyssa8chai@gmail.com">alyssa8chai@gmail.com</a>
  github    →  <a href="https://github.com/Aycaii" target="_blank" rel="noopener noreferrer">github.com/Aycaii</a>
  linkedin  →  <a href="https://linkedin.com/in/alyssa-chai-i7" target="_blank" rel="noopener noreferrer">linkedin.com/in/alyssa-chai-i7</a>`;

const commands = {
  help:              () => print(helpText, 'html'),
  ls:                () => print('blog   projects   socials.txt', 'text', 'out-line pink'),
  whoami:            () => { setTimeout(()=>{ window.location.href='/about/'; }, 200); },
  'cd blog':        () => { setTimeout(()=>{ window.location.href='/blog/'; }, 200); },
  'cd projects':     () => { setTimeout(()=>{ window.location.href='/projects/'; }, 200); },
  'cat socials.txt': () => print(socialsText, 'html'),
  clear:             () => { output.innerHTML = ''},
  'rm -rf': () => { window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); },
}

let tabMatches = [];
let tabIndex = -1;

input.addEventListener('keydown', e => {

  if (e.key === 'Tab') {
    e.preventDefault();
    const partial = input.value.toLowerCase();

    if (tabIndex === -1) {
    if (partial.length < 1) return;
      tabMatches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
      if (tabMatches.length === 0) return;
  
      tabIndex = 0;
      input.value = tabMatches[0];
      return;
    }

    tabIndex = (tabIndex + 1) % tabMatches.length;
    input.value = tabMatches[tabIndex];
    return;
  }

  tabMatches = [];
  tabIndex = -1;

  
  if (e.key !== 'Enter') return;
  const raw = input.value.trim();
  const cmd = raw.toLowerCase();
  input.value = '';
  if (!cmd) return;

  printPrompt(raw);

  if (/[<>&]/.test(raw)) {
    print('(╭ರ_•́)suspicious pattern detected...', 'text', 'out-line alert');
  }

  if (commands[cmd]) {
    commands[cmd]();
  } else {
    print(`zsh: command not found: ${cmd} try 'help'`, 'text', 'out-line err');
  }
});

document.getElementById('terminal-wrap').addEventListener('click', () => input.focus());