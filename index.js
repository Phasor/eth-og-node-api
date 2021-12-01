import express from 'express';
//const routes = require('./routes/api');
import routes from './routes/api.js'

//pull in environment variables
//require('dotenv').config();
import dotenv from 'dotenv';

// set up express app
const app = express();

// initialize routes
app.use('/api', routes);

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests on port 4000');
    //console.log(process.env.ETHERSCAN_API_KEY);
});