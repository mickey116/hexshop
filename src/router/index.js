import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login'
import Dashboard from '../views/Dashboard/Dashboard'
import Products from '../views/Products/Products'
import Order from '../views/Order/Order'
import Coupon from '../views/Coupon/Coupon'


Vue.use(VueRouter)
  const routes = [
  {
    // 不讓用戶隨意輸入地址
    path:'*',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children:[
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
      {
        path: 'order',
        name: 'Order',
        component: Order,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon,
        meta: { requiresAuth: true },
      },
    ]
  },
  
]

const router = new VueRouter({
  mode:'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
