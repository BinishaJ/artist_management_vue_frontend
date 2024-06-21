import { createRouter, createWebHistory } from "vue-router";
import {
  LoginView,
  RegisterView,
  DashboardView,
  UsersView,
  ArtistsView,
  AddUserView,
  AddArtistView,
  AddSongView,
  EditUserView,
  EditArtistView,
  EditSongView,
  SongsView,
  LogoutView,
} from "../views";
import { useUserStore } from "../stores/user";

const routes = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresNavbar: false, requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresNavbar: false, requiresAuth: false },
  },
  {
    path: "/home",
    name: "home",
    component: DashboardView,
    meta: {
      requiresNavbar: true,
      requiresAuth: true,
      requiredRoles: [1, 2, 3],
    },
  },
  {
    path: "/users",
    meta: {
      requiresNavbar: true,
      requiresAuth: true,
      requiredRoles: [1],
    },
    children: [
      {
        path: "",
        component: UsersView,
      },
      {
        path: "add",
        component: AddUserView,
      },
      {
        path: ":id/edit",
        component: EditUserView,
      },
    ],
  },
  {
    path: "/artists",
    meta: { requiresNavbar: true, requiresAuth: true },
    children: [
      {
        path: "",
        component: ArtistsView,
        meta: { requiredRoles: [1, 2] },
      },
      {
        path: "add",
        component: AddArtistView,
        meta: { requiredRoles: [2] },
      },
      {
        path: ":id/edit",
        component: EditArtistView,
        meta: { requiredRoles: [2] },
      },
      {
        path: ":id/songs",
        children: [
          {
            path: "",
            component: SongsView,
            meta: { requiredRoles: [1, 2] },
          },
        ],
      },
    ],
  },
  {
    path: "/songs",
    meta: {
      requiresNavbar: true,
      requiresAuth: true,
      requiredRoles: [3],
    },
    children: [
      {
        path: "",
        component: SongsView,
        meta: { requiredRoles: [3] },
      },
      {
        path: "add",
        component: AddSongView,
        meta: { requiredRoles: [3] },
      },

      {
        path: ":id/edit",
        component: EditSongView,
        meta: { requiredRoles: [3] },
      },
    ],
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: { requiresNavbar: false, requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.initUser();

  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: "login" });
  } else if (userStore.user && to.name === "login") {
    next({ name: "home" });
  } else if (
    to.meta.requiredRoles &&
    !to.meta.requiredRoles.includes(userStore.user?.role_id)
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
