// Write your code here
document.querySelector('#fetch-btn').addEventListener('click', function () {
  fetch('https://v2.jokeapi.dev/joke/Any?lang=fr')
    .then(response => response.json())
    .then(data => {
     document.querySelector('#result-question').textContent = data.setup;
     document.querySelector('#result-punchline').textContent = data.delivery;
    });
});