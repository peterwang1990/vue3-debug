"use strict";
exports.__esModule = true;
require("remixicon/fonts/remixicon.css");
var bignumber_js_1 = require("bignumber.js");
require("amfe-flexible/index.js");
var vue_1 = require("vue");
var bus_1 = require("./utils/bus");
var index_1 = require("./router/index");
var store_1 = require("./store");
var App_vue_1 = require("./App.vue");
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import 'ant-design-vue/dist/antd.css'
var app = vue_1.createApp(App_vue_1["default"]);
app.config.globalProperties.$bus = bus_1.bus;
bignumber_js_1["default"].set({ ROUNDING_MODE: bignumber_js_1["default"].ROUND_DOWN });
app.config.globalProperties.$BigNumber = bignumber_js_1["default"];
// styleImport(app).use(router).use(store, key).mount('#app')
// app.use(ElementPlus)
app.use(index_1["default"]).use(store_1.store, store_1.key).mount('#app');
