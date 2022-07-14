/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-30 04:21:59
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 15:37:13
 */
module.exports = {
    devServer: {
        /* 自动打开浏览器 */
        open: false,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8082,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                target: 'http://apis.juhe.cn/fapig/football/', //后端地址
                ws: true,//是否代理websockets
                changeOrigin: true,// 是否允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
/*             '/rank': {
                target: 'http://apis.juhe.cn/fapig/football/rank', //后端地址
                ws: true,//是否代理websockets
                changeOrigin: true,// 是否允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            } */
        }
    },
}
