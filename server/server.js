const path = require('path');
const http = require('http');
const express= require('express');
const socketIO= require('socket.io');

const{generateMessage} = require('./utils/message');
const publicPath= path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app= express();
var server= http.createServer(app);
var io= socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New User Connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome To App'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage', (message,callback)=>{
        console.log('createMsg: ',message); 
        io.emit('newMessage',generateMessage(message.from,message.text)); 
        callback('This is from the Admin');
        /* socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        }); */
    });

    socket.on('disconnect',()=>{
        console.log('User was Disconnected');
    });
});

server.listen(port, () =>{
    console.log(`Sever is up on port ${port}`); 
});

/* console.log(__dirname+'/../public');
console.log(publicPath); */