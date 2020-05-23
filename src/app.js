const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');

const app = express();

// this will automatically parse incoming json to an object
app.use(express.json());
app.use(userRouter);

module.exports = app;