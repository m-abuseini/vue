import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPriority: 0,
    priorityObject: {},
    currentPriorityCount: 0,
    priorityIndex: 0,
  },
  mutations: {
    updateCurrentPriority: (state, payload) => {
      state.currentPriority = payload;
    },
    updatePriorityObject: (state, object) => {
      state.priorityObject = object;
    },
    updateCurrentPriorityCount: (state, newCount) => {
      state.currentPriorityCount = newCount;
    },
    updatePriorityIndex: (state, newIndex) => {
      state.priorityIndex = newIndex;
    }
  },
  actions: {
    updateCurrentPriority: (state, newPriority) => {
      // const priority = state.getters.getCurrentPriority;
      state.commit('updateCurrentPriority', newPriority);
    },
    createPriorityObject: (state, elementsObj) => {
      const obj: any = {};
      // out object key is the priority
      // object key . count is the elements count for each priority
      elementsObj.forEach(element => {
        if (obj[element.priority] && obj[element.priority].count) {
          obj[element.priority].count = obj[element.priority].count + 1;
        } else {
          obj[element.priority] = {count: 1};
        }
      });
      state.commit('updatePriorityObject', obj);
      state.dispatch('startPriority');
    },
    startPriority: (state) => {
      const pObj = state.getters.getPriorityObject;
      const objKeys = Object.keys(pObj);
      const priorityIndex = state.getters.getPriorityIndex;
      state.dispatch('updateCurrentPriority', parseInt(objKeys[priorityIndex]));
    },
    componentLoaded: (state) => {
      const pObj = state.getters.getPriorityObject;
      const priority = state.getters.getCurrentPriority;
      let priorityCount = state.getters.getCurrentPriorityCount;
      priorityCount = priorityCount + 1;
      if (priorityCount === pObj[priority].count) {
        // start new priority
        state.commit('updateCurrentPriorityCount', 0);
        state.dispatch('updatePriorityIndex');
        state.dispatch('startPriority');
      } else {
        // update priority count
        state.commit('updateCurrentPriorityCount', priorityCount);
      }
    },
    updatePriorityIndex: (state) => {
      let priorityIndex = state.getters.getPriorityIndex;
      priorityIndex = priorityIndex + 1;
      state.commit('updatePriorityIndex', priorityIndex);

    }
  },
  modules: {
  },
  getters: {
    getCurrentPriority : state => state.currentPriority,
    getPriorityObject: state => state.priorityObject,
    getCurrentPriorityCount: state => state.currentPriorityCount,
    getPriorityIndex: state => state.priorityIndex,
  }
})
