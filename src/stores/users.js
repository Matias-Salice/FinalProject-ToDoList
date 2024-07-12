import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "@/lib/supabase";

export const useUserStore = defineStore("userStore", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const error = ref("");

  const createUser = async (email, password) => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      user.value = data;
      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      user.value = data;
      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      user.value = null;
      localStorage.removeItem("user");
    } catch (error) {}
  };

  return {
    user,
    error,
    createUser,
    signIn,
    signOut,
  };
});
