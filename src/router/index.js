import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

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
          {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/DashboardPage')
          },
          {
            path: 'mis-accidentes',
            name: 'mis-accidentes',
            component: () => import('@/views/MyAccidentsPage')
          },
          {
            path: 'test',
            name: 'test',
            component: () => import('@/views/TestDataTableWithControls')
          }
          // {
          //   path: 'dashboard-table',
          //   name: 'dashboard-table',
          //   component: () => import('@/views/DashboardTablesPage')
          // },
        ],
      },
    ],
  },
]


var router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

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