const express = require('express');
const fetchData = require('../helpers/useAddress');

const router = express.Router();

router.get('/url', async function (req, res) {
    const account = req.query.add;
    const key = req.query.key;
    if (key == process.env.THIS_API_KEY) {
        const data = await fetchData(account);
        res.send(data);
    }
    else {
        res.status(401).send('wrong password')
    }
});

module.exports = router;