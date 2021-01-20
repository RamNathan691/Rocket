const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Setting up the static folder
app.use(express.static(path.join(__dirname,'public')));

//Run with client connects
io.on('connection',socket=>{
    console.log('New Ws Connction');
    socket.emit('message','Welcome to Rocket');

    //Broadcast whne a user connects that a particular user has been connected
    socket.broadcast.emit('message','A user has joined the chat');
    //Runs when the client disconnects
    socket.on('disconnect',()=>{
        io.emit('message','A user has left the chat');
    });
    //Listen for chat message
    socket.on('chatMessage',(msg) => {
        io.emit('message',msg);
    })
})

//Starting the server
const PORT = 3000 || process.env.PORT;

server.listen(PORT,
    ()=>
    console.log("Server running on port ${PORT}")
    );
