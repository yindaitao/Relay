const express = require('express')
const router = express()
const httpApi = require('../api/httpApi')

let temp = (requestsssss, responsesssssss, sucessCallBack) => {
    console.log('<===== relay =====>');
    console.log("<^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^>");
    console.log(sucessCallBack);

    router.post('/', (req, res) => {

        var protocal = req.body.protocal;
        var host = req.body.host;
        var port = req.body.port;
        var path = req.body.path;
        var method = req.body.method;
        var contentType = req.body.contentType;
        var data = req.body.data;
        var cookie = req.body.cookie;

        httpApi(protocal, host, port, path, method, contentType, cookie, data,
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

                //设置location值
                if (host == "m.weibo.cn" && headers.location != null) {
                    response = headers.location;
                }
                console.log(sucessCallBack);
                if (sucessCallBack === null) {
                    console.log("<3333333333333333333333333333333333333333333333333333>")
                    res.status(code).send(response);
                } else {
                    console.log("<4444444444444444444444444444444444444444444444444444444444>")
                    sucessCallBack(response);
                }
            },
            (error) => {
                res.status(500).send(error);
            }
        );
    });

    router(requestsssss, responsesssssss);
};

module.exports = temp;