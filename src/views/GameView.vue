<template>
  <div>
    <div class="board">
      <hr />
      <h1 class="boardTitle">추억의 게임</h1>
      <hr />
      <br />
      <div class="games">
        <div style="display: inline-flex; flex-direction: column">
          <a href="https://vidkidz.tistory.com/4015">테트리스</a>
          <br />
          <a href="https://vidkidz.tistory.com/5329">스트리트 파이터</a>
          <br />
          <a href="https://vidkidz.tistory.com/120">팩맨</a>
          <br />
          <a href="https://vidkidz.tistory.com/7748">지뢰찾기</a>
        </div>
      </div>
    </div>
    <hr />
    <button @click="router.push('/menu')">메뉴</button>
    <div>
      <ShortCut></ShortCut>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShortCut from "@/components/ShortCut.vue";
import router from "@/router";
</script>

<style scoped>
th {
  width: 10em;
}
.board {
  padding-top: 2em;
}
.games {
  height: 20em;
}
</style>
