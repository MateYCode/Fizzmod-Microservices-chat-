const express = require('express');
const msgRouter= require('./messages');
const app = express();
app.use(msgRouter);
app.listen(8080, function () {
  console.log('Messages server listening on port 8080!');
});
