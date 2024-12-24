<template>
  <form @submit.prevent="addTask" class="space-y-4">
    <input
      v-model="taskName"
      placeholder="Task Name"
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full"
    >
      Add Task
    </button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    async addTask() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/tasks`,
          { name: this.taskName },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        this.$emit('task-added', response.data); 
        this.taskName = '';
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
  },
};
</script>
