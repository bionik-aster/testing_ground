window.addEventListener('load', async () => {
    const ls = document.getElementById("ls");
    const lo = document.getElementById("lo");

    await text(
        "user auth hash 21232f297a57a5a743894a0e4a801fc3",
        "loading-command",
        85
    );
    document.getElementById('blink1').remove();
    await text(
        "ASuccess(auth-hash): Continue",
        "loading-response",
        0
    );
    document.getElementById('loading-command2').style.display = 'inline';
    document.getElementById('blink2').style.display = 'inline-block';
    await text(
        "user auth pass ************", 
        "loading-command2", 
        125
    );
    document.getElementById('blink2').remove();
    await text(
        "ASuccess(auth-pass): Loading Success!", 
        "loading-success", 
        0
    );
    

    setTimeout(()=>{
        ls.classList.add('hide');
        lo.style.opacity = '1';

        ls.addEventListener('transitionend', function() {
            ls.remove();   
        }, { once:true });
    },750);
});