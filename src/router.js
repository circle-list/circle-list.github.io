import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Circles from './views/circles'
import Map from './views/map'
import Settings from './views/settings'
import Memo from './views/memo'
import Backup from './views/backup'
import Status from './views/status'
import Debug from './views/debug'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/map',
      name: 'Map',
      component: Map
    }, {
      path: '/circles',
      name: 'Circles',
      component: Circles
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }, {
      path: '/status',
      name: 'Status',
      component: Status
    }, {
      path: '/memo',
      name: 'Memo',
      component: Memo
    }, {
      path: '/backup',
      name: 'Backup',
      component: Backup
    }, {
      path: '/debug-menu',
      name: 'DebugMenu',
      component: Debug
    }
  ]
})