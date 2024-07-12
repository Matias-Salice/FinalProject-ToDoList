<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arsenal+SC:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
body {
  font-family: "Arsenal SC", sans-serif;
  color: white;
  background-image: url("../src/assets/backgroundImage.jpg");
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  height: 100vh;
  margin: 0;
  padding: 0;
}

</style>
