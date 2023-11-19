<template>
  <div class="board">
    <hr />
    <h1 class="boardTitle">자유게시판</h1>
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
      <tbody>
        <tr class="rows" v-for="row in list" :key="row">
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
import { userData } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ShortCut from "@/components/ShortCut.vue";

const list = ref([]);
const router = useRouter();
function getPostings() {
  userData.instance
    .get("http://34.64.87.72:3300/board/list")
    .then(function (res) {
      res.data.forEach((element: any) => {
        if (element.post_type == "free") list.value.push(element);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function goDm(writer: number) {
  router.push(`/dm/${writer}`);
}

function goUpload() {
  router.push({ name: "upload", query: { type: "free" } });
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
