const path = require('path');
const http = require('http');
const express= require('express');
const socketIO= require('socket.io');

const publicPath= path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app= express();
var server= http.createServer(app);
var io= socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
    console.log('New User Connected');

    socket.emit('newMessage',{
        from:'dart@gmail.com',
        text: 'sairam',
        createdAt: new Date()
    });

    socket.on('createMessage', (message)=>{
        console.log('createMsg: ',message);
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