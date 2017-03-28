const path = require('path');
const config = require('../config');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const sprites = require('postcss-sprites');

const postcssConfig = {
    autoprefixer: { // 自动前缀的配置
        pc: [
            'last 3 versions',
            'Explorer >= 8',
            'Chrome >= 21',
            'Firefox >= 1',
            'Edge 13'
        ],
        app: [
            'Android >= 4',
            'iOS >= 6'
        ]
    },
    postcssPxtorem: {
		root_value: '100', // 基准值 html{ font-zise: 20px; }
		prop_white_list: [], // 对所有 px 值生效
		minPixelValue: 2 // 忽略 1px 值
	},
    postcssSprites: {
        retina: false,
        verbose: true,
        spritePath: '../dist/images/',//雪碧图合并后存放地址
        stylesheetPath: '../dist/css',
        basePath: './',
        filterBy: function (image) {
            if (image.url.indexOf('/images/sprites/') === -1) {
                return Promise.reject();
            }
            return Promise.resolve();
        },
        groupBy: function (image) {
            return spritesGroupBy(image);
        },
        hooks: {
            onUpdateRule: function (rule, comment, image) {
                return spritesOnUpdateRule(true, rule, comment, image);
            },
            onSaveSpritesheet: function(opts, groups) {
                return spritesOnSaveSpritesheet(true, opts, groups);
            }
        }
    }
}

function spritesGroupBy(image) {
    let groups = /\/images\/sprites\/(.*?)\/.*/gi.exec(image.url);
    let groupName = groups ? groups[1] : group;
    image.retina = true;
    image.ratio = 1;
    if (groupName) {
        let ratio = /@(\d+)x$/gi.exec(groupName);
        if (ratio) {
            ratio = ratio[1];
            while (ratio > 10) {
                ratio = ratio / 10;
            }
            image.ratio = ratio;
        }
    }
    return Promise.resolve(groupName);
}

function spritesOnUpdateRule(isDev, rule, comment, image){
    var spriteUrl = image.spriteUrl;
    image.spriteUrl = '/public/' + spriteUrl;
    postcssSprites.updateRule(rule, comment, image);
}

function spritesOnSaveSpritesheet(isDev, opts, groups) {
    let file = postcssSprites.makeSpritesheetPath(opts, groups);
    return file;
}

module.exports = {
    assetsPath: function(_dir,_path) {
        return path.join(_dir,config.appName,_path)
    },
    postcssOption: function(){
        return [
            autoprefixer({ 
                browsers: postcssConfig.autoprefixer[config.platform] 
            }),
            pxtorem(postcssConfig.postcssPxtorem),
            sprites(postcssConfig.postcssSprites)
        ];
    }
}