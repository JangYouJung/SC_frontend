<template>
  <!-- <CheckLogin></CheckLogin> -->
  <div class="board">
    <hr />
    <h1 class="boardTitle">글 작성하기</h1>
    <div v-if="type == 'free'">자유게시판</div>
    <div v-else-if="type == 'info'">정보게시판</div>
    <hr />
    <br />
    <div>
      <label>제목 : </label>
      <input type="text" class="titleInput" name="title" v-model="title" />
      <br />
      <br />
      <textarea
        name="content"
        class="contentInput"
        v-model="content"
      ></textarea>
      <hr style="border: 1px" />
      <button @click="sendPost()">제출하기</button>
      <button @click="goBack()">돌아가기</button>
      <button @click="goMenu()">메뉴</button>
      <br />
      <br />
      <hr />
    </div>
    <br />
    <div>
      <ShortCut></ShortCut>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userData } from "@/store/user";
import ShortCut from "@/components/ShortCut.vue";

const router = useRouter();
const route = useRoute();
const title = ref("");
const content = ref("");
const inject_alert: any = inject("setAlertOpen");

function goBack() {
  router.push(`/board/${route.query.type}`);
}
function goMenu() {
  router.push(`/menu`);
}
const type = ref(route.query.type);
console.log(type.value);
function sendPost() {
  if (route.query.type == "free") {
    userData.instance
      .post("http://34.64.87.72:3300/board/free/upload", {
        p_title: title.value,
        p_content: content.value,
        p_writer: userData.user_id,
        p_name: userData.user_name,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          inject_alert("글 올리기 성공!");
          router.push(`/board/free`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    userData.instance
      .post("http://34.64.87.72:3300/board/info/upload", {
        p_title: title.value,
        p_content: content.value,
        p_writer: userData.user_id,
        p_name: userData.user_name,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          inject_alert("글 올리기 성공!");
          router.push("/board/info");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style scoped>
.board {
  padding-top: 2em;
}
.titleInput {
  width: 30em;
  font-size: large;
}

.contentInput {
  width: 50em;
  height: 30em;
  font-size: large;
  background-color: white;
  border: 3px solid #000000;
  color: black;
}
</style>
