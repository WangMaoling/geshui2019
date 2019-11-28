// 这个文件内容同吃饭地图文件
const config = {
  // 启动端口
  port: 8082,
  // 数据库配置
  database: {
    DATABASE: 'Koa2_blog',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  },
  qiniu:{
    bucket:'',//七牛存储空间名称
    AccessKey:'',
    SecretKey:'',
  }
}
module.exports = config;