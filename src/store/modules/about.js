import HttpService from '@/services/httpService';

const {getAllTeachers, getTeacher} = new HttpService();

const state = {
  loading: false,
  teachers: [],
  teacher: {},
  news: [],
};

const mutations = {
  showLoading(state) {
    state.loading = true;
  },
  hideLoading(state) {
    state.loading = false;
  },
  updateTeachers(state, data) {
    state.teachers = [...data];
  },
  updateTeacher(state, data) {
    state.teacher = {...data};
  }
};

const getters = {
  
};

const actions = {
  async getTeachers({ commit }) {
    commit('showLoading');
    const data = await getAllTeachers();
    commit('updateNews', data);
    commit('hideLoading');
    return;
  },
  async getTeacher({ commit }, id) {
    commit('showLoading');
    const data = await getTeacher(id);
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
