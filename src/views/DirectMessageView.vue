<template>
  <div class="chat">
    <hr />
    <h1 class="chatTitle">비밀대화</h1>
    <hr />
    <div class="msgBox">
      <div :key="i.msg" v-for="i in inputMessage">
        <span v-if="i.s_name">{{ i.s_name }} : {{ i.msg }}</span>
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
import { useRoute } from "vue-router";

interface messageInterface {
  msg: string;
  writer: string;
  s_name: string;
  receiver: string;
}

const route = useRoute();
const inputMessage = ref([{} as messageInterface]);
const message = ref();
const element = ref();
const checkAvailable: any = inject("setCheckAvailable");
const inject_alert: any = inject("setAlertOpen");

checkAvailable();

if (route.params.receiver_id == userData.user_id) {
  inject_alert("본인에게는 일대일 대화를 할 수 없습니다!");
  router.back();
}

userData.socket.on("connect", () => {
  console.log("client connect", userData.socket.id);
});

userData.socket.on(
  "sendDm",
  (data: string, sender: string, sender_name: string, receiver: string) => {
    if (sender == route.params.receiver_id && receiver == userData.user_id) {
      inputMessage.value.push({
        msg: data,
        writer: sender,
        s_name: sender_name,
        receiver: route.params.receiver_id,
      });
    }
    scrollDown();
  }
);

function sendMessage() {
  userData.socket.emit("sendDm", {
    message: message.value,
    sender: userData.user_id,
    s_name: userData.user_name,
    receiver: route.params.receiver_id,
  });
  inputMessage.value.push({
    msg: message.value,
    writer: userData.user_id,
    s_name: userData.user_name,
    receiver: route.params.receiver_id,
  });
  message.value = "";
  scrollDown();
}

function goBack() {
  router.push("/friends");
}

function getBeforeData() {
  const partner_id = route.params.receiver_id;
  userData.instance
    .get("http://34.64.87.72:3300/chat/getBeforeDm", {
      params: { user_id: userData.user_id, partner_id: partner_id },
    })
    .then((res) => {
      res.data.forEach((element: object) => {
        inputMessage.value.push({
          msg: element.m_content,
          writer: element.m_sender,
          s_name: element.m_sender_name,
          receiver: route.params.receiver_id,
        });
        // console.log(res.data);
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
.chat {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
}
.inputBox {
  display: flex;
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
