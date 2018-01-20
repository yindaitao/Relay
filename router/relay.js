const express = require('express')
const router = express()
const httpApi = require('../api/httpApi')

router.post('/', (req, res) => {
    console.log('<===== relay =====>');
    var protocal = req.body.protocal;
    var host = req.body.host;
    var port = req.body.port;
    var path = req.body.path;
    var method = req.body.method;
    var contentType = req.body.contentType;
    var data = req.body.data;

    var result = httpApi(protocal, host, port, path, method, contentType, data,
        (response, code, cookie) => {
            //设置cookie值
            if (cookie != null)
                res.setHeader('set-Cookie', cookie);
            res.status(code).send(response);
        },
        (error) => {
            res.status(500).send(error);
        }
    );
});

module.exports = router;