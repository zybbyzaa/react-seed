const path = require('path');

module.exports = {
    appName: 'reactSeed',
    platform: 'app',
    entry: path.join(__dirname, './src/app.js'),
    dev: {
        env: {
            NODE_ENV: JSON.stringify('development')
        },
        port: 8090,
        autoOpenBrowser: true,
        assetsPublicPath: '/',
        /**
         * http代理配置
         * @link https://www.npmjs.com/package/http-proxy-middleware
         * @example
         * proxyTable: {
         *  context: ['/api'],
         *  options: {
         *    target: "hostname",
         *    changeOrigin: true,
         *    pathRewrite: {
         *      "^/api": "/api/aa"
         *    }
         *  }
         * }
         */
        proxyTable: {
        },
        template: path.join(__dirname, './tpl/dev.template.html')
    },
    build: {
        env: {
            NODE_ENV: JSON.stringify('production')
        },
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsPublicPath: '/',
        template: path.join(__dirname, './tpl/prod.template.html'),
        bundleAnalyzerReport: process.env.npm_config_report
    },
    // npm别名配置
    npmAlias: {
      // aliasName: aliasPath
    },
    projectDir: 'path/to/project'
}
