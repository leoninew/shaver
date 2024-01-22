import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/Index.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound.vue'),
  },

  {
    path: '/transform',
    component: () => import('layouts/Transform.vue'),
    children: [
      {
        path: 'csharp',
        component: () => import('pages/transform/CSharp.vue'),
      },
      {
        path: 'java',
        component: () => import('pages/transform/Java.vue'),
      },
      {
        path: 'mysql',
        component: () => import('pages/transform/MySQL.vue'),
      },
      {
        path: 'typescript',
        component: () => import('pages/transform/TypeScript.vue'),
      },
      {
        path: 'xml',
        component: () => import('pages/transform/XML.vue'),
      },
      {
        path: 'yaml',
        component: () => import('pages/transform/YAML.vue'),
      },

    ]
  },
]

export default routes
