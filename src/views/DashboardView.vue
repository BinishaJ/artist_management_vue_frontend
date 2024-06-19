<script setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "../axios/axios";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";

const totalUsers = ref(null);
const totalArtists = ref(null);
const totalSongs = ref(null);
const toast = useToast();

const getData = async () => {
  try {
    let response = await axiosInstance.get("/users/count");
    totalUsers.value = response.data.data;

    response = await axiosInstance.get("/artists/count");
    totalArtists.value = response.data.data;

    response = await axiosInstance.get("/musics/count");
    totalSongs.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="p-6 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
    <Card class="p-7 bg-[#fde4c3]">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="mb-2 text-2xl font-semibold"> Total Users </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-users-round mr-3"
        >
          <path d="M18 21a8 8 0 0 0-16 0" />
          <circle cx="10" cy="8" r="5" />
          <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-medium flex items-center">
          <p>{{ totalUsers }}</p>
        </div>
      </CardContent>
    </Card>
    <Card class="p-7 bg-[#fde4c3]">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="mb-2 text-2xl font-semibold">
          Total Artists
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-round-cog"
        >
          <path d="M2 21a8 8 0 0 1 10.434-7.62" />
          <circle cx="10" cy="8" r="5" />
          <circle cx="18" cy="18" r="3" />
          <path d="m19.5 14.3-.4.9" />
          <path d="m16.9 20.8-.4.9" />
          <path d="m21.7 19.5-.9-.4" />
          <path d="m15.2 16.9-.9-.4" />
          <path d="m21.7 16.5-.9.4" />
          <path d="m15.2 19.1-.9.4" />
          <path d="m19.5 21.7-.4-.9" />
          <path d="m16.9 15.2-.4-.9" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-medium flex items-center">
          <p>{{ totalArtists }}</p>
        </div>
      </CardContent> </Card
    ><Card class="p-7 bg-[#fde4c3]">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="mb-2 text-2xl font-semibold"> Total Songs </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-music"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-medium flex items-center">
          <p>{{ totalSongs }}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
