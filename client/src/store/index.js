// src/store/index.js
import { createStore } from 'vuex';
import auth from './modules/auth';

export default createStore({
  state: {
    loggedIn: false,
    userInfo: {
      avatar: '/assets/avatar.png',
      nickname: 'wwl',
    }
  },
  mutations: {
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      commit('setLoggedIn', true);
      commit('setUserInfo', userInfo);
    },
    logout({ commit }) {
      commit('setLoggedIn', false);
      commit('setUserInfo', {
        avatar: '/assets/avatar.png',
        nickname: 'wwl',
      });
    }
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    getUserInfo: state => state.userInfo
  },
  modules: {
    auth
  }
});
