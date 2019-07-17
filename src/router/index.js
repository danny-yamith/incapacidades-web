import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPage from '../views/LoginPage'

// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPage,
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test') // eslint-disable-line no-console
  },
]


var router = new VueRouter({
  mode: 'history',
  routes,
})

// router.beforeEach((to, from, next) => {
//   const isGuesst = to.matched.some(rec => rec.meta != null && rec.meta.justGuest)
//   const hasToken = store.getters.token

//   if (isGuesst) {
//     if (!hasToken) {
//       next();
//     } else {
//       next({name: 'home'});
//     }
//   } else {
//     if (hasToken) {
//       next();
//     } else {
//       next({name: 'login'});
//     }
//   }
// })

export default router