"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var vue_1 = require("vue");
// 引入公共js文件
var function_1 = require("/@/assets/js/public/function");
exports["default"] = {
    name: "Pagination",
    props: {
        // 总页数
        'dataAll': {
            type: Number,
            "default": 100,
            required: true
        },
        // 当前页数
        'dataCur': {
            type: Number,
            "default": 1,
            required: true
        },
        // 页面条数
        'datanum': {
            type: Number,
            "default": 7
        },
        // 数据总量
        'dataDatanum': {
            type: Number,
            "default": 456
        }
    },
    // VUE3语法 setup函数
    // setup官方文档:https://www.vue3js.cn/docs/zh/guide/composition-api-setup.html#参数
    setup: function (props, content) {
        /**
         * @name: 声明data
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10
         */
        var data = vue_1.reactive({
            all: props.dataAll,
            cur: Number(props.dataCur),
            num: props.datanum,
            dataNum: props.dataDatanum,
            jumpPage: 0,
            indexs: vue_1.computed(function () {
                var left = 1;
                var right = data.all;
                var ar = [];
                if (data.all >= data.num) {
                    if (data.cur > 3 && data.cur < data.all - 2) {
                        left = data.cur - (data.num - 1) / 2;
                        right = Number(data.cur) + Number((data.num - 1) / 2);
                    }
                    else {
                        if (data.cur <= 3) {
                            left = 1;
                            right = data.num;
                        }
                        else {
                            right = data.all;
                            left = data.all - (data.num - 1);
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left);
                    left++;
                }
                return ar;
            })
        });
        /**
         * @name: 页码点击事件
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-11
         */
        var btnClick = function (val) {
            if (val != data.cur) {
                data.cur = val;
                content.emit('changePage', data.cur);
            }
        };
        /**
         * @name: 点击上一页下一页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-11
         */
        var pageClick = function () {
            //父组件通过changePage方法来接受当前的页码
            //这里是点击下一页执行函数
            content.emit('changePage', data.cur);
        };
        /**
         * @name: 跳至 xxx 页
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-13
         */
        var changePage = function () {
            if (data.jumpPage > data.all || data.jumpPage < 1 || isNaN(data.jumpPage)) {
                function_1["default"].alertMsg(2000, "参数错误！");
                return;
            }
            content.emit('changePage', Number(data.jumpPage));
        };
        /**
         * @name: 将data绑定值dataRef
         * @author: camellia
         * @email: guanchao_gc@qq.com
         * @date: 2021-01-10
         */
        var dataRef = vue_1.toRefs(data);
        return __assign({ btnClick: btnClick,
            pageClick: pageClick,
            changePage: changePage }, dataRef);
    }
};
