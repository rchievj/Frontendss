<template>
  <div class="flex items-center justify-center bg-gray-900">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Login to TaskManager</h2>

      <div v-if="successMessage" class="fixed top-0 left-0 w-full bg-green-600 text-white p-4 text-center">
        {{ successMessage }}
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            v-model="username"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div v-if="error" class="text-red-500 text-center">
          <p>{{ error }}</p>
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-gray-600">
        New user?
        <button
          @click="goToSignup"
          class="text-blue-500 hover:underline focus:outline-none"
        >
          Sign Up
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const error = computed(() => store.getters.error);
    const successMessage = computed(() => store.getters.successMessage);

    onMounted(() => {
      if (successMessage.value) {
        setTimeout(() => {
          store.commit('clearSuccessMessage');
        }, 3000); 
      }
    });

    const login = async () => {
      try {
        await store.dispatch('login', { username: username.value, password: password.value });
        router.push('/'); 
      } catch (err) {
        console.log(err);
      }
    };

    const goToSignup = () => router.push('/signup');

    return { username, password, login, goToSignup, error, successMessage };
  },
};
</script>

<style scoped>
.fixed {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
