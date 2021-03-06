// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import VModal from 'vue-js-modal'
import VueNumeric from 'vue-numeric'

import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

sync(store, router)

Vue.config.productionTip = false

Vue.use(VModal)

Vue.use(VueNumeric)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
