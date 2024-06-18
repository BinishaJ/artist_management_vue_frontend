<script setup>
import Song from "./Song.vue";
import { ref } from "vue";

const details = ref({
  title: "Create a new song",
  description: "Enter the details",
  button: "Create",
  toast: "Song Created",
});
</script>

<template>
  <Song v-bind:details="details" />
</template>
