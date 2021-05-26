const socket = io();
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

//Message from server
socket.on('message', message => {
    console.log(message)
    outputMessage(message)


    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', (e)=>{
e.preventDefault();

//Get msg text
let msg = e.target.elements.message.value

//Emit msg to server
socket.emit('chat-message', msg);


//Clear input
e.target.elements.message.value = '';
e.target.elements.message.focus();


})



//output message to DOM

function outputMessage(message){
    const {username, text, time} = message;
const div = document.createElement('div');
div.innerHTML = `<p class="meta">${username} <span>${time}</span></p>
<p class="text">${text}</p>`
div.classList.add('message')
document.querySelector('.chat-messages').appendChild(div)
}