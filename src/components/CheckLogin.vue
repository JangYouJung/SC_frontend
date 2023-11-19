<template>
  <div></div>
</template>

<script setup lang="ts">
import router from "@/router";
import { userData } from "@/store/user";
import axios from "axios";
import { io } from "socket.io-client";
import { inject, onMounted } from "vue";

const inject_alert: any = inject("setAlertOpen");
// axios 생성
const instance = axios.create({
  headers: {},
});
userData.instance = instance;

async function loginCheck() {
  userData.user_id = localStorage.getItem("id")!;
  userData.user_name = localStorage.getItem("name")!;
  if (userData.user_id && userData.user_name) return true;
  else {
    inject_alert("login 먼저 해주세요!");
    router.push("/login");
    return false;
  }
}

// socket 서버에 연결
function socketConnect() {
  const s_client = io(`http://34.64.87.72:3300`).connect();
  userData.socket = s_client;
}

onMounted(async () => {
  const is_login = await loginCheck();
  if (is_login == true) {
    await socketConnect();
  } else {
    console.log("loginCheck 실패");
  }
});
</script>
