var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('../config');
var utils = require('./utils');
var baseWebpackConfig = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    entry: {
        vendor: ['react', 'react-dom','react-router-dom'],
        [config.appName]: [
            './build/dev-client',
            config.entry
        ]
    },
    output: {
        publicPath: config.dev.assetsPublicPath,
        chunkFilename: utils.assetsPath('js','[name].js'),
        filename: utils.assetsPath('js','[name].js')
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
                            publicPath: '../',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
            '_ENV_': JSON.stringify('DEV')
        }),
        new HtmlWebpackPlugin({
        	filename: 'index.html',
        	inject: false,
            chunks: ['manifest','vendor',config.appName],
            template: config.dev.template
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})
