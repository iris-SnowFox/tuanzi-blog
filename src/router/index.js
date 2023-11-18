import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/AboutView.vue')
    // }
  ]
})

/*
  路由守卫
    to 即将进入目标路由对象 (路径、参数、查询参数等)
    from 当前导航正要离开的路由对象 (当前路由信息)
    next 函数 (控制导航行为，接一参数用以指定导航目标路由)
 */
router.beforeEach((to, from, next) => {
  // if (userLogin) {
  //   next();
  // } else {
  //   next('/login');
  // }
})

export default router
