"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var Index_vue_1 = require("@/views/Index.vue");
var routes = [
    {
        path: '/',
        name: 'Index',
        component: Index_vue_1["default"]
    },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHashHistory(),
    routes: routes
});
exports["default"] = router;
