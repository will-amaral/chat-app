var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const numUsers = 0;

app.get('/', async (req, res) => {
    res.send({ response: 'I am alive'}).status(200);
  });

io.on('connection', socket => {
    numUsers++;
    console.log('usuário conectado! Total de usuários: ' + numUsers);
    socket.on('disconnect', () => {
        numUsers--;
        console.log('usuário desconectado');
    })
});

server.listen(8081, () =>{
    console.log('🚀 Servidor online em http://localhost:8081')
});