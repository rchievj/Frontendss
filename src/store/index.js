import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    error: null,
    successMessage: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      state.error = null;
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    setError(state, error) {
      state.error = error;
    },
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, payload); // Use environment variable
        commit('setToken', response.data.token);
      } catch (error) {
        console.error("Login failed:", error);
        commit('setError', error.response.data.message || 'Login failed');
        throw new Error('Login failed');
      }
    },
    async signup({ commit, dispatch }, payload) {
      try {
        await axios.post(`${process.env.VUE_APP_API_URL}/auth/signup`, payload); // Use environment variable
        commit('setSuccessMessage', 'Successfully registered! Now Please log in.');
        
        setTimeout(() => {
          commit('clearSuccessMessage');
        }, 3000);
        
        dispatch('goToLogin');
      } catch (error) {
        console.error("Signup failed:", error);
        commit('setError', error.response.data.message || 'Signup failed');
        throw new Error('Signup failed');
      }
    },
    logout({ commit }) {
      commit('clearToken');
    },
    goToLogin({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    error: (state) => state.error,
    successMessage: (state) => state.successMessage,
  },
});
