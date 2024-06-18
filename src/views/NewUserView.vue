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
import { ref, computed, reactive, defineProps } from "vue";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Eye, EyeOff } from "lucide-vue-next";
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
    redirect: {
      type: String,
      required: true,
    },
  },
  user: Object,
});

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone: "",
  dob: "",
  gender: "",
  address: "",
};

const data = reactive({ ...initialState, ...props.user });

let showPassword = ref(false);

const showPasswordField = () => {
  showPassword.value = !showPassword.value;
};

const value = computed({
  get: () => (values.dob ? parseDate(values.dob) : undefined),
  set: (val) => val,
});

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().optional().or(z.literal("")),
    last_name: z.string().optional().or(z.literal("")),
    email: z.string().min(1, { message: "Field is required" }).email(),
    password: props.user
      ? z.string().optional().or(z.literal(""))
      : z.string().min(8, { message: "Password must be atleast 8 characters" }),
    phone: z
      .string()
      .max(20, { message: "Phone cannot exceed max length of 20" })
      .optional()
      .or(z.literal("")),
    dob: z.string().date().optional().or(z.literal("")),
    gender: z.string().optional().or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
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
      router.push({ path: props.details.redirect });
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
          <FormField v-slot="{ componentField }" name="first_name">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">First Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.first_name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="last_name">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Last Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.last_name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-if="!props.user"
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Password</FormLabel>
              <div class="relative">
                <FormControl>
                  <Input
                    v-bind:type="[showPassword ? 'text' : 'password']"
                    v-bind="componentField"
                    v-model="data.password"
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

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem class="label_margin">
              <FormLabel class="text-inherit text-base">Phone</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  v-bind="componentField"
                  v-model="data.phone"
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
        </CardContent>
        <CardFooter class="flex justify-between px-6 pb-6">
          <RouterLink :to="props.details.redirect"
            ><Button variant="outline" type="button">
              Cancel
            </Button></RouterLink
          >
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
