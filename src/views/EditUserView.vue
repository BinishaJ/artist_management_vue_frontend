<script setup>
import NewUserView from "./NewUserView.vue";
import { ref } from "vue";

const details = ref({
  title: "Edit User",
  description: "",
  button: "Update",
  toast: "User Updated",
  redirect: "/users",
});

const user = ref({
  id: 1,
  first_name: "ABC",
  last_name: "Last",
  email: "abc@gmail.com",
  password: "pass",
  phone: "988745510",
  dob: "2021-02-14",
  gender: "m",
  address: "Address",
});
</script>

<template>
  <NewUserView v-bind:details="details" v-bind:user="user" />
</template>
