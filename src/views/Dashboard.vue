<script setup>
import InputComponent from "@/components/InputComponent.vue";
import TaskComponent from "@/components/TaskComponent.vue";
import { useTaskStore } from "@/stores/task.js";
import { watch } from "vue";
import { useUserStore } from "@/stores/users";

const userStore = useUserStore();
const taskStore = useTaskStore();

watch(
  () => userStore.user,
  (newValue) => {
    if (newValue) {
      taskStore.tasksFetch();
    } else {
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="container">
    <h3 class="subtitle">
      "La clave del éxito está en la constancia y el esfuerzo diario"
    </h3>
    <InputComponent />
    <div class="tasks-grid">
      <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
        <TaskComponent :task="task" :key="task.id" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  width: 100%;
}

.subtitle {
  font-style: italic;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 1200px;
}

.task-item {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  font-size: 15px;
  gap: 15px;
  border-radius: 8px;
  max-width: 100%;
}

.completed {
  text-decoration: line-through;
  background-color: rgb(99, 173, 139);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.check {
  cursor: pointer;
}

.edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

</style>
