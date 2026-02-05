const form = document.querySelector('#cmdform');
const inputEl = document.getElementById('commandInput');
const output = document.getElementById('output');

function appendLine(text, options = {}) {
    const p = document.createElement('p');
    if (options.html === true) {p.appendChild(text);} 
    else {p.textContent = `>${text}`;}
    output.appendChild(p);
}

function appendError(text) {
    const p = document.createElement('p');
    const s = document.createElement('span');
    s.style.color = 'red';
    s.textContent = text;
    p.appendChild(s);
    output.appendChild(p);
}

function appendWarn(text) {
    const p = document.createElement('p');
    const s = document.createElement('span');
    s.style.color = 'yellow';
    s.textContent = text;
    p.appendChild('s');
    output.appendChild('p');
}

function renderCmdList(list) {
  const p = document.createElement('p');
  list.forEach(([cmd, desc], i) => {
    p.appendChild(document.createTextNode('>'));
    const b = document.createElement('b');
    b.textContent = cmd;
    p.appendChild(b);
    p.appendChild(document.createTextNode(` ${desc}`));
    if (i < list.length - 1) p.appendChild(document.createElement('br'));
  });
  return p;
}

function appendHelp(def) {
    const cmds = [
        ['open root', 'for root vercel'],
        ['open gitroot', 'for root github'],
        ['open def', 'for default vercel'],
        ['arithmetic [operator] [operand [operand]', 'for arithmetic functions'],
        ['field echo [operand]', 'for text echoing'],
        ['field reset', 'for output field reset'],
        ['field timestamp', 'for current time in UTC'],
        ['field copy', 'to copy all outputs in the field'],
        ['help arithmetic', 'to see all operators in arithmetic'],
        ['help star', 'to see all commands in star']
    ];
    const arcmds = [
        ['+', 'for addition'],
        ['-', 'for subtraction'],
        ['*', 'for multiplication'],
        ['/', 'for division'],
        ['^', 'for exponentiation'],
        ['%', 'for remainder of a division'],
        ['avg', 'for mathematical mean between a and b'],
        ['cmp', 'for mathematical comparison relative to a (outputs "<", ">", or "=")']
    ];
    const starcmds = [
        ['ping', 'to send a reminder'],
        ['align [left|center|right]', 'to realign output field'],
        ['chaos', 'to do... something. idk']
    ];

    let awaitingrender = [];
    if (def === 'd') {awaitingrender = cmds;}
    else if (def === 'ar') {awaitingrender = arcmds;}
    else if (def === 'star') {awaitingrender = starcmds;}
    else if (def === 'all') {awaitingrender = [...cmds, ...arcmds, ...starcmds];}
    const renderedlist = renderCmdList(awaitingrender);
    output.appendChild(renderedlist);
    return;
}

function alignSS(pos) {
    if (pos !== "left" || pos !== "right" || pos !== "center") {
        appendError('AError 997(ALIGN) - Stars unaligned');
        console.error('AError 997(ALIGN) - Stars unaligned');
    } else {
        output.style.textAlign = pos;
    }
}

function resetField() {
    output.textContent = '';
}

function arithmetic(op, a, b) {
    a = Number(a);
    b = Number(b);

    if (isNaN(a)||isNaN(b)) return "Invalid operands"; // if a or b cant convert into numbers or dont exist say invalid numbers

    switch(op) {
        case '+': return a + b; // add
        case '-': return a - b; // subtract
        case '*': return a * b; // multiply
        case '/': return b !== 0 ? a / b : 'Division by zero'; // if b isnt 0 continue with a/b else say division by 0
        case '^': return a ** b; // exponentiation
        case '%': return a % b; // modulus
        case 's': return ++a; // dupe of 'S' in case psychopaths take the speed route
        case 'S': return ++a;
        case 'avg': return (a + b) / 2; // mathematical mean
        case 'cmp': if(a > b) {return '>';} else if (a < b) {return '<';} else {return '=';} // comparison relative to a
        default: return 'Invalid operator';
    }
}

function echoSS(el) {
    appendLine(el);
    if (el === '') {
        console.warn('AError 996 - No reverberation');
        appendWarn('AError 996 - No reverberation');
    } else if (!el) {
        console.warn('AError 996 - No reverberation');
        appendWarn('AError 996 - No reverberation');
    }
}

inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = inputEl.scrollHeight + 'px';
});

inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); 
        form.requestSubmit();
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cinput = inputEl.value.trim();
    const parts = cinput.split(/\s+/);

    if (parts[0] === "arithmetic" && parts.length === 4) {
        const [, op, a, b] = parts;
        const result = arithmetic(op, a, b);
        appendLine(result);
        inputEl.value = 'arithmetic ';
        return;
    }

    else if (parts[0] === "help") {
        if (parts[1] === "arithmetic") {appendHelp('ar'); return;}
        else if (parts[1] === "all") {appendHelp('all'); return;}
        else if (parts[1] === "star") {appendHelp('star'); return;}
        else {appendHelp('d'); return;}
    }

    else if (parts[0] === "field") {
        if (parts[1] === "reset") {
            resetField(); 
            appendLine('Field reset.'); 
            inputEl.value = '';
            return;
        }
        else if (parts[1] === "echo") {
            const el = parts.slice(2).join(' ');
            echoSS(el);
            inputEl.value = 'field echo ';
            return;
        }
        else if (parts[1] === "timestamp") {
            const time = new Date().toLocaleString();
            appendLine(`Current time: ${time}`);
            inputEl.value = 'field ';
            return;
        }
        else if (parts[1] === "copy") {
            const copytext = output.innerText;
            navigator.clipboard.writeText(copytext);
            appendLine("Output copied to clipboard.");
            inputEl.value = 'field ';
            return;
        }
    }
    else if (parts[0] === 'star') {
        if (parts[1] === 'ping') {appendLine('You got this.'); return;}
        else if (parts[1] === 'align') {
            let a = parts[2];
            alignSS(a);
            appendLine('Stars are realigned.');
            return;
        }
        else if (parts[1] === 'chaos') {
            resetField();
            appendWarn('hey is this supposed to be happening');
            appendError('dunno but user probably entered something stupid');
            appendWarn('fairs fairs');
            return;
        }
    }

    const cmd = cinput.toLowerCase();
    if (!cmd) {appendLine("help for Help");}
    else if (cmd === 'open root') {
        window.open('https://asterroot.vercel.app','_blank','noopener,noreferrer');
        appendLine(`${cmd} successfully executed.`);
    }
    else if (cmd === 'open gitroot') {
        window.open('https://bionik-aster.github.io/','_blank','noopener,noreferrer');
        appendLine(`${cmd} successfully executed.`);
    }
    else if (cmd === 'open def') {
        window.open('https://asterirving.vercel.app/','_blank','noopener,noreferrer');
        appendLine(`${cmd} successfully executed.`);
    }
    else {
        appendError('AError 997 - Faulty Starshell code');
        console.error('AError 997 - Faulty StarShell code');
    }
    inputEl.value = '';
});
