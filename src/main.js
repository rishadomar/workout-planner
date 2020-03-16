import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";

Vue.config.productionTip = false

import firebaseConfig from '@/firebaseConfig';

console.log('firebase config = ', firebaseConfig);

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
