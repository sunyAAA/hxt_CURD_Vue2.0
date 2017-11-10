import Vue from 'vue'
import Router from 'vue-router'
import Detail from './../components/detail.vue'
import Total from './../components/total.vue'
import Account from './../components/account.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/detail'
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/total',
      name: 'total',
      component: Total
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    }
  ]
})