<template>
  <div>
    <br />
    <label>바로가기 :</label>
    <input
      class="shortcut"
      type="text"
      v-model="go"
      @keypress.enter.prevent="goWhere"
      placeholder="/M(메뉴), /F(자유게시판), /I(정보게시판), /C(단체대화방), /G(추억의 게임)"
    />
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable */
import router from "@/router";
import { ref, inject } from "vue";

const inject_alert: any = inject("setAlertOpen");
const go = ref("");

function goWhere() {
  if (go.value == "/F") {
    router.push("/board/free");
  } else if (go.value == "/I") {
    router.push("/board/info");
  } else if (go.value == "/C") {
    router.push("/chat");
  } else if (go.value == "/M") {
    router.push("/menu");
  } else if (go.value == "/G") {
    router.push("/game");
  } else {
    inject_alert("명령어가 존재하지 않습니다.");
  }
  go.value = "";
}
</script>

<style scoped>
.shortcut {
  font-size: large;
  width: 40em;
  padding: 0.3em;
}
</style>
