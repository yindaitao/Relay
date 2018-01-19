const express = require('express');
const router = express();
const httpApi = require('../api/httpApi');

router.get('/', (req, res) => {

    res.send('Hello World!');
});

module.exports = router;