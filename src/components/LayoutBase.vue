<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">TaskManager</div>

      <div class="navbar-links">
        <button v-if="isLoginOrSignupPage" @click="goToHome">Home</button>

        <div v-else>
          <button v-if="!isLoggedIn" @click="goToLogin">Login</button>
          <button v-if="!isLoggedIn" @click="goToSignup">Sign Up</button>

          <button v-if="isLoggedIn" @click="logout">Log out</button>
        </div>
      </div>
    </nav>

    <div class="content bg-gray-900">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import {  computed, watch } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore(); 

    const isLoggedIn = computed(() => store.getters.isLoggedIn); 

    const goToLogin = () => router.push('/login');
    const goToSignup = () => router.push('/signup');
    const goToHome = () => router.push('/');

    const logout = () => {
      store.dispatch('logout'); 
      goToHome(); 
    };

    const isLoginOrSignupPage = computed(() => {
      return route.path === '/login' || route.path === '/signup';
    });

    
    watch(route, () => {
      console.log("Route changed");
    });

    return { goToLogin, goToSignup, goToHome, logout, isLoggedIn, isLoginOrSignupPage };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f2937; 
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}

.navbar-links button {
  background-color: #3182ce;
  color: white;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.navbar-links button:hover {
  background-color: #2b6cb0;
}

.content {
  min-height: 100vh;
  padding: 2rem;
  padding-top: 5rem; 
}

button {
  font-size: 1rem;
}
</style>
