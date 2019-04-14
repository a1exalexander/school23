import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      beforeEnter(to, from, next) {
        if (localStorage.getItem('school23')) {
          next({ name: 'news' })
        } else {
          next();
        }
      },
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/News.vue'),
    },
  ],
})
