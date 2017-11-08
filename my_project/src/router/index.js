import  Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Reservation from '@/components/Reserve/Reservation'
import Results from '@/components/Reserve/Results'
import SearchBus from '@/components/Reserve/SearchBus'
import AddTrips from '@/components/Reserve/AddTrips'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/searchBus',
      name: 'SearchBus',
      component: SearchBus
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/addtrips',
      name: 'AddTrips',
      component: AddTrips
    },

  ],
  mode: 'history'
})
