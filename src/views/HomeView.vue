<template>
  <div class="home">
    <h1>SC통신에 접속하신 것을 환영합니다</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

function goToLogin() {
  router.push("/login");
}

goToLogin();
</script>
<style>
input {
  margin: 0.1em;
  background-color: whitesmoke;
  color: black;
}
.home {
  margin-top: 10em;
}
</style>
