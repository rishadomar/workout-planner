import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";
import vueInsomnia from "vue-insomnia"

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

Vue.filter('formatActivityTime', function (seconds) {
    if (seconds == 0) {
        return 'No steps'
    }
    var minutes = parseInt(seconds / 60)
    var remainingSeconds = seconds % 60
    var time = ''
    if (minutes > 0) {
        time = minutes + 'm'
    }
    if (remainingSeconds > 0) {
        if (minutes > 0) {
            time += ' '
        }
        time += remainingSeconds + 's'
    }
    return time
})

Vue.use(vueInsomnia)

new Vue({
    router,
    store,
    vuetify,
    created() {
        firebase.initializeApp(firebaseConfig)
        var user = localStorage.getItem('user')
        if (user) {
            store.dispatch('auth/setUser', {user: JSON.parse(user)})
        }
    },
    render: h => h(App)
}).$mount('#app')
