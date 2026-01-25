(function () {
  const birthDate = new Date(2011, 4, 5); // 2011 / index 4 / 5

  function updateVersion() {
    const now = new Date();

    let years = now.getFullYear() - birthDate.getFullYear(); // curyear - 2011
    let months = now.getMonth() - birthDate.getMonth(); // curmonth - 4
    let days = now.getDate() - birthDate.getDate(); // curday -5

    if (days < 0) {
      months--; // counterincrement by 1
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); // curyear, curmonth, 0 days
      days += prevMonth.getDate(); // days = 0 + curday - 5
    }

    if (months < 0) {
      years--; // counterincrement by 1
      months += 12; // reset months
    }

    months++; // assures it includes curmonth

    const el = document.getElementById("currentver");
    if (el) { // if element exists then insert
      el.textContent = `v${years}.${months}.${days}`;

      const content = el.closest('.sdbcontent');
      if (content) { // if content exists
        content.classList.remove('scroll'); // remove existing scroll class
        void content.offsetWidth; // reset offset width
        content.classList.add('scroll'); // add back the scroll class ergo restarting animation with <span> included
      }
    }
  }

  function scheduleMidnightUpdate() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 1 // curyear / curmonth index / curdate + 1 / 0 hrs / 0 mins / 1 sec
    );

    const msUntilMidnight = nextMidnight - now;

    setTimeout(() => {
      updateVersion();
      setInterval(updateVersion, 24 * 60 * 60 * 1000); // set interval for 1 day per updateVersion action
    }, msUntilMidnight);
  }

  if (document.readyState === "loading") { // if readystate !== ready
    document.addEventListener("DOMContentLoaded", () => { // listen for domcontentloaded
      updateVersion(); // update the version
      scheduleMidnightUpdate(); // then schedule next updateVersion
    });
  } else { // else, run as normal
    updateVersion();
    scheduleMidnightUpdate();
  }
})(); // initiate the function