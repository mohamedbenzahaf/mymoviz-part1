

const addCityButton = document.getElementById('addCity');
const cityNameInput = document.getElementById('cityNameInput');
const cityList = document.getElementById('cityList');

// Affiche une ville dans la page
function displayCity(city) {
  const cityContainer = document.createElement('div');
  cityContainer.className = 'cityContainer';

  cityContainer.innerHTML = `
    <p class="name"></p>
    <p class="description"></p>
    <img class="weatherIcon" />
    <div class="temperature">
      <p class="tempMin"></p>
      <span>-</span>
      <p class="tempMax"></p>
    </div>
    <button class="deleteCity">Supprimer</button>
  `;

  cityContainer.querySelector('.name').textContent = city.cityName;
  cityContainer.querySelector('.description').textContent = city.description;

  cityContainer.querySelector('.weatherIcon').src =
    `images/${city.main}.png`;

  cityContainer.querySelector('.tempMin').textContent =
    `${Math.round(city.tempMin)}°C`;

  cityContainer.querySelector('.tempMax').textContent =
    `${Math.round(city.tempMax)}°C`;

  cityContainer.querySelector('.deleteCity').addEventListener('click', async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/weather/${encodeURIComponent(city.cityName)}`,
        { method: 'DELETE' }
      );

      const data = await response.json();

      if (data.result) {
        cityContainer.remove();
      } else {
        alert(data.error || 'Impossible de supprimer cette ville');
      }
    } catch (error) {
      alert('Impossible de contacter le serveur');
      console.error(error);
    }
  });

  cityList.appendChild(cityContainer);
}

// Charge les villes enregistrées au démarrage
async function loadCities() {
  try {
    const response = await fetch('http://localhost:3000/weather');
    const data = await response.json();

    if (data.weather) {
      // Évite de dupliquer Paris, déjà présente dans index.html
      cityList.innerHTML = '';

      data.weather.forEach(city => {
        displayCity(city);
      });
    }
  } catch (error) {
    console.error('Erreur lors du chargement des villes :', error);
  }
}

// Ajoute une ville avec la météo récupérée par le backend
addCityButton.addEventListener('click', async () => {
  const cityName = cityNameInput.value.trim();

  if (!cityName) {
    alert('Veuillez saisir le nom d’une ville');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cityName }),
    });

    const data = await response.json();

    if (!data.result) {
      alert(data.error || 'Impossible d’ajouter cette ville');
      return;
    }

    displayCity(data.weather);
    cityNameInput.value = '';
  } catch (error) {
    alert('Impossible de contacter le serveur');
    console.error(error);
  }
});

// Exécute le chargement dès l'ouverture de la page
loadCities();

