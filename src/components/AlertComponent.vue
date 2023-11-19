<template>
  <div class="background">
    <div class="alert-window">
      <div class="bar"><button class="closeBtn" @click="close">X</button></div>
      {{ msg.alert_message }}
      <br />
      <button class="checkBtn" @click="close">확인</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, defineProps } from "vue";

const msg = defineProps({
  alert_message: String,
});

const inject_close: any = inject("setAlertClose");

function close() {
  inject_close();
}
</script>

<style scoped>
div {
  display: block;
}
.background {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
}
.alert-window {
  width: 40%;
  height: 20em;
  background: rgb(156, 156, 156);
  padding: 1px;
  margin: 10em;
  z-index: 100;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.checkBtn {
  width: 5em;
  height: 3em;
  margin-left: 80%;
  margin-bottom: 1em;
}
.bar {
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
