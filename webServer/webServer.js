let http = require('http');
let express = require('express');
const config = require('../config');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userApiClient = require('../userService/userApiClient');
const messageApiClient = require('../messageService/messageApiClient')
let app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  userApiClient.getUsers()
    .then(data => {
      res.header('Content-Type', 'application/JSON');
      return res.send(data)
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    })
});
app.get('/messages', (req, res) => {
  messageApiClient.getMessages()
    .then(data => {
      res.header('Content-Type', 'application/JSON');
      return res.send(data)
    })
    .catch (err => {
      console.log(err);
      return res.sendStatus(500);
    })
  });

app.use(express.static('webServer/static'));
let httpServer = http.createServer(app);
let io = require('socket.io').listen(httpServer);
let wsEvents = require('./wsEvents/events')(io)

app.listen(8000, () => {
  console.log('web server listening on port 8000!');
});
httpServer.listen(3000, () => {
  console.log('ws listening on port 3000!');
});