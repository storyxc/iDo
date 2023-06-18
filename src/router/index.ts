import { createRouter, createWebHistory } from 'vue-router'
import TodoBodyView from "@/views/TodoBodyView.vue";
import PreferenceView from "@/views/PreferenceView.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: TodoBodyView,
        },
        {
            path: '/preferences',
            name: 'preferences',
            component: PreferenceView
        },
        {
            path: '/index.html',
            redirect: '/'
        }
    ]
})

export default router
