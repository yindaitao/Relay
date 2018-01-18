const express = require('express')
const router = express()
const httpApi = require('../api/httpApi')
const relay = require('./relay');



router.post('/', (req, res) => {

    console.log('<===== weibo =====>');

    //重新封装URL
    var url = req.body.url;
    var id = null;
    if (url != null)
        id = url.substring(url.lastIndexOf("/") + 1);
    req.body.host = 'm.weibo.cn';
    req.body.path = '/status/' + id;

    relay(req, res);
});

module.exports = router;