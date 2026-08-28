let database = [];
const btn = document.getElementById('rand');

btn.addEventListener('click',() => {
    let randint = Math.floor(Math.random() * database.length);
    alert(`Random trip found: ${database[randint].time}`)
    window.location.href = database[randint].url;
});

async function grabdata() {
    try {
        const callresponse = await fetch('trips.json');
        database = await callresponse.json();
        console.log('Databse loaded successfully!');
    } catch(e) {
        console.error(`An error occurred while loading: ${e}`);
        alert(`The database couldn't load; check the console!`);
    }
}
grabdata();