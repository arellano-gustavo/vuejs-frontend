import Vue from 'vue'
import Router from 'vue-router'
import CartPage from '@/pages/CartPage'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import GoosePage from '@/pages/GoosePage'
import AxPage from '@/pages/AxPage'
import GraphPage from '@/pages/GraphPage'
import MorePage from '@/pages/MorePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductPage
    },
    {
      path: '/goose',
      name: 'goose',
      component: GoosePage
    },
    {
      path: '/axios',
      name: 'axios',
      component: AxPage
    },
    {
      path: '/graph',
      name: 'graph',
      component: GraphPage
    },
    {
      path: '/more',
      name: 'more',
      component: MorePage
    }
  ]
})
