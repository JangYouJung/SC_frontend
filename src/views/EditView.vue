<template>
  <div class="board">
    <hr />
    <h1 class="boardTitle">글 수정하기</h1>
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
const data = ref();

function goBack() {
  router.back();
}
function goMenu() {
  router.push(`/menu`);
}
// const type = ref();
getPost();
function getPost() {
  userData.instance
    .get(`http://34.64.87.72:3300/board`, {
      params: { id: route.params.id },
    })
    .then(function (res) {
      data.value = res.data;
      title.value = data.value[0].post_title;
      content.value = data.value[0].post_content;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function sendPost() {
  userData.instance
    .post("http://34.64.87.72:3300/board/edit", {
      p_id: route.params.id,
      p_title: title.value,
      p_content: content.value,
      p_writer: userData.user_id,
      p_name: userData.user_name,
    })
    .then((res) => {
      console.log(res);
      if (res.status == 201) {
        inject_alert("수정 성공");
        router.back();
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
  background-color: white;
  border: 3px solid #000000;
  color: black;
  font-size: large;
}
</style>
