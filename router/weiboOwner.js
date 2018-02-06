const express = require('express');
const router = express();
const relay = require('./relay');

//获取Path
let getPath = (url) => {
    let path = '/api/container/getIndex?containerid=';

    //用户P（小号）
    let id = url.substring(url.lastIndexOf("/") + 1);
    if (url.indexOf("/p/") >= 0 && url.indexOf("/u/") < 0) {
        path = path + id;
    }
    //用户id
    if (url.indexOf("/p/") <= 0 && url.indexOf("/u/") >= 0) {
        path = path + "100505" + id;
    }
    return path;
};

router.post('/', (req, res) => {
    console.log('<===== weibo owner =====>');

    let url = req.body.url;
    if (url.indexOf("?") >= 0) {
        url = url.substring(0, url.indexOf("?"));
    }
    if (url.endsWith("/home")) {
        url = url.substring(0, url.indexOf("/home"));
    }
    if (url.indexOf("/p/") >= 0 || url.indexOf("/u/") >= 0) {

        //https://m.weibo.cn/api/container/getIndex?containerid=100505
        //https://m.weibo.cn/api/container/getIndex?type=uid&value=2154105251&containerid=1005052154105251
        //https://m.weibo.cn/api/container/getIndex?containerid=1005051886252463

        let path = getPath(url);

        req.body.protocal = "https";
        req.body.host = 'm.weibo.cn';
        req.body.path = path;
        req.body.port = null;
        req.body.method = "GET";
        req.body.cookie = null;
        //调用转发服务
        relay(req, res);
    } else {
        let ownerAlias = url.substring(url.lastIndexOf("/") + 1);
        req.body.protocal = "https";
        req.body.host = 'm.weibo.cn';
        req.body.path = '/' + ownerAlias + '?&jumpfrom=weibocom';
        req.body.port = null;
        req.body.method = "GET";
        req.body.cookie = null;

        //调用转发服务
        relay(req, res, (result) => {
            //获取博主信息时，需要二次请求的回调方法
            console.log("<======================= result ==========================>");
            console.log(result);

            let path = getPath(result);

            //https://m.weibo.cn/api/container/getIndex?containerid=1005051886252463
            let id = result.substring(result.lastIndexOf("/") + 1);
            req.body.protocal = "https";
            req.body.host = 'm.weibo.cn';
            req.body.path = path;
            req.body.port = null;
            req.body.method = "GET";
            req.body.cookie = null;

            relay(req, res);
        });
    }
});

module.exports = router;