import HttpService from '@/services/httpService';

const {getAllNews, getOneNews} = new HttpService();

const state = {
  loading: false,
  news: [],
  oneNews: {},
};

const mutations = {
  showLoading(state) {
    state.loading = true;
  },
  hideLoading(state) {
    state.loading = false;
  },
  updateNews(state, data) {
    state.news = [...data];
  },
  updateOneNews(state, data) {
    state.oneNews = {...data};
  }
};

const getters = {
  
};

const actions = {
  async getNews({ commit }) {
    commit('showLoading');
    try {
      const data = await getAllNews();
      commit('updateNews', data);
      commit('hideLoading');
      return;
    } catch(e) {
      commit('hideLoading');
      throw e;
    }
    
  },
  async getOneNews({ commit }, id) {
    commit('showLoading');
    const data = await getOneNews(id);
    commit('updateOneNews', data);
    commit('hideLoading');
    return;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
