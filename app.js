const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//服务器端 - 跨域设置
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/x-www-form-urlencoded");
    next();
});

//默认首页
app.use('/', require('./router/index'));

//weibo
app.use('/weibo', require('./router/weibo'));

//转发
app.use('/relay', require('./router/relay'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running @${port}`)
});
