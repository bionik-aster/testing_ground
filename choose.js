import {fetchWithAErrors} from './aerrors.js';
(async () => {await fetchWithAErrors('/api/data');})();
function oldweb() {
    fetchWithAErrors('https://bionik-aster.github.io/index.html', {}, "text")
        .then (html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.querySelector('body').innerHTML;
            document.getElementById('display').innerHTML = content;
        })
};
document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('oldwebbtn')
        .addEventListener('click',oldweb);

});