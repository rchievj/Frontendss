<template>
    <div class=" bg-gray-900 p-6 flex flex-col">
      <div v-if="showTaskForm" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4">Add New Task</h2>
          <TaskForm @task-added="handleTaskAdded" />
        </div>
      </div>
  
      <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center h-full">
        <p class="text-gray-600 text-lg mb-4">Add your first task!</p>
        <button @click="openTaskForm" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          Add Task
        </button>
      </div>
  
      <div v-if="tasks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="task in tasks" :key="task.id" class="bg-white p-4 rounded-lg shadow-md">
          <p class="text-gray-800 font-semibold">{{ task.name }}</p>
        </div>
      </div>
  
      <button
        v-if="tasks.length > 0"
        @click="openTaskForm"
        class="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-2 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <span class="material-icons">+</span>
      </button>
  
      <div
        v-if="tasks.length > 0"
        class="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <span @click="openTaskForm" class="cursor-pointer">Add Task <span class="material-icons">+</span></span>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import TaskForm from './TaskForm.vue';
  
  export default {
    components: { TaskForm },
    data() {
      return {
        tasks: [],
        showTaskForm: false,
      };
    },
    methods: {
      async fetchTasks() {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        this.tasks = response.data;
      },
      openTaskForm() {
        this.showTaskForm = true;
      },
      closeTaskForm() {
        this.showTaskForm = false;
      },
      async handleTaskAdded(newTask) {
        this.tasks.push(newTask);
        this.closeTaskForm();
      },
    },
    created() {
      this.fetchTasks(); 
    },
  };
  </script>
  
  <style scoped>
  .material-icons {
    font-size: 24px;
  }
  </style>
  