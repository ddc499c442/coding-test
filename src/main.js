import Vue from 'vue'
import App from './App.vue'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
    el: '#tags-app',
    store,
    render: h => h(App)
  })