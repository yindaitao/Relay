const express = require('express');
const router = express();
const relay = require('./relay');

router.post('/', (req, res) => {
    console.log('<===== weibo owner =====>');

    let url = req.body.url;
    let ownerAlias = url.substring(url.lastIndexOf("/") + 1);

    req.body.protocal = "https";
    req.body.host = 'm.weibo.cn';
    req.body.path = '/' + ownerAlias + '?&jumpfrom=weibocom';
    req.body.port = null;
    req.body.method = "GET";
    req.body.cookie = null;

    //调用转发协议
    relay(req, res, (result) => {
        console.log(result);

        let id = result.substring(result.lastIndexOf("/") + 1);
        //https://m.weibo.cn/api/container/getIndex?containerid=1005051886252463

        req.body.protocal = "https";
        req.body.host = 'm.weibo.cn';
        req.body.path = '/api/container/getIndex?containerid=' + id;
        req.body.port = null;
        req.body.method = "GET";
        req.body.cookie = null;

        relay(req, res, null);

    });
});

module.exports = router;