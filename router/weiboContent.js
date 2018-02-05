const express = require('express')
const router = express()
const relay = require('./relay');

router.post('/', (req, res) => {
    console.log('<===== weibo content =====>');

    //重新封装URL
    let url = req.body.url;
    let id = url.substring(url.lastIndexOf("/") + 1);

    req.body.protocal = "https";
    req.body.host = 'm.weibo.cn';
    req.body.path = '/statuses/show?id=' + id;
    req.body.port = null;
    req.body.method = "GET";
    req.body.cookie = null;

    //调用转发协议
    relay(req, res);
});

module.exports = router;