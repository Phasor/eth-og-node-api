const express = require('express');
const routes = require('./routes/api.js')
const dotenv = require('dotenv');

// set up express app
const app = express();

//setup static files path
app.use(express.static('public'));

// initialize routes
app.use('/api', routes);


// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests on port 4000');
    //console.log(process.env.ETHERSCAN_API_KEY);
});