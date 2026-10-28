function showit() {
    const egs = [
        {
            id: 'KSK (1)',
            name: 'Kusakenhe',
            class: 'kusakenhe',
            egtext: '&#x202e;xala, kasaknxa ta.'
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
        },
        {
            id: 'ILG (5)',
            name: 'Interlangva',
            class: '',
            egtext: 'Hudag, bīu Interlangva.'
        },
        {
            id: 'NMK (6)',
            name: 'Namukkon',
            class: '',
            egtext: 'kitta, bapu-namukkon-eohħi.'
        },
        {
            id: 'LNR (7)',
            name: 'Lénêrśke',
            class: '',
            egtext: 'Émer dig, jêg êhrnethan Lénêrśke.'
        },
        {
            id: 'LNR-hptOR (7-H)',
            name: 'Leaneirszke',
            class: '',
            egtext: 'Eamer dig, jeig eihrnethan Leaneirszke.'
        },
        {
            id: 'KNH (8)',
            name: '(Yanuwa) Kaneha',
            class: '',
            egtext: 'Alula, aluhi wiri Yanuwa Kaneha.'
        },
        {
            id: 'AYT (9)',
            name: 'Ayta',
            class: '',
            egtext: 'Hajhaj! [↓]Eusi epfhe Ayta.'
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