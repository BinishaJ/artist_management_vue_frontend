import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import UsersView from "../views/UsersView.vue";
import ArtistsView from "../views/ArtistsView.vue";
import AddUserView from "../views/AddUserView.vue";
import AddArtistView from "../views/AddArtistView.vue";
import EditUserView from "../views/EditUserView.vue";
import EditArtistView from "../views/EditArtistView.vue";
import SongsView from "../views/SongsView.vue";

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
          path: "edit",
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
          path: "edit",
          component: EditArtistView,
        },
        {
          path: ":id/songs",
          component: SongsView,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
