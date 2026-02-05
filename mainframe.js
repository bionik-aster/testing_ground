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

function appendHelp() {
    const p = document.createElement('p');

    const cmds = [
        ['open root', 'for root vercel'],
        ['open gitroot', 'for root github'],
        ['open def', 'for default vercel'],
        ['arithmetic [operator] [operand [operand]', 'for arithmetic functions'],
        ['field echo [operand]', 'for text echoing'],
        ['field reset', 'for output field reset']
    ];
    cmds.forEach(([cmd, desc],i) => {
        p.appendChild(document.createTextNode('>'));
        const b = document.createElement('b');
        b.textContent = cmd;
        p.appendChild(b);
        
        p.appendChild(document.createTextNode(` ${desc}`));

        if (i < cmds.length - 1) {
            p.appendChild(document.createElement('br'));
        }
    })

    return p;
}

function resetField() {
    output.textContent = '';
}

function arithmetic(op, a, b) {
    a = Number(a);
    b = Number(b);

    if (isNaN(a)||isNaN(b)) return "Invalid operands";

    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Division by zero';
        case '^': return a ** b;
        case '%': return a % b;
        case 's': return ++a;
        case 'S': return ++a;
        default: return 'Invalid operator';
    }
}

function echoSS(el) {
    appendLine(el);
}

inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = inputEl.scrollHeight + 'px';
});

inputEl.addEventListener('keybown', (e) => {
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
    }

    const cmd = cinput.toLowerCase();
    if (!cmd) {output.innerHTML = 'H for Help';}
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
    else if (cmd === 'h') {
        output.appendChild(appendHelp());
    }
    else {
        appendError('AError 997 - Faulty Starshell code');
        console.error('AError 997 - Faulty StarShell code');
    }
    inputEl.value = '';
});