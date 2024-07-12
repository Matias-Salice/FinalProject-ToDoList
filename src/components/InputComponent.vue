<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/users";

const taskStore = useTaskStore();
const userStore = useUserStore();
const title = ref("");

const addTask = () => {

  const taskMessage = {
    title: title.value,
    user_id: userStore.user.user.id,
  };

  taskStore.taskAdd(taskMessage);
  title.value = "";
};
</script>

<template>
  <form class="container" @submit.prevent="addTask">
    <input v-model="title" placeholder="Escriba su nueva tarea" required />
    <button class="button" type="submit">Añadir Tarea</button>
  </form>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 20px;
  background-color: #1f2522;
  border-radius: 10px;
  border-color: #1f2522;
  color: white;
  width: 40%;
  margin-right: 10px;
}

.button {
  padding: 10px 15px;
  background-color: #1f2522;
  color: white;
  width: 200px;
  height: 50px;
  font-size: 15px;
  border-radius: 20px;
}

.button:hover {
  background-color: #0e3b20;
}

</style>
