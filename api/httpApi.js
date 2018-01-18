const https = require('https')
const qs = require('querystring')

Api = (host, path, method, contentType, data, okCallback, errorCallback) => {

    //输出日志信息
    console.log('URL => ' + host + path)

    var ContentType = 'application/x-www-form-urlencoded'
    if (contentType != null)
        ContentType = contentType
    if (data != null) {
        console.log('request data => ' + JSON.stringify(data))

    }

    let options = {
        hostname: host,
        method: method,
        path: path,
        port: null,
        headers: {
            'Content-Type': ContentType
        }
    }

    const client = https.request(options, (res) => {

        console.log('error');
        //错误
        res.on('error', (error) => {
            console.log('Error => ' + error)
            errorCallback(error);
        })

        console.log('data');
        //数据块
        let chunks = []
        res.on('data', (chunk) => {
            chunks.push(chunk)
        })

        console.log('end');
        //数据处理完成
        res.on('end', () => {
            //拼接数据块
            let body = Buffer.concat(chunks)
            let response = body.toString()
            console.log('response end data => ' + response)
            res.setEncoding('utf8')
            okCallback(response, res.statusCode)
        })
    })

    //POST方式时写入请求数据
    if (data != null) {
        client.write(qs.stringify(data));
    }

    client.end();
}

module.exports = Api;