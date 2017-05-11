// import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import iView from 'iView'
import 'iview/dist/styles/iview.css'

Vue.use(iView);
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})