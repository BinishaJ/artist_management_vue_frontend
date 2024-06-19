<script setup>
import NewUserView from "./NewUserView.vue";
import { ref } from "vue";

const details = ref({
  title: "Create a new user",
  description: "Enter the details",
  button: "Create",
  toast: "User Created",
  redirect: "/users",
  type: "new",
});
</script>

<template>
  <NewUserView v-bind:details="details" />
</template>
