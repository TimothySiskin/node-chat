const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io')

//creating express server
const app = express();
const server = http.createServer(app)

//Socet io
io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//on client connection

io.on("connection", socket => {
console.log("client connected")
})

//use port 3000 unless there exist a preconfigured port
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{console.log(`server running on ${PORT}`)});

