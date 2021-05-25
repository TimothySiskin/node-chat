const socket = io();
const chatForm = document.getElementById('chat-form')

socket.on('message', message => {
    console.log(message)
})

chatForm.addEventListener('submit', (e)=>{
e.preventDefault();

//Get msg text
let msg = e.target.elements.message.value

//Emit msg to server
socket.emit('chat-message', msg);
})