import { defineStore } from "pinia";
import supabase from "@/lib/supabase";
import { ref } from "vue";
import { useUserStore } from "./users";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);

  const tasksFetch = async () => {
    const userStore = useUserStore();

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userStore.user.user.id);

    if (error) {
      console.error(error);
      return;
    }

    tasks.value = data;
  };

  const taskAdd = async (taskDetails) => {
    const { error } = await supabase.from("tasks").insert([taskDetails]);
    if (error) {
      console.error(error.message);
      return;
    }
    await tasksFetch();
  };

  const taskModify = async (id, updates) => {
    const { error } = await supabase
      .from("tasks")
      .update(updates)
      .match({ id });
    if (error) console.error(error);
    else {
      const taskIndex = tasks.value.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updates };
      }
    }
  };

  const taskDelete = async (id) => {
    const { error } = await supabase.from("tasks").delete().match({ id });
    if (error) console.error(error);
    else await tasksFetch();
  };

  return {
    tasks,
    tasksFetch,
    taskAdd,
    taskDelete,
    taskModify,
  };
});
