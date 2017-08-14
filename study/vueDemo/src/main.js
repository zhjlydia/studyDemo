// import 'babel-polyfill'
// import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import routes from './routes'
var Vue = require("Vue");

Vue.use(VueRouter);
const router = new VueRouter({
  routes
})
var app = new Vue({
  router: router,
  store: store
}).$mount("#view");