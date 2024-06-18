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
import { computed, reactive, defineProps } from "vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const router = useRouter();
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
  },
  artist: Object,
});

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const initialState = {
  name: "",
  dob: "",
  gender: "",
  address: "",
  first_release_year: "",
  no_of_albums_released: "",
};

const data = reactive({ ...initialState, ...props.artist });

const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: (val) => val,
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: "Field is required" }),
    dob: z.string().min(1, { message: "Field is required" }).date(),
    gender: z.string().min(1, { message: "Field is required" }),
    address: z.string().min(1, { message: "Field is required" }),
    first_release_year: z
      .number({ message: "Field is required" })
      .min(1950)
      .max(new Date().getFullYear()),
    no_of_albums_released: z.number({ message: "Field is required" }).min(0),
  })
);

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: data,
});

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted!", values);
  Object.assign(data, initialState);
  toast.success(props.details.toast, {
    onClose: () => {
      router.push({ path: "/artists" });
    },
  });
});
</script>

<template>
  <div class="flex justify-center items-center my-12">
    <Card class="w-3/4 md:w-[60%] lg:w-[40%]">
      <form class="space-y-4 p-6" @submit.prevent="onSubmit">
        <CardHeader>
          <CardTitle class="text-3xl">{{ props.details.title }}</CardTitle>
          <CardDescription>{{ props.details.description }}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="dob">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">DOB</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-full ps-3 text-start font-normal',
                          !value && 'text-muted-foreground'
                        )
                      "
                    >
                      <span>{{ value ? df.format(toDate(value)) : "" }}</span>
                      <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                    </Button>
                    <input hidden />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar
                    calendar-label="Date of birth"
                    initial-focus
                    :max-value="today(getLocalTimeZone())"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          setFieldValue('dob', v.toString());
                        } else {
                          setFieldValue('dob', undefined);
                        }
                      }
                    "
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="gender">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Gender</FormLabel>
              <FormControl>
                <Select
                  v-bind="componentField"
                  id="gender"
                  v-model="data.gender"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="m"> Male </SelectItem>
                      <SelectItem value="f"> Female </SelectItem>
                      <SelectItem value="o"> Others </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="address">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="first_release_year">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base"
                >First Release Year</FormLabel
              >
              <FormControl>
                <Input
                  type="number"
                  v-bind="componentField"
                  v-model="data.first_release_year"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="no_of_albums_released">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base"
                >No of Albums Released</FormLabel
              >
              <FormControl>
                <Input
                  type="number"
                  v-bind="componentField"
                  v-model="data.no_of_albums_released"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <RouterLink to="/artists"
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
