import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/home.vue'

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: '/typescript',
                    name: 'typescript',
                    component: () => import('@/views/transform/typescript.vue'),
                },
                {
                    path: '/csharp',
                    name: 'csharp',
                    component: () => import('@/views/transform/csharp.vue'),
                },
                {
                    path: '/java',
                    name: 'java',
                    component: () => import('@/views/transform/java.vue'),
                },
                {
                    path: '/yaml',
                    name: 'yaml',
                    component: () => import('@/views/transform/yaml.vue'),
                },
                {
                    path: '/xml',
                    name: 'xml',
                    component: () => import('@/views/transform/xml.vue'),
                },
                {
                    path: '/mysql',
                    name: 'mysql',
                    component: () => import('@/views/transform/mysql.vue'),
                },
                {
                    path: '/python',
                    name: 'python',
                    component: () => import('@/views/transform/python.vue'),
                },

            ]
        }
    ]
})

export default router
