<template>
  <div class="board">
    <hr />
    <h1 v-if="data[0].post_type == 'free'" class="boardTitle">자유게시판</h1>
    <h1 v-else-if="data[0].post_type == 'info'" class="boardTitle">
      정보게시판
    </h1>
    <hr />
    <br />
    <div class="contents">
      <div class="title">제목 : {{ data[0].post_title }}</div>
      <div class="writer">글쓴이 : {{ data[0].post_name }}</div>
      <div class="date">작성일 : {{ data[0].post_create }}</div>
      <div v-if="data[0].post_update != null">
        최종 수정일 : {{ data[0].post_update }}
      </div>
      <br />
      <div class="text">
        {{ data[0].post_content }}
      </div>
    </div>
    <hr style="border: 1px" />
    <button
      v-if="userData.user_id == data[0].post_writer"
      @click="goEdit(data[0].post_id)"
    >
      수정하기
    </button>
    <button @click="goMenu">메뉴</button>
    <button v-if="userData.user_id == data[0].post_writer" @click="deletePost">
      삭제하기
    </button>
    <button @click="router.back()">돌아가기</button>
    <br />
    <br />
    <ShortCut></ShortCut>
  </div>
</template>

<script setup lang="ts">
import { userData } from "@/store/user";
import { inject, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ShortCut from "@/components/ShortCut.vue";

const router = useRouter();
const route = useRoute();

const inject_alert: any = inject("setAlertOpen");

const data = ref();

function getPostings() {
  userData.instance
    .get(`http://34.64.87.72:3300/board`, {
      params: { id: route.params.id },
    })
    .then(function (res) {
      data.value = res.data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function deletePost() {
  if (data.value[0].post_writer == userData.user_id) {
    userData.instance
      .delete(`http://34.64.87.72:3300/board`, {
        params: { id: route.params.id },
      })
      .then(() => {
        inject_alert("삭제되었습니다!");
        router.push(`/board/${data.value[0].post_type}`);
      })
      .catch((err) => {
        inject_alert("삭제실패");
        console.log(err);
      });
  } else {
    inject_alert("본인만 삭제할 수 있습니다!");
  }
}

function goEdit(id: string) {
  router.push(`/board/edit/${id}`);
}
function goMenu() {
  router.push(`/menu`);
}
getPostings();
</script>

<style scoped>
.board {
  padding-top: 2em;
}
.contents {
  display: inline-flex;
  height: 20em;
  width: 38em;
  border: 1px solid #ffffff;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;
  white-space: pre;
}

.text {
  text-align: left;
}
</style>
