<script setup>
import Navbar from "./views/Navbar.vue";
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { setupInterceptors } from "./axios/axios";

const route = useRoute();
const shouldShowNavbar = ref(false);

watch(
  () => route.meta,
  (newMeta) => {
    shouldShowNavbar.value = newMeta.requiresNavbar === true;
  },
  { immediate: true }
);

onMounted(() => {
  setupInterceptors();
});
</script>

<template>
  <Navbar v-if="shouldShowNavbar" />
  <main>
    <router-view></router-view>
  </main>
</template>
