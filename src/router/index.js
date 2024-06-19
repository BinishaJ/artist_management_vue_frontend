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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      meta: { requiresNavbar: false },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { requiresNavbar: false },
    },
    {
      path: "/home",
      name: "home",
      component: DashboardView,
      meta: { requiresNavbar: true, requiresAuth: true },
    },
    {
      path: "/users",
      meta: { requiresNavbar: true, requiresAuth: true },
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
        },
        {
          path: "add",
          component: AddArtistView,
        },
        {
          path: ":id/edit",
          component: EditArtistView,
        },
        {
          path: ":id/songs",
          children: [
            {
              path: "",
              component: SongsView,
            },
            {
              path: "add",
              component: AddSongView,
            },
            {
              path: ":song_id/edit",
              component: EditSongView,
            },
          ],
        },
      ],
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
      meta: { requiresNavbar: false, requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  userStore.initUser();
  console.log(userStore.user);
  if (to.meta.requiresAuth && !userStore.user) {
    next({ name: "login" });
  } else if (userStore.user && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
