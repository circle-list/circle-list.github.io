import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import Package from '../package.json'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.prototype.$version = `Pre-Alpha v${Package.version}`

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
