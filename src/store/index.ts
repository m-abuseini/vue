import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPriority: 0,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getCurrentPriority : state => state.currentPriority
  }
})
