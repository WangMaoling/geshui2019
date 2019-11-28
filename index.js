const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
var cors = require('koa2-cors');//解决跨域插件
const app = new Koa()
app.use(bodyParser({
  formLimit: '1mb'
}))
// app.use(cors({
//   origin: function(ctx) {
//     var str = ctx.header.host
//     if (str.indexOf("localhost") == -1 ) {
//       return false;
//     }
//     return '*';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));
//  路由
app.use(require('./routers/getInfo.js').routes())
app.listen(2019)
console.log(`listening on port 2019`)
