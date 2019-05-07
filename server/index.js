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
    numUsers++;
    console.log('Usuário conectado! Total de usuários: ' + numUsers);
    socket.on('chat message', (message) => {
        console.log('mensagem: '+ messageId + message);
        io.emit('chat message', { id: messageId, message: message });
        messageId++;
    });
    socket.on('disconnect', () => {
        numUsers--;
        console.log('usuário desconectado! Total de usuários: ' + numUsers);
    })
});

server.listen(8081, () =>{
    console.log('🚀 Servidor online em http://localhost:8081')
});