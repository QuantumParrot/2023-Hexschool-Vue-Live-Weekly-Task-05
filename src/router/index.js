import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({

  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'product',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/carts',
      name: 'cart',
      component: () => import('../views/CartsView.vue')
    }
  ]

})

export default router
