import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('@/views/About.vue')
        // },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/About.vue')
        },
        {
            path: '/transform',
            name: 'transform',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/transform.vue'),
            children: [
                {
                    path: '/transform/typescript',
                    name: 'transform-typescript',
                    component: () => import('@/views/transform/typescript.vue'),
                },
                {
                    path: '/transform/csharp',
                    name: 'transform-csharp',
                    component: () => import('@/views/transform/csharp.vue'),
                },
                {
                    path: '/transform/java',
                    name: 'transform-java',
                    component: () => import('@/views/transform/java.vue'),
                },
                {
                    path: '/transform/yaml',
                    name: 'transform-yaml',
                    component: () => import('@/views/transform/yaml.vue'),
                },
                {
                    path: '/transform/xml',
                    name: 'transform-xml',
                    component: () => import('@/views/transform/xml.vue'),
                },
                {
                    path: '/transform/mysql',
                    name: 'transform-mysql',
                    component: () => import('@/views/transform/mysql.vue'),
                },
                {
                    path: '/transform/python',
                    name: 'transform-python',
                    component: () => import('@/views/transform/python.vue'),
                },

            ]
        }
    ]
})

export default router
