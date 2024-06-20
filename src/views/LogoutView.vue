<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  await userStore.logout();
};

logout();
setTimeout(() => {
  router.push({ path: "/" });
}, 1000);
</script>

<template>Logging Out...</template>
