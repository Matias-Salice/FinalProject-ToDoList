import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import Dashboard from "@/views/Dashboard.vue";
import { useUserStore } from "@/stores/users";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Log",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !userStore.user) {
    next("/");
  } else {
    next();
  }
});

export default router;
