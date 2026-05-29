setInterval(() => {
    let now = new Date();
    let hour = now.getHours();
    if (hour <= 8 || hour >= 21) {
        document.body.className = 'night';
    } else {
        document.body.className = 'day';
    }
},1000);