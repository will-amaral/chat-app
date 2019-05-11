const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var numUsers = 0;
var messageId = 1;

app.get('/', async (req, res) => {
    res.send({ response: 'I am alive'}).status(200);
});

io.on('connection', socket => {
    var addedUser = false;
    console.log('Usuário conectado! Total de usuários: ' + numUsers);

    socket.on('chat message', (message) => {
        console.log('mensagem: '+ messageId + data);
        socket.broadcast.emit('chat message', {
            id: messageId,
            username: socket.username,
            message: message
        });
        messageId++;
    });

    socket.on('add user', (username) => {
        if (addedUser) return;

        socket.username = username;
        numUsers++;
        socket.emit('login', {
            numUsers: numUsers
        });

        socket.broadcast.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            username: socket.username
        });
    });

    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;
            console.log('usuário desconectado! Total de usuários: ' + numUsers);
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});

server.listen(8081, () =>{
    console.log('🚀 Servidor online em http://localhost:8081')
});