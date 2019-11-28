const router = require('koa-router')();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geshui2019',{useNewUrlParser:true},function(err){
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!')
　　}
})
var db = mongoose.connection;
db.on('error', function callback(err) { //监听是否有异常
    console.log("链接错误");
    console.log(err);
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('链接正确!');
});
mongoose.Promise = global.Promise;
// 创建用户表数据的模型
var geshuiSchema =new mongoose.Schema({
    salary:String,
    kouchu:String,
    shebao:String,
    // ip:String,
    date: { type: Date, default: Date.now },
})
var Geshuilists = mongoose.model('geshuilists',geshuiSchema);
// // 查询出来表中第一个数据
// Users.findOne((err,data) => {
//     console.log(data)
// });
// var xiaoming = new Users({
//     name:'小明23',
//     password:6664466
// })
// xiaoming.save(function(err, res) {
//     if (err) return err;
//     console.log(res);
// });
// Geshuilists.create({ salary: 'test', kouchu: '0',shebao:'0',ip:'192'}, function(errList, docsList) {console.log(docsList)})

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
}
router.get('/getInfo', async (ctx) =>{
    try {
        Geshuilists.create({ salary: ctx.query.salary, kouchu: ctx.query.deductV1,shebao:ctx.query.deductV2,ip:getClientIp(ctx.req)}, function(errList, docsList) {
            console.log(errList);console.log(docsList)
        })
        ctx.body = {
            code:200,
        }
    } catch (err) {
        ctx.body = {
            code:201,
        }
    }
})
module.exports = router