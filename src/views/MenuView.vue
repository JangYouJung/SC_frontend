<template>
  <div>
    <h1>메뉴</h1>
    <div class="menu">
      <table>
        <tr>
          <button @click="goFreeBoard">자유게시판</button
          ><button @click="goInfoBoard">정보게시판</button
          ><button @click="goChat">대화방</button>
        </tr>
        <tr>
          <button @click="goGame">추억의 게임</button>
          <button @click="router.push('/friends')">비밀대화</button>
          <button @click="logout">로그아웃</button>
        </tr>
      </table>
    </div>
    <br />
    <div>
      <ShortCut></ShortCut>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { useRouter } from "vue-router";
import { inject } from "vue";
import ShortCut from "@/components/ShortCut.vue";
const router = useRouter();

const inject_alert: any = inject("setAlertOpen");

const checkAvailable: any = inject("setCheckAvailable");
checkAvailable();

function goFreeBoard() {
  router.push("/board/free");
}

function goGame() {
  router.push("/game");
}

function goInfoBoard() {
  router.push("/board/info");
}

function goChat() {
  router.push("/chat");
}

function logout() {
  localStorage.clear();
  inject_alert("로그아웃 되었습니다!");
  router.push("/login");
}
</script>
<style scoped>
.menu {
  display: flex;
  justify-content: center;
}
button {
  width: 15em;
  height: 10em;
  font-size: larger;
}

.shortcut {
  display: inline-block;
  width: 30em;
  height: 2em;
}
</style>
