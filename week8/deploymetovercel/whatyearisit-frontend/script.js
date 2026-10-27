fetch('https://whatyearisit-backend-two-eosin.vercel.app/year')
  .then(response => response.json())
  .then(data => {
    document.getElementById('year').textContent = data.year;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération de l’année :', error);
    document.getElementById('year').textContent = 'indisponible';
  });