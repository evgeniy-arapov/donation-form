import Vue from 'vue'
/* order makes sense, bootstrap must be before App it affects style priority */
import "@/plugins/bootstrap"
import App from './App'

new Vue({
  el: '#app',
  render: (h) => h(App)
})
