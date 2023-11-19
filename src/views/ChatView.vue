<template>
  <div class="chat">
    <hr />
    <h1 class="chatTitle">대화방</h1>
    <hr />
    <div class="msgBox">
      <div :key="i.idx" v-for="i in inputMessage">
        <span v-if="i.s_name"
          ><span @click="router.push(`/dm/${i.writer}`)">{{ i.s_name }}</span> :
          <span>{{ i.msg }}</span></span
        >
      </div>
    </div>
    <hr />
    <div class="inputBox">
      {{ userData.user_name }}
      <textarea
        class="textarea"
        v-model="message"
        rows="1"
        @keypress.enter.prevent="sendMessage"
        no-resize
      ></textarea>
      <button @click="sendMessage">전송</button>
      <button @click="goBack">나가기</button>
    </div>
    <ShortCut></ShortCut>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, inject } from "vue";
import { userData } from "@/store/user";
import router from "@/router";
import ShortCut from "@/components/ShortCut.vue";

const inputMessage = ref([{}]);
const message = ref();
const element = ref();
const checkAvailable: any = inject("setCheckAvailable");
checkAvailable();

userData.socket.on("connect", () => {
  console.log("client connect", userData.socket.id);
});

userData.socket.on(
  "send",
  (data: string, sender: string, sender_name: string) => {
    console.log("send Event");
    inputMessage.value.push({ msg: data, writer: sender, s_name: sender_name });
    scrollDown();
  }
);

function sendMessage() {
  console.log("enter");
  userData.socket.emit("send", {
    message: message.value,
    sender: userData.user_id,
    s_name: userData.user_name,
  });
  inputMessage.value.push({
    msg: message.value,
    writer: userData.user_id,
    s_name: userData.user_name,
  });
  message.value = "";
  scrollDown();
}

function goBack() {
  router.back();
}

function getBeforeData() {
  userData.instance
    .get("http://34.64.87.72:3300/chat/getMessages")
    .then((res) => {
      res.data.forEach((element: object) => {
        inputMessage.value.push({
          msg: element.m_content,
          writer: element.m_sender,
          s_name: element.m_sender_name,
        });
        scrollDown();
      });
    });
}

async function scrollDown() {
  await nextTick();
  element.value = document.querySelector(".msgBox") as HTMLInputElement;
  element.value.scrollTo({
    top: element.value.scrollHeight,
    behavior: "smooth",
  });
}

onMounted(() => {
  checkAvailable();
  getBeforeData();
});
</script>

<style scoped>
.textarea {
  color: white;
  width: 30em;
  margin: 0.2em;
  font-size: large;
}
.inputBox {
  display: flex;
  align-items: center;
}
.chat {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}

.msgBox {
  height: 20em;
  width: 30em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
}
</style>
