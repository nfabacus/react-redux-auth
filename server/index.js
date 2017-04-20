//Main starting point of the server application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

// App Setup middlewares
app.use(morgan('combined')); //morgan logs incoming requests, used for debugging
app.use(cors()); //tell the app to use cors middleware
app.use(bodyParser.json({ type: '*/*'})); //parse incoming requests to json
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
