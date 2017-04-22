import Vue from 'vue'
import Router from 'vue-router'
import Grid from '@/components/Grid'
import Vuetables from '@/components/VuetablesGrid'
import Vuetable2 from '@/components/VueTable2Grid'
import Vuetiful from '@/components/VuetifulGrid'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Grid',
      component: Grid
    },
    {
      path: '/vuetables',
      name: 'Vuetables',
      component: Vuetables
    },
    {
      path: '/vuetable2',
      name: 'VueTable2',
      component: Vuetable2
    },
    {
      path: '/vuetiful',
      name: 'Vuetiful',
      component: Vuetiful
    }
  ]
})
