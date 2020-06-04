import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/index"),
        name: "首页",
        meta: { title: "首页", icon: "index", affix: true }
      }
    ]
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "个人信息",
        meta: { title: "个人信息", icon: "user", noCache: true }
      }
    ]
  }
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/manage/manage",
    component: Layout,
    redirect: "/manage/manage",
    children: [
      {
        path: "",
        component: () => import("@/views/agent/manage"),
        name: "基础信息",
        meta: { title: "基础信息", icon: "fl", noCache: true }
      }
    ]
  },
  {
    path: "/agent/card",
    component: Layout,
    redirect: "/agent/card",
    children: [
      {
        path: "",
        component: () => import("@/views/agent/card"),
        name: "返利设置",
        meta: { title: "返利设置", icon: "chart", noCache: true }
      }
    ]
  },
  {
    path: "/agent/carduser",
    component: Layout,
    redirect: "/agent/carduser",
    children: [
      {
        path: "",
        component: () => import("@/views/agent/carduser"),
        name: "客户信息",
        meta: { title: "客户信息", icon: "kf", noCache: true }
      }
    ]
  },
  {
    path: "/seting",
    component: Layout,
    redirect: "/seting/base",
    children: [
      {
        path: "base",
        component: () => import("@/views/seting/base"),
        name: "商品筛选",
        meta: { title: "商品筛选", icon: "chart", noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
