let http = require('http');
let express = require('express');
const config = require('../config');
const helmet = require('helmet');
const bodyParser = require('body-parser');
let app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getUsers = (cb) => {
  const options = {
    ...config.userService,
    path: '/users',
    method: 'GET',
    headers: {
      'Content-Type': 'application/JSON'
    }
  };
  let request = http.request(options, (response) => {
    response.on('data', (data) => {
      const users = JSON.parse(data.toString());
      return cb(null, users);
    });
  });
  request.on('error', (e) => {
    return cb(e);
  });
  request.end();
}
const getMessages = (cb) => {
  const options = {
    ...config.messageService,
    path: '/messages',
    method: 'GET',
    headers: {
      'Content-Type': 'application/JSON'
    }
  };
  let request = http.request(options, (response) => {
    response.on('data', (data) => {
      const messages = JSON.parse(data.toString());
      return cb(null, messages);
    });
  });
  request.on('error', (e) => {
    return cb(e);
  });
  request.end();
}
app.get('/users', (req, res) => {
    getUsers((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.header('Content-Type', 'application/JSON');
      return res.send(data)
    })
  });
app.get('/messages', (req, res) => {
  getMessages((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.header('Content-Type', 'application/JSON');
    return res.send(data)
  });
});
app.use(express.static('static'));
let httpServer = http.createServer(app);
let io = require('socket.io').listen(httpServer);
let wsEvents=require('./wsEvents/events')(io)

app.listen(8000, () => {
  console.log('web server listening on port 8000!');
});
httpServer.listen(3000, () => {
  console.log('ws listening on port 3000!');
});