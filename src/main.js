import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDFpBE0EnOLbwVtRis9TCmIyMW1DPgPlio",
  authDomain: "spinning-a506b.firebaseapp.com",
  databaseURL: "https://spinning-a506b.firebaseio.com",
  projectId: "spinning-a506b",
  storageBucket: "spinning-a506b.appspot.com",
  messagingSenderId: "918112245605",
  appId: "1:918112245605:web:4bb3deddf95486f60fb38c",
  measurementId: "G-WSVDXFB3ZL"
};

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
