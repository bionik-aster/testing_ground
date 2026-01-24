import { fetchWithAErrors } from './aerrors.js';

const display = document.getElementById('display');
const button = document.getElementById('oldwebbtn');

let cachedHtml = null;

async function oldweb() {
  // if display is displaying, stop display
  if (display.style.display === 'block') {
    display.style.display = 'none';
    return;
  }

  // if cachedHtml isnt null then display
  if (cachedHtml) {
    display.style.display = 'block';
    return;
  }

  // we're loading hold on
  display.innerHTML = "<p>Loading...</p>";
  display.style.display = 'block';

  try {
    const html = await fetchWithAErrors(
      'https://bionik-aster.github.io/index.html',
      {},
      "text"
    );

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    cachedHtml = doc.querySelector('body').innerHTML;

    display.innerHTML = cachedHtml;
  } catch (err) {
    console.error("Failed to load older website:", err);
    display.innerHTML = "<p>Failed to load older website.</p>";
  }
}

// button to initiate?
button.addEventListener('click', oldweb);