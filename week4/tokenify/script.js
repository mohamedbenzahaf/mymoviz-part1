const searchBar = document.getElementById("creatorSearchBar");
const creatorsList = document.getElementById("creatorsList");

const clientId = "mmu9gzrlixpzh8lt5n1lnjauqm19a4";
const clientSecret = "8zbkqw5i0757pcjpuf7dmmyc8oxog0";
async function getAccessToken() {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
  });

  const data = await response.json();

  

  return data.access_token;
}

async function searchCreator(creatorName) {
  const accessToken = await getAccessToken();

  const response = await fetch(
  `https://api.twitch.tv/helix/search/channels?query=${creatorName}&first=1`,
  {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  const data = await response.json();


  return data.data[0];
}

async function getClips(broadcasterId) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    }
  );

  const data = await response.json();

  console.log(data);

  return data.data;
}
async function search() {
  const creatorName = searchBar.value.trim();

  if (!creatorName) {
    creatorsList.innerHTML = `
      <p id="error">Creator not found</p>
    `;
    return;
  }
  creatorSearchButton.addEventListener("click", search);

  const creator = await searchCreator(creatorName);

  if (!creator) {
    creatorsList.innerHTML = `
      <p id="error">Creator not found</p>
    `;
    return;
  }

  const clips = await getClips(creator.id);

  creatorsList.innerHTML = "";

  clips.forEach((clip) => {
    creatorsList.innerHTML += `
      <div class="clip-item">
        <a href="${clip.url}" target="_blank">
          <img src="${clip.thumbnail_url}" alt="${clip.title}">
        </a>
        <h2>${clip.title}</h2>
      </div>
    `;
  });
}
searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

    const creator = await searchCreator(creatorName);
    if (!creator) {
  creatorsList.innerHTML = `
    <p id="error">Creator not found</p>
  `;
  return;
}

    const clips = await getClips(creator.id);

   creatorsList.innerHTML = "";

clips.forEach((clip) => {
  creatorsList.innerHTML += `
    <div>
      <a href="${clip.url}" target="_blank">
        <img src="${clip.thumbnail_url}" alt="${clip.title}">
      </a>
      <h2>${clip.title}</h2>
    </div>
  `;
});
  }
});