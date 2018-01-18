const express = require('express')
const router = express()
const httpApi = require('../api/httpApi')



router.post('/', (req, res) => {

    console.log('<===== relay =====>');

    var host = req.body.host;
    var path = req.body.path;
    var method = req.body.method;

    var contentType = null;
    if (req.body.contentType != null)
        contentType = req.body.contentType;

    var data = null;
    if (req.body.data != null)
        data = req.body.data;

    httpApi(
        host,
        path,
        method,
        contentType,
        data,
        (response, code) => {
            res.status(code).send(response);
        },
        (error) => {
            res.status(500).send(error);
        }
    );
});

module.exports = router;