import http from 'axios';
const fakeDataUrl = 'https://jsonplaceholder.typicode.com/posts';

const state = {
  loading: false,
  news: [],
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
  }
};

const getters = {
  
};

const actions = {
  getNews({ commit }) {
    return new Promise((resolve, reject) => {
      commit('showLoading');
        http.get(fakeDataUrl)
          .then(({data}) => {
            commit('updateNews', data);
            commit('hideLoading');
            resolve();
          })
          .catch(() => {
            commit('hideLoading');
            reject();
          })
    })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
