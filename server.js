const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessages = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
} = require("./utils/users");

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
  //Welcome curren user
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    socket.emit("message", formatMessages(botName, `Welcome ${username}`));

    //Broadcast when a user connets

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessages("botName", `${username} has join the chat`)
      );

    //Send user and room info

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //Listen for msg
  socket.on("chat-message", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessages(user.username, msg));
  });

  //on disconnetion

  socket.on("disconnect", () => {
    const user = userLeaves(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessages("botName", `${user.username} has left the chat`)
      );
      //Send user and room info

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

//use port 3000 unless there exist a preconfigured port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
