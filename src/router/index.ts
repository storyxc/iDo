import { createRouter, createWebHashHistory } from 'vue-router'
import PreferenceView from "@/views/PreferenceView.vue";
import TodoBodyView from "@/views/TodoBodyView.vue";


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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
        }
    ]
})

export default router
