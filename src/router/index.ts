import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import MenuView from "../views/MenuView.vue";
import LoginView from "../views/LoginView.vue";
import ChatView from "../views/ChatView.vue";
import FreeBoardView from "../views/FreeBoardView.vue";
import InfoBoardView from "../views/InfoBoardView.vue";
import BoardView from "../views/BoardView.vue";
import DirectMessageView from "@/views/DirectMessageView.vue";
import DmListView from "@/views/DmListView.vue";
import GameView from "@/views/GameView.vue";
import EditView from "@/views/EditView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/chat",
    name: "chat",
    component: ChatView,
  },
  {
    path: "/dm/:receiver_id",
    name: "dm",
    component: DirectMessageView,
  },
  {
    path: "/friends",
    name: "friends",
    component: DmListView,
  },
  {
    path: "/board/:id",
    name: "board",
    component: BoardView,
  },
  {
    path: "/board/edit/:id",
    name: "edit",
    component: EditView,
  },
  {
    path: "/board/free",
    name: "freeboard",
    component: FreeBoardView,
  },
  {
    path: "/board/info",
    name: "infoboard",
    component: InfoBoardView,
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
  },
  {
    path: "/board/upload",
    name: "upload",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/UploadView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
