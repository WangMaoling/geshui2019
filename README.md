个税2019项目，只用node开了个服务链接MongoDB。前后端分离项目。
目录结构：
config ------------- 服务器：配置文件
m     -------------- 前端：移动端静态文件
routers ------------ 服务器：路由文件 以及链接数据库
source ------------- 前端：移动端、web端静态文件
index_m.html ------- 前端：移动端页面
index.html --------- 前端：web端页面
index.js ----------- 服务器：服务端入口
package-lock.json
package.json ------- 服务器：配置文件
README.md
test.html  --------- 前端：测试页面
wcode.html --------- 前端：微信分享页面

数据库名字geshui2019,表:geshuiList

存储字段：工资，专项扣除，社保，IP，查询时间

npm install
npm run dev 或者 node index.js开启服务器进行连接数据库对外暴露接口（再此之前得先开启MongoDB服务）
这里如果使用了pm2 可以 pm2 start index.js
然后在打开页面就OK了