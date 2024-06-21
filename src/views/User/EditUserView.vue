<script setup>
import NewUserView from "./NewUserView.vue";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRoute } from "vue-router";
import { axiosInstance } from "../../axios/axios";

const toast = useToast();
const route = useRoute();

const details = ref({
  title: "Edit User",
  description: "",
  button: "Update",
  toast: "User Updated",
  redirect: "/users",
  type: "update",
});

const user = ref(null);

const getUser = async () => {
  try {
    const response = await axiosInstance.get(`/users/${route.params.id}`);
    user.value = response.data;
    if (!user.value["gender"]) user.value["gender"] = "";
    if (!user.value["dob"]) user.value["dob"] = "";

    user.value["role_id"] = user.value["role_id"].toString();
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

onMounted(() => {
  getUser();
});
</script>

<template>
  <div v-if="user">
    <NewUserView v-bind:details="details" v-bind:user="user" />
  </div>
</template>
