import Vue from 'vue';
import Vuex from 'vuex';
import news from './modules/news';
import about from './modules/about';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    news,
    about,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
