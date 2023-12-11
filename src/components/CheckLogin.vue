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

/*
// socket 서버에 연결
function socketConnect() {
  const s_client = io('http://sc-chatting.com:5000',{
    path: '/socket.io', // 서버 path와 일치시켜준다
    //transports: ['websocket']
  }).connect();
  
  
  //const s_client = io(`http://sc-chatting.com:5000`).connect();
  
  userData.socket = s_client;
}
*/

// socket 서버에 연결
function socketConnect() {
  const s_client = io('http://sc-chatting.com', {
    path: '/socket.io', // 서버 path와 일치시켜준다
    // transports: ['websocket']
  });

  // 연결 성공 시 이벤트 핸들러
  s_client.on('connect', () => {
    console.log('웹소켓 서버에 연결되었습니다.');
    // 연결된 소켓을 userData.socket에 저장
    userData.socket = s_client;
  });

  // 연결 실패 시 이벤트 핸들러
  s_client.on('connect_error', (error) => {
    console.error('웹소켓 연결 실패:', error);
  });

  // 연결이 끊긴 경우 이벤트 핸들러
  s_client.on('disconnect', (reason) => {
    console.warn('웹소켓 연결이 끊어졌습니다. 이유:', reason);
  });

  // 오류 발생 시 이벤트 핸들러
  s_client.on('error', (error) => {
    console.error('웹소켓 오류:', error);
  });
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
