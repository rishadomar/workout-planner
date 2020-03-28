import Vue from 'vue'
import Vuex from 'vuex'
import spinningActivities from '@/store/modules/spinningActivities';
import spinningHistory from '@/store/modules/spinningHistory';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    spinningActivities,
    spinningHistory
  }
})

