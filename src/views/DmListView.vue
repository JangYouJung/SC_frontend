<template>
  <div class="Dm">
    <hr />
    <h1 class="DmTitle">비밀 대화</h1>
    <hr />
    <br />
    <div class="friendList">
      <table>
        <tbody>
          <tr :key="i.id" v-for="i in nameList">
            <td v-if="i.id && i.id != userData.user_id" @click="goDm(i.id)">
              {{ i.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
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
const nameList = ref([{}]);

const router = useRouter();
function getDmList() {
  userData.instance
    .get("http://34.64.87.72:3300/chat/dm", {
      params: { user_id: userData.user_id },
    })
    .then(function (res) {
      list.value = res.data;
      list.value.forEach((ele) => {
        userData.instance
          .get("http://34.64.87.72:3300/chat/getName", { params: { id: ele } })
          .then((response: { data: { user_name: string } }) => {
            nameList.value.push({ name: response.data.user_name, id: ele });
          });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function goDm(receiver_id: string) {
  router.push(`/dm/${receiver_id}`);
}

function goMenu() {
  router.push(`/menu`);
}

getDmList();
</script>

<style scoped>
table {
  width: 30em;
  border-top: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid #ffffff;
  padding: 10px;
  width: 10em;
}
.friendList {
  height: 20em;
  display: inline-block;
}
.Dm {
  padding-top: 2em;
}
.DmTitle {
  display: inline-block;
}
</style>
