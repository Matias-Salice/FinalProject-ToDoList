<script setup>
import { defineProps, ref } from "vue";
import { useTaskStore } from "@/stores/task";

const props = defineProps({
  task: Object,
});
const store = useTaskStore();
const isEditing = ref(false);
const editTitle = ref("");

const edit = () => {
  isEditing.value = true;
  editTitle.value = props.task.title;
};

const saveTask = async () => {
  await store.taskModify(props.task.id, {
    title: editTitle.value,
  });
  isEditing.value = false;
};

const toggleTaskCompletion = async () => {
  const newCompletionStatus = !props.task.is_complete;
  props.task.is_complete = newCompletionStatus;

  try {
    await store.taskModify(props.task.id, {
      is_complete: newCompletionStatus,
    });
  } catch (error) {
    console.error("Failed to toggle task completion:", error);
    props.task.is_complete = !newCompletionStatus;
  }
};
const exitEdit = () => {
  isEditing.value = false;
};

const deleteTask = async (id) => {
  store.taskDelete(id);
};
</script>

<template>
  <div>
    <div v-if="isEditing" class="edit">
      <input
        class="input task"
        type="text"
        v-model="editTitle"
        placeholder="Title"
      />
      <div>
        <button class="button" @click="saveTask">Guardar</button>
        <button class="button-red" @click="exitEdit">Cancelar</button>
      </div>
    </div>
    <div v-else class="task" :class="{ completed: task.is_complete }">
      <div class="task-content">
        <input
          class="check"
          type="checkbox"
          :checked="task.is_complete"
          @click="toggleTaskCompletion"
        />
        <span>{{ task.title }}</span>
      </div>
      <div>
        <button class="button" @click="edit">Editar</button>
        <button class="button-red" @click="deleteTask(task.id)">X</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  width: 100px;
  height: 25px;
  background-color: #1f2522;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  padding: 0px 10px;
  margin-left: 10px;
  font-size: 15px;
  cursor: pointer;
}

.button-red {
  width: 100px;
  height: 25px;
  background-color: #720c14;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  padding: 0px 10px;
  margin-left: 10px;
  font-size: 15px;
  cursor: pointer;
}

.button:hover {
  background-color: #0e3b20;
}

.task {
  display: flex;
  flex-direction: column;
  align-items: left; /* Alinea el contenido al centro */
  padding: 10px;
  font-size: 15px;
  gap: 15px;
  border: 5px solid #1f2522;
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

.input {
  border-radius: 10px;
  background-color: #1f2522;
  border: 1px solid #0e3b20;
  color: white;
  width: 400px;
  height: 10px;
  padding: 15px;
  margin-left: 50px;
  margin-bottom: 20px;
  font-size: 15px;
  box-sizing: border-box;
  
}
</style>
