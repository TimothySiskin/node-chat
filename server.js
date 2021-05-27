const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessages = require("./utils/messages");

//creating express server
const app = express();
const server = http.createServer(app);

//Socet io
io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "chatBot";

//on client connection

io.on("connection", (socket) => {
  console.log("client connected");
  socket.emit("message", formatMessages(botName, "Welcome!"));

  //Broadcast when a user connets

  socket.broadcast.emit(
    "message",
    formatMessages("botName", "A user has join the chat")
  );

  //on disconnetion

  socket.on("disconnect", () => {
    io.emit("message", formatMessages("botName", "A User has left the chat"));
  });

  //Listen for msg
  socket.on("chat-message", (msg) => {
    io.emit("message", formatMessages("USER", msg));
  });
});

//use port 3000 unless there exist a preconfigured port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
