const form = document.querySelector('#cmdform');
const inputEl = document.getElementById('commandInput');
const output = document.getElementById('output');

function resetField() {
    output.innerHTML = '';
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
        default: return 'Invalid operator';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cinput = inputEl.value.trim();
    const parts = cinput.split(/\s+/);
    if (parts[0] === "arithmetic" && parts.length === 4) {
        const [, op, a, b] = parts;
        const result = arithmetic(op, a, b);
        output.innerHTML += `<p>&gt;${result}</p>`;
        inputEl.value = 'arithmetic ';
        return;
    }

    const cmd = inputEl.value.toLowerCase();
    if (!cmd) {output.innerHTML = 'H for Help';}
    else if (cmd === 'open root') {
        window.open('https://asterroot.vercel.app','_blank','noopener,noreferrer');
        output.innerHTML += `<p>&gt;${cmd} successfully executed.</p>`;
    }
    else if (cmd === 'open gitroot') {
        window.open('https://bionik-aster.github.io/','_blank','noopener,noreferrer');
        output.innerHTML += `<p>&gt;${cmd} successfully executed.</p>`;
    }
    else if (cmd === 'open def') {
        window.open('https://asterirving.vercel.app/','_blank','noopener,noreferrer');
        output.innerHTML += `<p>&gt;${cmd} successfully executed.</p>`;
    }
    else if (cmd === 'resetfield()') {
        resetField();
        output.innerHTML += '<p>&gt;Output field reset.</p>';
    }
    else if (cmd === 'h') {
        output.innerHTML += '<p>&gt;<b>open root</b> for root vercel<br>&gt;<b>open gitroot</b> for root github<br>&gt;<b>open def</b> for default<br>&gt;<b>arithmetic [operator] [operand] [operand]</b> for arithmetic</p>';
    }
    else {
        output.innerHTML += '<p><span style="color: red;">AError 997 - Faulty StarShell code</span></p>';
        console.error('AError 997 - Faulty StarShell code');
    }
    inputEl.value = '';
});