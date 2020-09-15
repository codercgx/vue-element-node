import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import http from './request'

Vue.prototype.$http=http
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
