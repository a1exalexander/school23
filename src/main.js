import Vue from 'vue';
import moment from 'moment';
import Antd, { message } from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css';
import '@/scss/_animate.scss';
import '@/scss/main.scss';

import HeaderBar from './components/common/HeaderBar';

Vue.component('HeaderBar', HeaderBar);


Vue.prototype.$moment = moment;
Vue.prototype.$message = message;

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
