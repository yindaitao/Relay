const express = require('express');
const router = express();
const httpApi = require('../api/httpApi');

router.get('/', (req, res) => {

    res.sendFile('./static/index.html');
});

module.exports = router;