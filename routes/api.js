const express = require('express');
const fetchData = require('../helpers/useAddress');

const router = express.Router();

router.get('/url', async function (req, res) {
    const account = req.query.add;
    const data = await fetchData(account);
    res.send(data);
});

module.exports = router;