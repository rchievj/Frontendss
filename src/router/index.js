import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/LayoutBase.vue'; 
import Login from '../components/UserLogin.vue';
import Signup from '../components/UserSignup.vue';
import TaskList from '../components/TaskList.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
  {
    path: '/',
    component: Layout, 
    children: [
      { path: '', component: HomePage }, // Home page as the default
      { path: 'login', component: Login }, // Login page
      { path: 'signup', component: Signup }, // Signup page
      { path: 'tasks', component: TaskList }, // Task list page
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
