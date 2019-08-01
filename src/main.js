import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import VueMomentLib from 'vue-moment-lib'
import VueTheMask from 'vue-the-mask'
import VueMq from 'vue-mq'

import es from '@/lang/validation-messages-es'
import VeeValidate from 'vee-validate'
import '@/validators'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/assets/fontawesome/css/all.min.css";

import titleMixin from '@/mixins/title'
import responsiveQueryMixin from '@/mixins/responsiveQuery'
import loadingMixin from '@/mixins/loading'

import router from '@/router'
import store from '@/store'

import App from './App.vue'
import { baseUrl } from '@/utils/constants'
import '@/assets/base.css'


axios.interceptors.request.use(function(config){
  store.dispatch('loading/showProgress')
  return config
}, function(error) {
  store.dispatch('loading/hideProgress', 1000)
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
  store.dispatch('loading/hideProgress', 1000)
  return response
}, function(error) {
  store.dispatch('loading/hideProgress', 1000)
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = baseUrl

Vue.use(BootstrapVue)
Vue.use(VueTheMask)

Vue.use(VueMq, { 
  breakpoints: {
    xs: 576,
    sm: 720,
    md: 960,
    lg: 1140,
    xl: Infinity
  },
  defaultBreakpoint: 'lg',
})

Vue.use(VeeValidate, {
  locale: 'es',
  dictionary: {
    es
  },
})

moment.locale('es')
moment.defaultFormat = `YYYY-MM-DDTHH:mm:ss.SSSZ`
Vue.use(VueMomentLib)

Vue.mixin(titleMixin)
Vue.mixin(responsiveQueryMixin)
Vue.mixin(loadingMixin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')