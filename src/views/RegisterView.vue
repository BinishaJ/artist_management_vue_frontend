<script setup>
import NewUserView from "./NewUserView.vue";
import { ref } from "vue";

const details = ref({
  title: "Register Yourself",
  description: "Enter your details",
  button: "Sign Up",
  toast: "User Registered",
  redirect: "/",
  type: "register",
});
</script>

<template>
  <NewUserView v-bind:details="details" />
</template>
