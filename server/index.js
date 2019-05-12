const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const randomColor = require('randomcolor');

var numUsers = 0;

app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './dist'});
  });

const getUsers = server => {
    let users = [];
    for(var socketId in server) {
        users.push(server[socketId].username);
    }
    console.log(users);
    return users;
}

io.on('connection', socket => {
    var addedUser = false;
    var color = randomColor();
    socket.on('chat message', (message) => {
        console.log('mensagem: '+ message);
        socket.broadcast.emit('chat message', {
            color: color,
            username: socket.username,
            message: message
        });
    });

    socket.on('add user', (username) => {
        if (addedUser) return;
        socket.username = username;
        numUsers++;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        console.log('Usuário conectado: ' + username + '\nTotal de usuários: ' + numUsers);     
        socket.broadcast.emit('user joined', {
            warning: true,
            username: socket.username,
            message: ' entrou na sala',
            numUsers: numUsers
        });
        io.emit('total users',getUsers(io.sockets.sockets));
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
                warning: true,
                username: socket.username,
                message: ' saiu da sala',
                numUsers: numUsers,
                users: getUsers(io.sockets.sockets)
            });
            io.emit('total users',getUsers(io.sockets.sockets));
        }
    });
});

server.listen(2000, () =>{
    console.log('🚀 Servidor online em http://localhost:2000')
});