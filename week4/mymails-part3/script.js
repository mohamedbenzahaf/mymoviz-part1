document.querySelector("#btn-add").addEventListener("click", function () {

  const message = document.querySelector("#add-message").value;

  const newMessage = `
    <div class="row new-row">
      <img class="avatar" src="images/avatar-1.jpg" />
      <div class="text-container">
        <h6>John Doe</h6>
        <p>${message}</p>
      </div>
      <span class="delete">✖</span>
    </div>
  `;

  document.querySelector("#msg-container").innerHTML += newMessage;
  document.querySelectorAll(".delete")[document.querySelectorAll(".delete").length - 1].addEventListener("click", function () {

  this.parentNode.remove();

  const messagesCount = document.querySelectorAll("p").length;
  document.querySelector("#count").textContent = messagesCount;

});

  document.querySelector("#add-message").value = "";

  const messagesCount = document.querySelectorAll("p").length;
  document.querySelector("#count").textContent = messagesCount;
});

for (let i = 0; i < document.querySelectorAll('.delete').length; i++) {

document.querySelectorAll('.delete')[i].addEventListener('click',

function () {

this.parentNode.remove();

const messagesCount = document.querySelectorAll('p').length;

document.querySelector('#count').textContent = messagesCount;

}

)

}

const newMessage = `
  <div class="row new-row">
    <img class="avatar" src="images/avatar-1.jpg" />
    <div class="text-container">
      <h6>John Doe</h6>
      <p>New message</p>
    </div>
    <span class="delete">✖</span>
  </div>
`;

// document.querySelector('#msg-container').innerHTML += newMessage;

const messagesCount = document.querySelectorAll('p').length;
document.querySelector('#count').textContent = messagesCount;

let year = new Date().getUTCFullYear();
let month;
let day;

if (new Date().getMonth() < 9) {
  month = "0" + (new Date().getMonth() + 1);
} else {
  month = new Date().getMonth() + 1;
}

if (new Date().getDate() < 9) {
  day = "0" + new Date().getDate();
} else {
  day = new Date().getDate();
}

const date = year + "-" + month + "-" + day;
document.querySelector('#footer').innerHTML += `<span id="date">${date}</span>`;

document.querySelector("#btn-search").addEventListener("click", function () {

  const textToCompare = document.querySelector("#search-message").value;

  const messages = document.querySelectorAll(".row");

  for (let i = 0; i < messages.length; i++) {

    const name = messages[i].querySelector("h6").textContent;

    if (name.toLowerCase().includes(textToCompare.toLowerCase())) {
      messages[i].style.display = "flex";
    } else {
      messages[i].style.display = "none";
    }

  }

  document.querySelector("#search-message").value = "";

});