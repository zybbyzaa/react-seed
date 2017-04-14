const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const config = require('../config');
const webpackConfig = require('./webpack.dev.config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const proxyTable = config.dev.proxyTable;
const uri = 'http://localhost:' + port;

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
});
const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

if (proxyTable.context) {
  app.use(proxyMiddleware(proxyTable.context, proxyTable.options));
}

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(config.dev.assetsPublicPath, express.static('./dist'));

app.get('/*', function (req, res) {
  console.log('GET ', uri, req.originalUrl);
  const htmlStr = compiler.outputFileSystem.readFileSync(compiler.outputPath + '/index.html') + "";
  res.send(htmlStr);
})

let _resolve;
const readyPromise = new Promise(resolve => {
  _resolve = resolve;
})

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n');
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri, { app: 'chrome' });
  }
  _resolve();
})

const server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
}
