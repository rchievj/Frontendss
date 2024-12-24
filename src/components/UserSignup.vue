<template>
  <div class="flex items-center justify-center bg-gray-900">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up for TaskManager</h2>

      <form @submit.prevent="signup" class="space-y-4">
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
        <div>
          <input
            v-model="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Confirm Password"
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
            Sign Up
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-gray-600">
        Already a user?
        <button
          @click="goToLogin"
          class="text-blue-500 hover:underline focus:outline-none"
        >
          Login
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    
    const error = computed(() => store.getters.error);

    const signup = async () => {
      if (password.value !== confirmPassword.value) {
        store.commit('setError', 'Passwords do not match');
        return;
      }
      
      try {
        await store.dispatch('signup', {
          username: username.value,
          password: password.value
        });
        
        store.commit('setSuccessMessage', 'Successfully registered, now login!');
        
        router.push('/login');  
      } catch (err) {
        console.error('Signup error:', err);
      }
    };

    const goToLogin = () => router.push('/login');

    return {
      username,
      password,
      confirmPassword,
      signup,
      goToLogin,
      error
    };
  },
};
</script>
