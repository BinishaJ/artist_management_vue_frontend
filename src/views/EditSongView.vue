<script setup>
import Song from "./Song.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const details = ref({
  title: "Edit Song",
  description: "",
  button: "Update",
  toast: "Song Updated",
});

const song = ref({
  id: route.params.song_id,
  title: "Song 1",
  album_name: "Album 1",
  genre: "country",
});
</script>

<template>
  <Song v-bind:details="details" v-bind:song="song" />
</template>
