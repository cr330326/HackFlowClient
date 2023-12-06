import { createRouter, createWebHashHistory } from 'vue-router';

const route = createRouter({
  routes: [
    {
      path: "/",
      component: () => import('./pages/login.vue')
    },
    {
      path: "/app",
      component: () => import('./App.vue'),
      children: [
        {
          path: "project",
          name: "project",
          component: () => import('./pages/project.vue'),
        },
        {
          path: "flow",
          name: "flow",
          component: () => import('./pages/flow.vue')
        },
      ]
    }
  ],
  history: createWebHashHistory()
})
export default route