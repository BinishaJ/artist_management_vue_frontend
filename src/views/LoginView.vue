<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { RouterLink } from "vue-router";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";
import { axiosInstance } from "../axios/axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

import loginCover from "@/assets/images/login-cover.webp";

const router = useRouter();
const toast = useToast();
let showPassword = ref(false);

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const postData = async () => {
  try {
    await userStore.login(email.value, password.value);

    email.value = "";
    password.value = "";

    router.push({ path: "/home" });
  } catch (error) {
    console.error("Error fetching data:", error);
    password.value = "";

    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

const showPasswordField = () => {
  showPassword.value = !showPassword.value;
};

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  console.log("Form submitted!", values);
  await postData(values);
});
</script>

<template>
  <div class="w-full flex justify-center items-center">
    <div class="w-full md:w-[50%] flex flex-col justify-center items-center">
      <div class="mb-8">
        <p class="font-semibold text-3xl mb-2">Welcome Back!</p>
        <p class="light-text text-sm">Please enter your login details</p>
      </div>
      <form class="w-3/4 md:w-1/2 space-y-3" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel class="text-inherit">Email</FormLabel>
            <FormControl>
              <Input type="text" v-model="email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="text-inherit">Password</FormLabel>
            <div class="relative">
              <FormControl class="w-full max-w-sm items-center">
                <Input
                  v-bind:type="[showPassword ? 'text' : 'password']"
                  v-bind="componentField"
                  class="pr-10 max-w-[none]"
                  v-model="password"
                />
                <span
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-3"
                >
                  <Button
                    class="p-0 bg-transparent hover:bg-transparent"
                    @click="showPasswordField"
                    type="button"
                  >
                    <Eye
                      v-if="showPassword"
                      class="size-5 text-muted-foreground"
                    />
                    <EyeOff v-else class="size-5 text-muted-foreground" />
                  </Button>
                </span>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <RouterLink to="/"
          ><p class="text-xs light-text my-3 text-right">
            Forgot password?
          </p></RouterLink
        >
        <Button type="submit" class="w-full"> Sign In </Button>
      </form>
      <p class="text-center light-text text-sm mt-4">
        Don't have an account?
        <RouterLink to="/register"><b>Sign Up</b></RouterLink>
      </p>
    </div>
    <div class="hidden md:block md:w-1/2 relative">
      <img :src="loginCover" class="h-screen w-full object-cover" />
      <div class="absolute bg-black opacity-40 top-0 h-screen w-full"></div>
    </div>
  </div>
</template>

<style scoped>
.light-text {
  color: #374151;
}
</style>
