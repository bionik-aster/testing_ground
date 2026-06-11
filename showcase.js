function showit() {
    const egs = [
        {
            id: 'KSK (1)',
            name: 'Kusakenhe',
            class: 'kusakenhe',
            egtext: '&#x202e;xala, wasat\'qrk ta.'
        },
        {
            id: 'PLK/PLS (2)',
            name: 'Paroli Kiusakenam/Paroli Sutonam',
            class: '',
            egtext: 'Xalu, Paroli Kiusakenam zio.'
        },
        {
            id: 'IRO (3)',
            name: 'Ironic',
            class: '',
            egtext: 'Halu, ag esi Ironic.'
        },
        {
            id: 'sLBR (4)',
            name: 'skraLubire',
            class: '',
            egtext: 'Apidir, keb eb skraLubire.'
        }
    ];
    const finalshow = document.getElementById('conlang-showcase');
    let rId = egs[Math.floor(Math.random() * egs.length)];

    finalshow.innerHTML = `
    <p class="fine">ID: ${rId.id}</p>
    <p>Name: <b>${rId.name}</b></p>
    <p>Example: <span class="${rId.class}"><b>${rId.egtext}</b></span></p>
    `;

    finalshow.addEventListener('click', () => {
        let rId = egs[Math.floor(Math.random() * egs.length)];
        finalshow.innerHTML = `
        <p class="fine">ID: ${rId.id}</p>
        <p>Name: <b>${rId.name}</b></p>
        <p>Example: <span class="${rId.class}"><b>${rId.egtext}</b></span></p>
        `;
    });
}
showit();