import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LoginPage from '@/views/LoginPage'
import QsAppShell from '@/components/layouts/QsAppShell'
import EmptyRouteView from '@/components/atoms/EmptyRouteView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:poolName',
    component: EmptyRouteView,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/LoginPage'),
      },
      {
        path: '',
        component: () => import('@/components/layouts/QsAppShell'),
        children: [
          {
            path: 'incapacidades',
            name: 'incapacidades',
            component: () => import('@/views/IncapacidadesPage'),
          },
          {
            path: 'accidentes',
            name: 'accidentes',
            component: () => import('@/views/AccidentesPage')
          },
        ],
      },
    ],
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test'),
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

router.beforeEach((to, from, next) => {
  store.dispatch('loading/showProgress')
  store.dispatch('loading/hideProgress', 2000)
  
  if(to.name != 'login' && store.state.login.session == null){
    next({ 
      replace: true,
      name: 'login',
      params: to.params,
      query: to.query,
    })
  } else {
    next()
  }
})

export default router