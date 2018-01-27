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
    var cookie = req.body.cookie;

    var result = httpApi(protocal, host, port, path, method, contentType, cookie, data,
        (response, code, headers) => {
            // console.log('<======================== headers ===========================>')
            // console.log(headers);
            //设置cookie值
            if (host != "m.weibo.cn" && headers['set-cookie'] != null) {
                // console.log("----------------------------------------------");
                res.setHeader('set-Cookie', headers['set-cookie']);
                res.setHeader('expires', headers.expires);
                res.setHeader('date', headers.date);
                res.setHeader('content-type', headers['content-type']);

                //把添加cookie到返回的对象中
                var jsonObj = JSON.parse(response);
                jsonObj.cookie = headers['set-cookie'][0];
                response = JSON.stringify(jsonObj)
            }

            res.status(code).send(response);
        },
        (error) => {
            res.status(500).send(error);
        }
    );
});

module.exports = router;