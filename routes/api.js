const express = require('express');
const cors = require('cors');
const fetchData = require('../helpers/useAddress');

const router = express.Router();

router.get('/url', cors(), async function (req, res) {
    const account = req.query.add;
    const key = req.query.key;
    if (key == process.env.THIS_API_KEY) {
        try {
            const data = await fetchData(account);
            res.send(data);
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.status(401).send('wrong password')
    }
});

module.exports = router;