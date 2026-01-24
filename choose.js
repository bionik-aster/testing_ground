const iframe = document.getElementById('display')
const oldwebbtn = document.getElementById('oldwebbtn')
const loading = document.getElementById('loading')
oldwebbtn.addEventListener('click', () => {
  if (iframe.style.display === 'block') {
    iframe.style.display = 'none';
    loading.style.display = 'none';
  } else {
    iframe.style.display = 'block';
    loading.style.display = 'block';

    iframe.src = 'https://bionik-aster.github.io/index.html';

    iframe.onload = () => {loading.style.display = 'none';};
  }
});