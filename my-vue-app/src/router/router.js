import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/home.vue';
import Login from '../components/login.vue';
import Admin from '../components/admin.vue'
import MealOfTheDay from '../components/mealoftheday.vue'
const routes = [
    
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: true },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/mealoftheday',
        name: 'MealOfTheDay',
        component: MealOfTheDay,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;