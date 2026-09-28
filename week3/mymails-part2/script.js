const newMessage = `
<div class="row">
<img class= "avater" src="images/avater-4.jpg" />
<div class= "text-container">
  <h6>Anais Moutarlier</h6>
  <p>
    New message
  </p>
  </div>
  <span class="delete">X</span>
  </div>`;

  document.querySelector("#msg-container").innerHTML += newMessage;

  const messagesCount = document.querySelectorAll("p").length;
  document.querySelector("#count").textContent = messagesCount;

 
  let year = new Date().getUTCFullYear();
  let month;
  let day;

  if (new Date().getMonth() < 9) {
    month = "0" + (new Date().getMonth() + 1);
  } else {
    month = new Date().getMonth();
  }

  if ( new Date().getDate() < 9) {
    day = "0" + new Date().getDate();
  } else {
    day = new Date().getDate();
  }

  const date = `${year}-${month}-${day}`;

  document.querySelector("#footer").innerHTML += 
  `<span id="date">${date}</span>`;
