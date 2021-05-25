const socket = io();
const chatForm = document.getElementById('chat-form')


//Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)
})

chatForm.addEventListener('submit', (e)=>{
e.preventDefault();

//Get msg text
let msg = e.target.elements.message.value

//Emit msg to server
socket.emit('chat-message', msg);
})

//output message to DOM

function outputMessage(message){
const div = document.createElement('div');
div.innerHTML = `<p class="meta">Placholder meta</p>
<p class="text">${message}</p>`
div.classList.add('message')
document.querySelector('.chat-messages').appendChild(div)
}