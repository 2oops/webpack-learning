import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      component: () => import(/*webpackChunkName: "home"*/ '@/modules/home')
    },
    {
      path: '/about',
      component: () => import(/*webpackChunkName: "about"*/ '@/modules/about')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})