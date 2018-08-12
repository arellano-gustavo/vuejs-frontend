import Vue from 'vue'
import Router from 'vue-router'
import CartPage from '@/pages/CartPage'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import GoosePage from '@/pages/GoosePage'
import AxPage from '@/pages/AxPage'
import GraphPage from '@/pages/GraphPage'
import MorePage from '@/pages/MorePage'
import PbaPostPage from '@/pages/PbaPostPage'
import ExamplePage from '@/pages/test/TP'
import LabPage from '@/pages/test/LabPage'
import Planets from '@/pages/test/Planets'


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
      path: '/trade',
      name: 'more',
      component: MorePage
    },
    {
      path: '/pba',
      name: 'pba',
      component: PbaPostPage
    },
    {
      path: '/prueba',
      name: 'prueba',
      component: ExamplePage
    },
    {
      path: '/lab',
      name: 'lab',
      component: LabPage
    },
    {
      path: '/planets',
      name: 'planets',
      component: Planets
    }
  ]
})
