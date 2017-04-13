var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = merge(baseWebpackConfig, {
    devtool: '#cheap-module-source-map',
    entry: {
        [config.appName]: [
          'es6-promise/auto',
          config.entry
        ],
        vendor: ['react', 'react-dom','react-router-dom']
    },
    output: {
        publicPath: config.build.assetsPublicPath,
        chunkFilename: utils.assetsPath('js','[name].[chunkhash:8].js'),
        filename: utils.assetsPath('js','[name].[chunkhash:8].js')
    },
    module: {
        rules: [
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url',
                        options: {
                            name: utils.assetsPath('images','[name].[hash].[ext]'),
                            publicPath: config.build.assetsPublicPath,
                            limit: 8192
                        }
                    },
                    {
                        loader: 'image-webpack',
                        query: {
                            progressive: true,
                            optipng: {
                              optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                              interlaced: false
                            },
                            mozjpeg: {
                                quality: 65
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env,
            '_ENV_': JSON.stringify('PROD')
        }),
        new HtmlWebpackPlugin({
        	filename: 'WEB-INF/'+ config.appName +'.shtml',
        	inject: false,
            chunks: ['manifest','vendor',config.appName],
            template: config.build.template
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,  // remove all comments
            compress: {
                warnings: false,
                // drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        })
    ]
})

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
