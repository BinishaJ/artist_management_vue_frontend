<script setup>
import Navbar from "./views/Navbar.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const shouldShowNavbar = ref(false);

watch(
  () => route.meta,
  (newMeta) => {
    shouldShowNavbar.value = newMeta.requiresNavbar === true;
  },
  { immediate: true }
);
</script>

<template>
  <Navbar v-if="shouldShowNavbar" />
  <main>
    <router-view></router-view>
  </main>
</template>
