const express = require('express')
const router = express()
const relay = require('./relay');

router.post('/', (req, res) => {
    console.log('<===== weibo =====>');

    //重新封装URL
    var url = req.body.url;
    var id = null;
    if (url != null) id = url.substring(url.lastIndexOf("/") + 1);

    req.body.protocal = "https";
    req.body.host = 'm.weibo.cn';
    req.body.path = '/status/' + id;
    req.body.port = null;
    req.body.method = "GET";

    //调用转发协议
    relay(req, res);
});

module.exports = router;