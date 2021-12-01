//const express = require('express');
//const fetch = require('node-fetch');
import express from 'express';
import { fetchData } from '../helpers/useAddress.js';

const router = express.Router();

router.get('/url', async function (req, res) {
    const account = req.query.add;
    const data = await fetchData(account);
    res.send(data);
});

export default router;