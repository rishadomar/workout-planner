import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";

Vue.config.productionTip = false

import firebaseConfig from '@/firebaseConfig';



//
// Filters
//
Vue.filter('formatDateTime', function (timestamp) {
    if (!timestamp) {
        return ''
    }
    var date = timestamp.toDate()
    return date.toDateString() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
})

new Vue({
    router,
    store,
    vuetify,
    created() {
        console.log('init firebase app')
        firebase.initializeApp(firebaseConfig)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('state changed and i have a user ' + user.email)
                // this.$router.push('/success')
            } else {
                // this.$router.push('/auth')
            }
        });
    },
    render: h => h(App)
}).$mount('#app')
