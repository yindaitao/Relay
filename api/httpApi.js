const qs = require('querystring')

const Api = (protocal, host, port, path, method, contentType, cookie, data, okCallback, errorCallback) => {
    //输出日志信息
    console.log('URL => ' + protocal + "://" + host + ":" + port + path)

    //contentType
    if (contentType == null)
        contentType = 'application/x-www-form-urlencoded'


    //请求参数
    let options = {
        hostname: host,
        method: method,
        path: path,
        port: port,
        headers: {
            'Content-Type': contentType,
            'Cookie': cookie,
        }
    }
    console.log(options);

    //http协议
    let httpProtocal = require('http');
    if (httpProtocal != null && protocal == 'https') {
        httpProtocal = require('https');
    }

    const client = httpProtocal.request(options, (res) => {

        //数据块
        let chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
        })

        //数据处理完成
        res.on('end', () => {
            //拼接数据块
            let body = Buffer.concat(chunks)
            let response = body.toString()
            console.log('<================= response end data ===================> ');
            console.log(response);
            res.setEncoding('utf8')
            //执行成功的回调函数
            okCallback(response, res.statusCode, res.headers)
        })

        //错误
        res.on('error', (error) => {
            console.log('<================ Error ====================> ');
            console.log(error);
            errorCallback(error);
        })

    });

    //POST方式时写入请求数据
    if (data != null) {
        console.log("<====================== POST方式时写入请求数据 ========================>");
        console.log(data);
        client.write(data);
    }
    
    client.end();
}

module.exports = Api;