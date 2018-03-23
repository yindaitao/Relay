const express = require('express');
const router = express();
const httpApi = require('../api/httpApi');
const path = require("path");

router.get('/', (req, res) => {
    let fileName = path.resolve("static") + "/index.html";
    res.sendFile(fileName);
});

module.exports = router;