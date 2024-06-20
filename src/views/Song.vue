<script setup>
import { useForm } from "vee-validate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { reactive, defineProps, onMounted, ref } from "vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "vue-toastification";
import { useRouter, useRoute } from "vue-router";
import { axiosInstance } from "../axios/axios";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const props = defineProps({
  details: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    toast: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  song: Object,
});

const songType = props.details.type;

const initialState = {
  title: "",
  album_name: "",
  genre: "",
  artist_id: "",
};

const data = reactive({ ...initialState, ...props.song });
const artists = ref([]);

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, { message: "Field is required" }),
    album_name: z.string().min(1, { message: "Field is required" }),
    genre: z.string().min(1, { message: "Field is required" }),
    artist_id: z.string().min(1, { message: "Field is required" }),
  })
);

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: data,
});

const postData = async (values) => {
  try {
    values.artist_id = +values.artist_id;
    if (songType == "update")
      await axiosInstance.patch(`/musics/${route.params.id}`, values);
    else await axiosInstance.post("/musics", values);

    Object.assign(data, initialState);
    toast.success(props.details.toast, {
      onClose: () => {
        router.push({ path: "/songs" });
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted!", values);
  await postData(values);
});

const fetchArtists = async () => {
  try {
    const response = await axiosInstance.get(`/artists/all`);
    artists.value = response.data.data;
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
  fetchArtists();
});
</script>

<template>
  <div
    class="flex justify-center items-center my-12"
    style="min-height: calc(100vh - 70px - 6rem)"
  >
    <Card class="w-3/4 md:w-[60%] lg:w-[40%]">
      <form class="space-y-4 p-6" @submit.prevent="onSubmit">
        <CardHeader>
          <CardTitle class="text-3xl">{{ props.details.title }}</CardTitle>
          <CardDescription>{{ props.details.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField v-slot="{ componentField }" name="artist_id">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Artist</FormLabel>
              <FormControl>
                <Select
                  v-bind="componentField"
                  id="artist_id"
                  v-model="data.artist_id"
                  :disabled="props.details.type === 'update'"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="artist in artists"
                        :key="artist.id"
                        :value="`${artist.id}`"
                      >
                        {{ artist.name }}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="title">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="album_name">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Album</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.album_name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="genre">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Genre</FormLabel>
              <FormControl>
                <Select v-bind="componentField" id="genre" v-model="data.genre">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="rnb"> RnB </SelectItem>
                      <SelectItem value="country"> Country </SelectItem>
                      <SelectItem value="classic"> Classic </SelectItem>
                      <SelectItem value="rock"> Rock </SelectItem>
                      <SelectItem value="jazz"> Jazz </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <RouterLink :to="`/songs`"
            ><Button variant="outline" type="button"> Cancel </Button>
          </RouterLink>
          <Button type="submit">{{ props.details.button }}</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<style scoped>
.label_margin {
  margin-top: 1rem;
}
</style>
