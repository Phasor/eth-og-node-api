const express = require('express');
const cors = require('cors');
const routes = require('./routes/api.js')
const dotenv = require('dotenv');
const helmet = require('helmet');

// set up express app
const app = express();

//setup static files path
app.use(express.static('public'));

//enable cors
app.use(cors());

//enable Helmet for security
app.use(helmet());

// initialize routes
app.use('/api', routes);

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests on port 4000');
});