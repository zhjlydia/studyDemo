// import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import iView from 'iView'
import store from './store'
import routes from './routes'
// import moment from 'moment'
import 'iview/dist/styles/iview.css'

Vue.use(iView);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
})
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})