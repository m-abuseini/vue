import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import AutoResponsive from 'autoresponsive-vue';

Vue.config.productionTip = false;
Vue.use(AutoResponsive);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
