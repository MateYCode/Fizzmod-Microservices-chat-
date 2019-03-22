const express = require('express');
const userRouter= require('./users');
const app = express();
app.use(userRouter);
app.listen(9090, function () {
  console.log('User server listening on port 9090!');
});
