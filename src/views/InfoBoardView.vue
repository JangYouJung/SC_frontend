<template>
  <!-- <CheckLogin></CheckLogin> -->
  <div class="board">
    <hr />
    <h1 class="boardTitle">정보게시판</h1>
    <hr />
    <br />
    <table class="boardTable">
      <thead>
        <tr>
          <th>No</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일시</th>
        </tr>
      </thead>
      <tbody v-if="list.length > 0">
        <tr v-for="row in list" :key="row.post_id">
          <td>{{ row.post_id }}</td>
          <td>
            <a @click="goPosting(row.post_id)">{{ row.post_title }}</a>
          </td>
          <td @click="goDm(row.post_writer)">{{ row.post_name }}</td>
          <td>{{ row.post_create }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <button @click="goUpload">글쓰기</button>
    <button @click="goMenu">메뉴</button>
    <br />
    <br />
    <div>
      <ShortCut></ShortCut>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { userData } from "@/store/user";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import ShortCut from "@/components/ShortCut.vue";

const list = ref([{} as postData]);
const router = useRouter();
const inject_alert: any = inject("setAlertOpen");

interface postData {
  post_id: number;
  post_name: string;
  post_title: string;
  post_create: string;
  post_type: string;
  post_writer: number;
}

function getPostings() {
  userData.instance
    .get("http://sc-chatting.ddns.net/api/board/list")
    .then(function (res) {
      res.data.forEach((element: any) => {
        if (element.post_type == "info") list.value.push(element);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function goDm(writer: number) {
  if (writer && writer.toString() == userData.user_id)
    inject_alert("본인에게는 일대일 대화를 할 수 없습니다!");
  else if (writer == undefined) return;
  else router.push(`/dm/${writer}`);
}

function goUpload() {
  router.push({ name: "upload", query: { type: "info" } });
}
function goPosting(p_id: number) {
  router.push(`/board/${p_id}`);
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
.boardTable {
  display: inline-block;
  height: 20em;
}

table {
  width: 30em;
  border-top: 1px solid #ffffff;
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid #ffffff;
  padding: 10px;
  width: 10em;
}
</style>
