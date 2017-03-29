var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
    context: path.join(__dirname, '..'),
    output: {
        path: config.build.assetsRoot
    },
    resolve: {
        alias: config.npmAlias,
        modules: [path.join(__dirname, '../src'), 'node_modules'],
        extensions: ['.js']
    },
    resolveLoader: {
        moduleExtensions: ['-loader'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: [resolve('src')],
                use: [
                    {
                        loader: 'eslint',
                        options: {
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel?cacheDirectory']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style",
                    loader: "css!postcss!sass"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style",
                    loader: "css!postcss"
                })
            },
            {
                test: /\.(woff|eot|ttf)$/i,
                use: [
                    {
                        loader: 'url',
                        options: {
                            name: utils.assetsPath('fonts','[name].[ext]'),
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({ 
            name: ['vendor','manifest']
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css','[name].[chunkhash:8].css')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: utils.postcssOption()
            }
        }),
        new FriendlyErrorsPlugin()
    ]
}

