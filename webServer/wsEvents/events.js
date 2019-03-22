let io = require('socket.io')
module.exports = function (io) {
      let usernames = [];
      io.sockets.on('connection', function (socket) {
            console.log('Socket Connected...');
            socket.on('newUser', (data, callback) => {
                  if (usernames.indexOf(data.username) != -1) {
                        callback(false);
                  } else {
                        callback(true);
                        socket.username = data.username;
                        usernames.push(socket.username);
                        updateUsernames();
                  }
            })
            // User List Update
            function updateUsernames() {
                  io.sockets.emit('updateUserList', usernames);
            }
            // New Message
            socket.on('sendMessage', function (data) {
                  console.log(data)
                  io.sockets.emit('newMessage', { msg: data.message, user: socket.username });
            });
            // Disconnected
            socket.on('disconnect', function (data) {
                  if (!socket.username) {
                        return;
                  }
                  usernames.splice(usernames.indexOf(socket.username), 1);
                  updateUsernames();
            });
      })
}

