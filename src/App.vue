<template>
  <AlertComponent
    v-if="open_alert == true"
    :alert_message="alert_message"
  ></AlertComponent>
  <CheckLogin v-if="checkAvailable == true"></CheckLogin>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from "vue-router";
import AlertComponent from "./components/AlertComponent.vue";
import CheckLogin from "./components/CheckLogin.vue";

const checkAvailable = ref(false);
const open_alert = ref(false);
const alert_message = ref("");

checkAvailable.value =
  window.location.pathname != "/login" &&
  window.location.pathname != "/" &&
  window.location.pathname != "/signup";
function setCheckAvailable() {
  checkAvailable.value = true;
}
provide("setCheckAvailable", setCheckAvailable);

function setAlertClose() {
  open_alert.value = false;
  alert_message.value = "";
}
provide("setAlertClose", setAlertClose);

function setAlertOpen(msg: string) {
  open_alert.value = true;
  alert_message.value = msg;
}
provide("setAlertOpen", setAlertOpen);
</script>
<style>
@import url("https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  display: contents;
  font-size: larger;
}

table {
  overflow: auto;
}

button {
  font-size: large;
}

hr {
  width: 40em;
}

body {
  display: inline;
}

* {
  font-family: "Galmuri9";
  background-color: blue;
  color: white;
}
</style>
