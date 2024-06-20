<script setup>
import ArtistSongs from "./ArtistSongs.vue";
import { ref } from "vue";

const details = ref({
  type: "artist",
});
</script>

<template>
  <ArtistSongs v-bind:details="details" />
</template>
