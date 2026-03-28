const form = document.querySelector('#cmdform');
const inputEl = document.getElementById('commandInput');
const output = document.getElementById('output');
let stored_vars = new Array(35).fill(null);
let stored_vars_content = new Array(35).fill(null);

function appendLine(text, options = {}) {
    const p = document.createElement('p');
    if (options.html === true && text instanceof Node) {p.appendChild(text);}
    else {
        let text = String(text ?? '');
        let stext = text.split(/\s+/); //split all text eg "Hello World!" = ["Hello","World!"]
        for (let i = 0; i < stext.length; i++) {
            for (let j = 0; j < stored_vars.length; j++) {
                if (stext[i] === '$' + stored_vars[j]) {
                    stext[i] = stored_vars_content[j];
                    break;
                }
            }
        }
        let recombi_text = ""; 
        for (let i = 0; i < stext.length; i++) {
            recombi_text += stext[i];
            if (i < stext.length - 1) { //if the counter is 1 less than the length of the text array, then
                recombi_text += " "; //add a whitespace (aka add whitespace inbetween words)
            }
        }
        p.textContent = `>${recombi_text}`;
    }
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
    p.appendChild(s);
    output.appendChild(p);
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
        ['field var store [varname] [varstore]', 'for storing a custom variable'],
        ['field var remove [varname]', 'for removing a custom variable'],
        ['field var checkstore', 'to check all available variables'],
        ['field reset', 'for output field reset'],
        ['field timestamp', 'for current time in UTC'],
        ['field countup', 'for time since last incident'],
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
        ['s or S','for successor function'],
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
    let posi = pos.toLowerCase();
    if (posi !== "left" && posi !== "right" && posi !== "center") {
        appendError('AError 997(ALIGN) - Stars unaligned');
        console.error('AError 997(ALIGN) - Stars unaligned');
    } else {
        output.style.textAlign = posi;
    }
}

function resetField() {
    output.textContent = '';
}

function arithmetic(op, a, b) {
    op = op.toLowerCase();
    for (let i = 0; i < stored_vars.length; i++) {
        if (a === "$" + stored_vars[i] && !isNaN(Number(stored_vars_content[i]))) {
            a = stored_vars_content[i];
        }
        if (b === "$" + stored_vars[i] && !isNaN(Number(stored_vars_content[i]))) {
            b = stored_vars_content[i];
        }
    }
    a = Number(a);
    b = Number(b);

    if (op === 's') { //operator strictly equals to s? then...
        return !isNaN(a) ? a + 1 : 'Invalid operand'; //return a + 1 given a is a number, else return Invalid operand
    }

    if (isNaN(a)||isNaN(b)) return "Invalid operands"; //triggers only when operator is not s

    switch(op) {
        case '+': return a + b; // add
        case '-': return a - b; // subtract
        case '*': return a * b; // multiply
        case '/': return b !== 0 ? a / b : 'Division by zero'; // if b isnt 0 continue with a/b else say division by 0
        case '^': return a ** b; // exponentiation
        case '%': return a % b; // modulus
        case 'avg': return (a + b) / 2; // mathematical mean
        case 'cmp': if(a > b) {return '>';} else if (a < b) {return '<';} else {return '=';} // comparison relative to a
        default: return 'Invalid operator';
    }
}

function echoSS(el) {
    appendLine(el);
    if (el === '') {
        console.warn('AError 996 - No reverberation (Null echo)');
        appendWarn('AError 996 - No reverberation (Null echo)');
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
            inputEl.value = 'field ';
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
        else if (parts[1] === "countup") {
            const time = new Date();
            const timeSinceLast = new Date(2026,2,24,16,27,23,112);
            var disTime = time - timeSinceLast;
            var days = Math.floor(disTime / (1000 * 60 * 60 * 24)); 
            var hours = Math.floor((disTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
            var minutes = Math.floor((disTime % (1000 * 60 * 60)) / (1000 * 60)); 
            var seconds = Math.floor((disTime % (1000 * 60)) / 1000); 
            appendLine(`${days} days, ${hours}:${minutes}:${seconds} (HH:MM:SS)`);
            inputEl.value = 'field ';
            return;
        }
        else if (parts[1] === "var") {
            if (parts[2] === "store") {
                let assignmentdone = false;
                let stringything = parts.slice(4).join(' ');
                let found = false;
                for (let i = 0; i < stored_vars.length; i++) {
                    if (stored_vars[i] === parts[3]) {
                        stored_vars_content[i] = stringything;
                        appendLine(`${parts[3]} updated to ${stringything}`);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    for (let i = 0; i < stored_vars.length; i++) {
                        if (!stored_vars[i]) {
                            stored_vars[i] = parts[3];
                            stored_vars_content[i] = stringything;
                            appendLine(`${parts[3]} assigned ${stringything}`);
                            found = true;
                            break;
                        }
                    }
                }
                if (!assignmentdone) {
                    appendError(`${parts[3]} cannot be assigned; there's too many variables!`);
                }    
                inputEl.value = 'field ';
                return;
            }
            else if (parts[2] === "remove") {
                let rem_complete = false;
                for (let i = 0; i < stored_vars.length; i++) {
                    if (parts[3] === stored_vars[i]) {
                        stored_vars[i] = null;
                        stored_vars_content[i] = null;
                        appendLine(`${parts[3]} has been removed as a variable.`);
                        rem_complete = true;
                        break;
                    }
                }
                if (rem_complete) {
                    inputEl.value = 'field ';
                    return;
                } else {
                    appendWarn(`${parts[3]} does not exist as variable!`);
                    inputEl.value = 'field ';
                    return;
                }
            }
            else if (parts[2] === "checkstore") {
                appendLine(`Stored: ${stored_vars}`);
                appendLine(`Content: ${stored_vars_content}`);
                inputEl.value = 'field ';
                return;
            }
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
    else if (cmd === 'open github') {
        window.open('https://github.com/bionik-aster/testing_ground','_blank','noopener,noreferrer');
        appendLine(`${cmd} successfully executed.`);
    }
    else {
        appendError('AError 997 - Faulty Starshell code');
        console.error('AError 997 - Faulty StarShell code');
    }
    inputEl.value = '';
});