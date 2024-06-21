<script setup>
import Artist from "./Artist.vue";
import { ref } from "vue";

const details = ref({
  title: "Create a new artist",
  description: "Enter the details",
  button: "Create",
  toast: "Artist Created",
  type: "new",
});
</script>

<template>
  <Artist v-bind:details="details" />
</template>
