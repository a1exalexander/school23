import HttpService from '@/services/httpService';

const {getAllTeachers, getTeacher} = new HttpService();

const state = {
  loading: false,
  teachers: [],
  teacher: {
    id: null,
    // ava: require("../assets/images/poroh.jpg"),
    ava: null,
    name: null,
    username: null,
    phone: null,
    email: null,
    company: null,
  },
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
    commit('updateTeachers', data);
    commit('hideLoading');
    return;
  },
  async getTeacher({ commit }, id) {
    const data = await getTeacher(id);
    commit('updateTeacher', data);
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
