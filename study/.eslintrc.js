module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "jquery": true,
        "node": true,
        "commonjs": true
    },
    "globals": {
        "axios": true,
        "_": true,
        "template": true,
        "Vue": true,
        "underscore": true,
        "moment": true,
        "ES6Promise": true,
        "VueRouter": true,
        "expect": true
    },
    "rules": {
        "quotes": 2,
        //禁止标识符中有悬空下划线  
        "no-underscore-dangle": 0,
        //禁止未使用过的表达式       
        "no-unused-expressions": 2,
        "curly": [2, "multi-line"],
        "strict": 2,
        "no-use-before-define": 2,
        "eqeqeq": [1, "smart"],
        "new-cap": [2, {
            "capIsNew": false
        }],
        "dot-notation": [2, {
            "allowKeywords": false
        }],
        "no-console": 1,
        "no-return-assign": 2,
        "no-shadow": 2,
        "comma-dangle": 2,
        "camelcase": [2, {
            "properties": "always"
        }]
    }
}