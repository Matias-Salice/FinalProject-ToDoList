<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/stores/users";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const userStore = useUserStore();
const isSigningUp = ref(false);
const router = useRouter();
const errorState = ref("");
const submitted = ref(false);

const toggleMode = () => {
  isSigningUp.value = !isSigningUp.value;
  errorState.value = "";
  submitted.value = false;
};

const validEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

watch(
  () => userStore.error,
  (newError) => {
    errorState.value = newError === "Invalid login credentials"
      ? "Usuario y/o contraseña incorrectos"
      : newError;
  }
);

watch([email, password], () => {
  errorState.value = "";
  submitted.value = false;
});

const signIn = async () => {
  submitted.value = true;
  if (!validEmail(email.value) || password.value.length < 6) {
    return;
  }
  try {
    await userStore.signIn(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    errorState.value = err.message === "Invalid login credentials"
      ? "Usuario y/o contraseña incorrectos"
      : err.message;
  } finally {
  }
};

const signUp = async () => {
  submitted.value = true;
  if (password.value !== confirmPassword.value || password.value.length < 6) {
    errorState.value = "La contraseña no cumple los requisitos minimos";
    return;
  }
  try {
    await userStore.createUser(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    errorState.value = err.message;
  } finally {
  }
};
</script>

<template>
  <div class="container">
    <h2>{{ isSigningUp ? "Crear cuenta" : "Iniciar sesión" }}</h2>
    <form @submit.prevent="isSigningUp ? signUp() : signIn()">
      <div>
        <input
          class="input"
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
        <span v-if="submitted && !validEmail(email)" class="error">
          Por favor ingresa un formato de email correcto.
        </span>
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
        <span v-if="submitted && password.length < 6" class="error">
          La contraseña debe tener al menos 6 caracteres.
        </span>
      </div>
      <div v-if="isSigningUp">
        <input
          class="input"
          type="password"
          v-model="confirmPassword"
          placeholder="Confirma la contraseña"
          required
        />
        <span v-if="submitted && password !== confirmPassword" class="error">
          Las contraseñas no coinciden.
        </span>
      </div>

      <div v-if="errorState" class="error">{{ errorState }}</div>
      <button class="button login" v-if="!isSigningUp" type="submit">
        Iniciar sesión
      </button>
    </form>

    <button class="button" v-if="isSigningUp" type="submit" @click="signUp">
      Crear cuenta
    </button>

    <button class="button" @click="toggleMode">
      {{
        isSigningUp
          ? "¿Ya tienes una cuenta? Inicia sesión."
          : "Si no tienes una cuenta, crea una aquí"
      }}
    </button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 20px;
  gap: 10px;
}

.input {
  display: flex;
  justify-content: center;
  background-color: #1f2522;
  margin: 20px;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  color: white;
}

.login {
  width: 100%;
}

.error {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 15px;
}

.button {
  display: block;
  align-items: center;
  padding: 10px 30px;
  background-color: #1f2522;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 20px;
  max-width: 200px;
}

.button:hover {
  background-color: #0e3b20;
}
</style>



