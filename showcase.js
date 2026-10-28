function showit() {
    const egs = [
        {
            id: 'KSK (1)',
            name: 'Kusakenhe',
            class: 'kusakenhe',
            egtext: '&#x202e;xala, kasaknxa ta.',
            ipa: '/xələ ku.sak.n.xə ta/'
        },
        {
            id: 'PLK/PLS (2)',
            name: 'Paroli Kiusakenam/Paroli Sutonam',
            class: '',
            egtext: 'Xalu, Paroli Kiusakenam zio.',
            ipa: '/ha.lu pa.ɾo.li ki.u.sa.ken.am zio/'
        },
        {
            id: 'IRO (3)',
            name: 'Ironic',
            class: '',
            egtext: 'Halu, ag esi Ironic.',
            ipa: '/halu ag esɪ iɾɔnɪt͡ʃ/'
        },
        {
            id: 'sLBR (4)',
            name: 'skraLubire',
            class: '',
            egtext: 'Apidir, keb eb skraLubire.',
            ipa: '/əpi.dir kɛb ɛb skɾalubiɾɛ/'
        },
        {
            id: 'ILG (5)',
            name: 'Interlangva',
            class: '',
            egtext: 'Hudag, bīu Interlangva.',
            ipa: '/hudag biːu inteɾlaŋva/'
        },
        {
            id: 'NMK (6)',
            name: 'Namukkon',
            class: '',
            egtext: 'kitta, bapu-namukkon-eohħi.',
            ipa: '/kɪtʰa bapu namʊkʰon eɔħi/'
        },
        {
            id: 'LNR (7)',
            name: 'Lénêrśke',
            class: '',
            egtext: 'Émer dig, jêg êhrnethan Lénêrśke.',
            ipa: '/emɚ dɨg jɛg ɛnəθan lenɛ˞ɕkə/'
        },
        {
            id: 'LNR-hptOR (7-H)',
            name: 'Leaneirszke',
            class: '',
            egtext: 'Eamer dig, jeig eihrnethan Leaneirszke.',
            ipa: '/emɚ dɨg jɛg ɛnəθan lenɛ˞ɕkə/'
        },
        {
            id: 'KNH (8)',
            name: '(Yanuwa) Kaneha',
            class: '',
            egtext: 'Alula, aluhi wiri Yanuwa Kaneha.',
            ipa: '/a.lu.la wi.ɹi ja.nu.wa ka.ne.ha/'
        },
        {
            id: 'AYT (9)',
            name: 'Ayta',
            class: '',
            egtext: 'Hajhaj! [↓]Eusi epfhe Ayta.',
            ipa: '/hajhaj ɛʊsi ep͡ɸe ʔajta/'
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
        <p>IPA: <span class="ipa">${rId.ipa}</span></p>
        `;
    });
}
showit();