<script setup>
import Artist from "./Artist.vue";
import { ref } from "vue";

const details = ref({
  title: "Edit Artist",
  description: "",
  button: "Update",
  toast: "Artist Updated",
});

const artist = ref({
  id: 1,
  name: "First",
  dob: "2021-02-14",
  gender: "m",
  address: "Address",
  first_release_year: 2013,
  no_of_albums_released: 10,
});
</script>

<template>
  <Artist v-bind:details="details" v-bind:artist="artist" />
</template>
