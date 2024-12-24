<template>
  <div>
    <div v-if="isLoggedIn">
      <TaskList />
    </div>
    <div v-else class="text-center p-8">
      <h1 class="text-4xl font-bold mb-4 !text-gray-100">Welcome to Task Manager</h1>
      <p class="text-lg !text-gray-300">
        Manage your tasks efficiently. Sign up or log in to start organizing your work.
      </p>
    </div>
  </div>
</template>

<script>
import TaskList from './TaskList.vue'; 
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { TaskList },
  setup() {
    const store = useStore();

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    store.watch(
      (state) => state.token,
      (newToken) => {
        console.log("Token changed:", newToken);
      }
    );

    return { isLoggedIn };
  },
};
</script>

<style scoped>
h1 {
  color: #2d3748;
}
p {
  color: #4a5568;
}
</style>
