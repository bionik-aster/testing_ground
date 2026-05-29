function text(tx, ei, speed) {
    return new Promise(resolve => {
        const el = document.getElementById(ei);

        let i = 0;

        function type() {
            if (i < tx.length) {
                el.textContent += tx.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}