module.exports = {
  proxy: {
        '/apis': {    //将http://127.0.0.1/0816/data/印射为/apis
            target: 'http://127.0.0.1/curd/dist/static/data/',  // 接口域名
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                '^/apis': ''   //需要rewrite的,
            }              
        }
  }
}