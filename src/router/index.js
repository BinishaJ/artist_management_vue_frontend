import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import UsersView from "../views/UsersView.vue";
import ArtistsView from "../views/ArtistsView.vue";
import AddUserView from "../views/AddUserView.vue";
import AddArtistView from "../views/AddArtistView.vue";
import AddSongView from "../views/AddSongView.vue";
import EditUserView from "../views/EditUserView.vue";
import EditArtistView from "../views/EditArtistView.vue";
import EditSongView from "../views/EditSongView.vue";
import SongsView from "../views/SongsView.vue";
import LogoutView from "../views/LogoutView.vue";

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
      meta: { requiresNavbar: true },
    },
    {
      path: "/users",
      meta: { requiresNavbar: true },
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
      meta: { requiresNavbar: true },
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
      meta: { requiresNavbar: false },
    },
  ],
});

export default router;
