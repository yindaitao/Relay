const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(cookieParser);

//服务器端 - 跨域设置
app.all('*', (req, res, next) => {
    let origin = req.headers.origin;
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/x-www-form-urlencoded");

    next();
});

//默认首页
app.use('/', require('./router/index'));

//获取weibo内容
app.use('/weibo/content', require('./router/weiboContent'));

//获取weibo的博主
app.use('/weibo/owner', require('./router/weiboOwner'));

//转发
app.use('/relay', require('./router/relay'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server running @${port}`)
});