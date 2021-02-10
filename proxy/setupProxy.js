/* eslint-disable */
const http = require('http');
const path = require('path');
const zlib = require('zlib');
const express = require('express');
const webpack = require('webpack');
const { createProxyMiddleware } = require('http-proxy-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');

const onProxyRes = (proxyRes, req, res) => {
  const endOriginal = res.end;
  let buffer;
  proxyRes.on('data', data => {
    if (buffer) {
      buffer = Buffer.concat([buffer, data]);
    } else {
      buffer = data;
    }
  });
  res.write = () => {};
  res.end = () => {
    try {
      let body;

      if (
        proxyRes.headers['content-encoding'] &&
        proxyRes.headers['content-encoding'] === 'gzip'
      ) {
        body = zlib.gunzipSync(buffer);

        res.set('content-encoding', '');
      } else {
        body = buffer;
      }

      if (!body) {
        body = '';
      }

      res.set('content-length', Buffer.byteLength(body));

      endOriginal.apply(res, [body]);
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = function() {
  const options = {
    onProxyRes,
    ws: true, // proxy websockets
    changeOrigin: false, // needed for virtual hosted sites
    target: webpackConfig.devServer.proxy, // target host
    headers: { host: webpackConfig.devServer.host }
  };

  const proxy = createProxyMiddleware(options);

  const app = express();

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler));

  app.use('*', proxy);

  // на 3000 порту hot виснет
  const proxyServer = http.createServer(app);
  proxyServer.listen(webpackConfig.devServer.localPort);
};
