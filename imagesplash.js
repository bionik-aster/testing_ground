function imagefunc() {
    var messages = [
        `aster_pfp.png`,
        `asterbits_pfp.png`,
        `catgirl_pfp.png`,
        `new_aster_pfp.png`,
    ];
    let ranIm = Math.floor(Math.random() * messages.length); // returns intvar from 0 to [current list length]
    var image = document.getElementById('imagesplash'); // sets up the later image.src and image.onerror
    image.src = 'https://asterirving.vercel.app/images/' + messages[ranIm]; // sets the <image src="">, eg <image src="https://asterirving.vercel.app/images/aster_pfp.png"
    image.onerror = () => { // on error in image or this function, call on this here arrow function
        image.onerror = null; // resets error status to prevent loop
        image.src = 'images/default_pfp.png' // defaults back to *this website's* own images/ folder and finds 'default_pfp.png'
    };
}
document.addEventListener('DOMContentLoaded', () => { // on the page's content loaded ie the <img> tag exists, call on this arrow function
    const image = document.getElementById('imagesplash'); // redesignates a local 'image' variable because its no longer in scope of old one
    image.addEventListener('click',imagefunc); // on the image clicked, call on imagefunc()
    imagefunc(); // initial load
});