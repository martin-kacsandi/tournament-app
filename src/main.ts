import Vue from 'vue'
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

import 'firebase/firestore'

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
