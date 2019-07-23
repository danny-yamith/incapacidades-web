import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LoginPage from '@/views/LoginPage'
import QsAppShell from '@/components/layouts/QsAppShell'
import EmptyRouteView from '@/components/atoms/EmptyRouteView'

// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:tenantId',
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
            children: [
              {
                path: '',
                name: 'incapacidades',
                component: () => import('@/components/modules/IncapacidadesForm')
              },
              {
                path: 'admin',
                name: 'incapacidades-admin',
                component: () => import('@/components/modules/IncapacidadesAdminForm')
              },
            ],
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

router.afterEach((to, from) => {
  store.dispatch('loading/showProgress')
  store.dispatch('loading/hideProgress', 2000)
})

export default router