<template>
  <div class="login">
    <h1>SC통신에 접속하신 것을 환영합니다</h1>
    <input
      type="text"
      name="useremail"
      v-model="useremail"
      placeholder="전자우편주소입력"
    />
    <br />
    <input type="password" name="password" v-model="pwd" />
    <br />
    <button @click="loginForm">로그인하기</button>
    <br />
    <button @click="router.push('/signup')">회원가입하기</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";
import { inject, ref } from "vue";

const useremail = ref("");
const pwd = ref("");
const router = useRouter();
const inject_alert: any = inject("setAlertOpen");

function loginForm() {
  const data = new FormData();
  data.append("email", `${useremail.value}`);
  data.append("pwd", `${pwd.value}`);
  axios
    .post("http://34.64.87.72:3300/login/enter", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (res) {
      localStorage.setItem("id", res.data.user_id);
      localStorage.setItem("name", res.data.user_name);
      router.push("/menu");
    })
    .catch(function (err) {
      console.log(err);
      inject_alert("로그인 실패");
    });
}
</script>
<style>
input {
  margin: 0.1em;
  background-color: whitesmoke;
  color: black;
}
.login {
  margin-top: 10em;
}
</style>
