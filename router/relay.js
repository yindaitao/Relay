const express = require('express')
const router = express()
const httpApi = require('../api/httpApi')

//回调函数
let okCallBack = null;

//express 请求
let postRequest = router.post('/', (req, res) => {

    let protocal = req.body.protocal;
    let host = req.body.host;
    let port = req.body.port;
    let path = req.body.path;
    let method = req.body.method;
    let contentType = req.body.contentType;
    let data = req.body.data;
    let cookie = req.body.cookie;

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
                let jsonObj = JSON.parse(response);
                jsonObj.cookie = headers['set-cookie'][0];
                response = JSON.stringify(jsonObj)
            }

            //设置location值
            if (host == "m.weibo.cn" && headers.location != null) {
                response = headers.location;
            }
            
            //判断是否存在回调函数
            if (okCallBack === undefined || okCallBack === null) {
                console.log("<3333333333333333333333333333333333333333333>");
                res.status(code).send(response);
            } else {
                console.log("<44444444444444444444444444444444444444444444444444>");
                okCallBack(response);
            }
        },
        (error) => {
            res.status(500).send(error);
        }
    );
});

let temp = (requestsssss, responsesssssss, sucessCallBack) => {
    console.log('<===== relay =====>');

    okCallBack = sucessCallBack;

    postRequest(requestsssss, responsesssssss);
};

module.exports = temp;