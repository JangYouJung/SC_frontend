<template>
  <div class="signUpBox">
    <h3>회원가입</h3>
    닉네임 입력 :
    <input type="text" name="nickname" v-model="name" />
    <br />
    전자우편 입력 :
    <input type="text" name="useremail" v-model="useremail" />
    <br />
    비밀번호 입력 :
    <input type="password" name="password" v-model="pwd" />
    <br />
    비밀번호 확인 :
    <input type="password" name="check_pw" v-model="pwdCheck" />
    <br />
    <button @click="signUpForm">회원가입</button>
    <br />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import axios from "axios";
const router = useRouter();

const useremail = ref("");
const pwd = ref("");
const pwdCheck = ref("");
const name = ref("");

const inject_alert: any = inject("setAlertOpen");

async function signUpForm() {
  const data = new FormData();
  data.append("email", `${useremail.value}`);
  data.append("pwd", `${pwd.value}`);
  data.append("check_pw", `${pwdCheck.value}`);
  data.append("nickname", `${name.value}`);

  await axios
    .post("http://34.64.87.72:3300/signup", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function () {
      inject_alert("회원가입에 성공하셨습니다!");
      router.push("/login");
    })
    .catch(function () {
      inject_alert("회원가입 실패");
    });
}
</script>

<style scoped>
form {
  align-items: flex-end;
}

input {
  padding: 2px;
  margin: 0.2em;
}
.signUpBox {
  display: block;
}

.submitBtn {
  display: inline-table;
}
</style>
