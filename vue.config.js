module.exports = {
    chainWebpack: config => {
        config.plugin('html')
            .tap(args => {
            args[0].title = "台新銀行──營業廳經理平板"
            return args;
            })
    },
    publicPath: './',
    // outputDir: 'dist',
    // assetsDir: './',
    // lintOnSave: true, 
    // devServer: {
    //     host: 'localhost',
    //     port: 8080,
    //     https: false,
    //     open: true,
    //     proxy: {
    //        '/api':{
    //            'target':'http://localhost:2211',
    //            changeOrigin:true,
    //            pathRewrite:{
    //                '^/api':'  ',
    //            }
    //        }
    //     }   
    // }
}