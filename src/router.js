import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // beforeEnter(to, from, next) {
      //   if (localStorage.getItem('school23')) {
      //     next({ name: 'news' })
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('./views/News.vue'),
    },
    {
      path: '/about',
      component: () => import('./views/About.vue'),
      redirect: {name: 'school-now'},
      children: [
        {
          path: 'school-now',
          name: 'school-now',
          component: () => import('./components/about/school-now/AboutSchoolNow.vue'),
        },
        {
          path: 'colective',
          name: 'colective',
          component: () => import('./components/about/colective/AboutColective.vue'),
        },
      ],
    },
  ],
})
