<script setup>
import Song from "./Song.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { axiosInstance } from "../axios/axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();

const details = ref({
  title: "Edit Song",
  description: "",
  button: "Update",
  toast: "Song Updated",
  type: "update",
});

const song = ref(null);

const getSong = async () => {
  try {
    const response = await axiosInstance.get(`/musics/${route.params.id}`);
    song.value = response.data;
    song.value.artist_id = String(song.value.artist_id);
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

onMounted(() => {
  getSong();
});
</script>

<template>
  <div v-if="song">
    <Song v-bind:details="details" v-bind:song="song" />
  </div>
</template>
