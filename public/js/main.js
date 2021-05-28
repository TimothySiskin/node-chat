const socket = io("https://dry-chamber-15011.herokuapp.com/");
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("Users");

//Get username and room from URL

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

//Join chatroom

socket.emit("joinRoom", { username, room });

//Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Message from server
socket.on("message", (message) => {
  outputMessage(message);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get msg text
  let msg = e.target.elements.message.value;

  //Emit msg to server
  socket.emit("chat-message", msg);

  //Clear input
  e.target.elements.message.value = "";
  e.target.elements.message.focus();
});

//output message to DOM

function outputMessage(message) {
  const { username, text, time } = message;
  const div = document.createElement("div");
  div.innerHTML = `<p class="meta">${username} <span>${time}</span></p>
<p class="text">${text}</p>`;
  div.classList.add("message");
  document.querySelector(".chat-messages").appendChild(div);
}

//Add room name to DOM

function outputRoomName(room) {
  roomName.innerText = room;
}

//Add users to DOM

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
