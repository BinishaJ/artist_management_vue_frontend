<script setup>
import Artist from "./Artist.vue";
import { ref, onMounted } from "vue";
import { axiosInstance } from "../axios/axios";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();

const details = ref({
  title: "Edit Artist",
  description: "",
  button: "Update",
  toast: "Artist Updated",
  type: "update",
});

const artist = ref(null);

const getArtist = async () => {
  try {
    const response = await axiosInstance.get(`/artists/${route.params.id}`);
    artist.value = response.data;
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

onMounted(() => {
  getArtist();
});
</script>

<template>
  <div v-if="artist">
    <Artist v-bind:details="details" v-bind:artist="artist" />
  </div>
</template>
