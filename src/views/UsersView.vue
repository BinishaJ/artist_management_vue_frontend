<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "vue-toastification";

const toast = useToast();

const users = ref([
  {
    id: 1,
    first_name: "First",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
  {
    id: 2,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "f",
    address: "Address",
  },
  {
    id: 3,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
  {
    id: 4,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
  {
    id: 5,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "f",
    address: "Address",
  },
  {
    id: 6,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "o",
    address: "Address",
  },
  {
    id: 7,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
  {
    id: 8,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
  {
    id: 9,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "o",
    address: "Address",
  },
  {
    id: 10,
    first_name: "Ten",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "o",
    address: "Address",
  },
  {
    id: 11,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "o",
    address: "Address",
  },
  {
    id: 12,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "o",
    address: "Address",
  },
  {
    id: 13,
    first_name: "ABC",
    last_name: "Last",
    email: "abc@gmail.com",
    phone: "988745510",
    dob: "2021-02-14",
    gender: "m",
    address: "Address",
  },
]);

const totalUsers = users.value.length;

const displayGender = (gender) => {
  if (gender === "m") {
    return "Male";
  } else if (gender === "f") {
    return "Female";
  } else {
    return "Others";
  }
};

const paginatedUsers = ref(users.value.slice(0, 10));

const handlePageChange = (page) => {
  const max = page === 1 ? 10 : 13;
  paginatedUsers.value = users.value.slice((page - 1) * 10, max);
};

const isDialogOpen = ref(false);
const userToDelete = ref(null);

const openDialog = (userId) => {
  userToDelete.value = userId;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  userToDelete.value = null;
};

const deleteUser = () => {
  console.log("User deleted ", userToDelete.value);
  isDialogOpen.value = false;
  paginatedUsers.value = paginatedUsers.value.filter(
    (u) => u.id !== userToDelete.value
  );
  userToDelete.value = null;
  toast.success("User Deleted");
};
</script>

<template>
  <div class="py-8 px-12">
    <span class="mb-6 flex justify-between">
      <p class="text-2xl font-semibold">Users</p>
      <router-link to="/users/add"
        ><Button class="text-base py-6 bg-green-700 hover:bg-green-800">
          Add User <Plus class="ml-1 w-[20px] h-[20px]" /> </Button
      ></router-link>
    </span>
    <Table>
      <TableHeader class="text-base">
        <TableRow>
          <TableHead class=""> ID </TableHead>
          <TableHead class="cell-min-width"> First Name </TableHead>
          <TableHead class="cell-min-width"> Last Name </TableHead>
          <TableHead class="cell-min-width"> Email </TableHead>
          <TableHead class="cell-min-width"> Phone </TableHead>
          <TableHead class="cell-min-width"> DOB </TableHead>
          <TableHead class="cell-min-width"> Gender </TableHead>
          <TableHead class="cell-min-width"> Address </TableHead>
          <TableHead class="cell-min-width"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in paginatedUsers" :key="user.id">
          <TableCell class="font-medium">
            {{ user.id }}
          </TableCell>
          <TableCell>{{ user.first_name }}</TableCell>
          <TableCell>{{ user.last_name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.phone }}</TableCell>
          <TableCell>{{ user.dob }}</TableCell>
          <TableCell>{{ displayGender(user.gender) }}</TableCell>
          <TableCell>{{ user.address }}</TableCell>
          <TableCell>
            <router-link to="/users/edit"
              ><Button class="mb-2 xl:mb-0 bg-blue-800 hover:bg-blue-900 mr-2"
                >Edit</Button
              ></router-link
            >
            <Dialog
              :open="isDialogOpen && userToDelete === user.id"
              :modal="true"
            >
              <DialogTrigger as-child>
                <Button
                  class="bg-red-700 hover:bg-red-800"
                  @click="openDialog(user.id)"
                  >Delete</Button
                > </DialogTrigger
              ><DialogContent class="sm:max-w-md p-8">
                <DialogHeader>
                  <DialogTitle class="my-4">
                    Are you sure you want to delete the user?
                  </DialogTitle>
                  <DialogDescription />
                </DialogHeader>
                <DialogFooter class="sm:justify-start">
                  <DialogClose as-child>
                    <Button
                      type="button"
                      variant="secondary"
                      @click="closeDialog"
                    >
                      No
                    </Button>
                    <Button type="button" @click="deleteUser"> Yes </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      v-slot="{ page }"
      :total="totalUsers"
      :itemsPerPage="10"
      :sibling-count="1"
      show-edges
      :default-page="1"
    >
      <PaginationList
        v-slot="{ items }"
        class="flex justify-center items-center gap-1 my-8"
      >
        <PaginationPrev @click="handlePageChange(page - 1)" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              @click="handlePageChange(item.value)"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="handlePageChange(page + 1)" />
      </PaginationList>
    </Pagination>
  </div>
</template>

<style scoped>
.cell-min-width {
  min-width: 120px;
}
</style>
