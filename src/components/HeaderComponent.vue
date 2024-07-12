<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/users";

const userStore = useUserStore();
const router = useRouter();

const signOut = async () => {
  await userStore.signOut();
  router.push({ name: "Log" });
};
</script>

<template>
  <header class="header">
    <h1>Lista De Tareas</h1>

    <nav class="signout">
      <ul>
        <li class="signout" v-if="userStore.user" @click="signOut">
          Desconectar
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: rgb(14, 59, 32, 0.7);
  text-align: center;
  padding: 1rem;
  position: relative;
  border-radius: 100px;
}

.signout {
  position: absolute;
  right: 5%;
  top: 35%;
  font-size: 20px;
  cursor: pointer;
  list-style: none;
}

.title {
  margin: 0 auto;
  text-decoration: none;
  color: #000000;
  font-size: 8vw;
}
</style>
