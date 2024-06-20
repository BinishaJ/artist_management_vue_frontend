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
import {
  Plus,
  Music2,
  CloudUpload,
  CloudDownload,
  Download,
  Upload,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "vue-toastification";
import { axiosInstance } from "../axios/axios";

import { saveAs } from "file-saver";

const toast = useToast();

const artists = ref([]);
const totalArtists = ref(null);
const isDialogOpen = ref(false);
const artistToDelete = ref(null);
const isImportOpen = ref(false);

const file = ref(null);
const fileEmpty = ref(false);

const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/artists");
    artists.value = response.data.data;
    totalArtists.value = response.data.total;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

const displayGender = (gender) => {
  if (gender === "m") {
    return "Male";
  } else if (gender === "f") {
    return "Female";
  } else {
    return "Others";
  }
};

const handlePageChange = async (page) => {
  const response = await axiosInstance.get(`/artists?page=${page}`);
  artists.value = response.data.data;
};

const openDialog = (artistId) => {
  artistToDelete.value = artistId;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  artistToDelete.value = null;
};

const openImportDialog = () => {
  isImportOpen.value = true;
};

const closeImportDialog = () => {
  isImportOpen.value = false;
  file.value = null;
  fileEmpty.value = false;
};

const deleteArtist = async () => {
  console.log("Artist deleted ", artistToDelete.value);
  isDialogOpen.value = false;
  try {
    await axiosInstance.delete(`/artists/${artistToDelete.value}`);
    artists.value = artists.value.filter((u) => u.id !== artistToDelete.value);

    toast.success("Artist Deleted");
  } catch (error) {
    console.error("Error deleting:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
  artistToDelete.value = null;
};

const onFileChange = (event) => {
  console.log(event);
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    file.value = selectedFile;
    fileEmpty.value = false;
  } else {
    file.value = null;
    fileEmpty.value = true;
  }
};

const handleUpload = async () => {
  if (!file.value) {
    fileEmpty.value = true;
    return;
  }
  const formData = new FormData();
  formData.append("file", file.value);

  try {
    const response = await axiosInstance.post("/csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload successful:", response.data);
    toast.success("Upload Successful");
    closeImportDialog();
    fetchData();
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

const handleExport = async () => {
  try {
    const response = await axiosInstance.get("/csv.csv");
    console.log(response.data);
    const blob = new Blob([response.data], { type: "text/csv" });

    saveAs(blob, "artists.csv");
  } catch (error) {
    console.error("Error exporting:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="py-8 px-12">
    <span class="mb-6 flex justify-between">
      <p class="text-2xl font-semibold">Artists</p>
      <div>
        <router-link to="/artists/add" class="mr-4">
          <Button class="text-base py-6 bg-green-700 hover:bg-green-800">
            Add Artist <Plus class="ml-1 w-[20px] h-[20px]" />
          </Button>
        </router-link>

        <DropdownMenu>
          <DropdownMenuTrigger
            ><Button class="text-base py-6 bg-pink-700 hover:bg-pink-800">
              CSV <CloudDownload class="ml-2 w-[20px] h-[20px]" /> </Button
          ></DropdownMenuTrigger>
          <DropdownMenuContent class="p-2">
            <Dialog :open="isImportOpen" :modal="true">
              <DialogTrigger as-child>
                <div
                  class="flex text-base p-2 hover:cursor-pointer hover:bg-slate-100"
                  @click="openImportDialog"
                >
                  Import<Download
                    class="ml-3 w-[20px] h-[20px]"
                  /></div></DialogTrigger
              ><DialogContent class="sm:max-w-md p-8">
                <DialogHeader>
                  <DialogTitle class="my-4"> Import File </DialogTitle>
                  <DialogDescription />
                  <Label
                    class="flex justify-center items-center rounded-xl border-dashed border-blue-700 border-[1px] h-[200px] mb-4"
                  >
                    <CloudUpload class="text-blue-800 w-1/3 h-1/4 opacity-70" />
                  </Label>
                  <Input
                    type="file"
                    accept="text/csv"
                    class="text-sm"
                    required
                    @change="onFileChange"
                  />
                  <p
                    v-if="fileEmpty"
                    class="text-red-500 self-end font-base my-2"
                  >
                    Upload a file!
                  </p>
                </DialogHeader>
                <DialogFooter class="sm:justify-end">
                  <DialogClose as-child>
                    <Button
                      type="button"
                      variant="secondary"
                      @click="closeImportDialog"
                    >
                      Cancel
                    </Button>
                    <Button type="button" @click="handleUpload">
                      Upload
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenuItem
              class="text-base py-2 hover:cursor-pointer"
              @click="handleExport"
            >
              Export<Upload class="ml-3 w-[20px] h-[20px]" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </span>
    <Table>
      <TableHeader class="text-base">
        <TableRow>
          <TableHead class=""> ID </TableHead>
          <TableHead class="cell-min-width"> Name </TableHead>
          <TableHead class="cell-min-width"> DOB </TableHead>
          <TableHead class="cell-min-width"> Gender </TableHead>
          <TableHead class="cell-min-width"> Address </TableHead>
          <TableHead class="cell-min-width"> First Release Year </TableHead>
          <TableHead class="cell-min-width"> Albums Released </TableHead>
          <TableHead class="cell-min-width"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="artist in artists" :key="artist.id">
          <TableCell class="font-medium">
            {{ artist.id }}
          </TableCell>
          <TableCell>{{ artist.name }}</TableCell>
          <TableCell>{{ artist.dob }}</TableCell>
          <TableCell>{{ displayGender(artist.gender) }}</TableCell>
          <TableCell>{{ artist.address }}</TableCell>
          <TableCell>{{ artist.first_release_year }}</TableCell>
          <TableCell>{{ artist.no_of_albums_released }}</TableCell>
          <TableCell>
            <RouterLink :to="`/artists/${artist.id}/songs`" class="align-middle"
              ><Button
                type="button"
                class="mb-2 xl:mb-0 mr-2 bg-[#5f9ea0] hover:bg-[#498183]"
              >
                <Music2 stroke-width="3" class="text-[yellow]" />
              </Button>
            </RouterLink>
            <router-link :to="`/artists/${artist.id}/edit`"
              ><Button class="mb-2 xl:mb-0 bg-blue-800 hover:bg-blue-900 mr-2"
                >Edit</Button
              ></router-link
            >
            <Dialog
              :open="isDialogOpen && artistToDelete === artist.id"
              :modal="true"
            >
              <DialogTrigger as-child>
                <Button
                  class="bg-red-700 hover:bg-red-800"
                  @click="openDialog(artist.id)"
                  >Delete</Button
                > </DialogTrigger
              ><DialogContent class="sm:max-w-md p-8">
                <DialogHeader>
                  <DialogTitle class="my-4">
                    Are you sure you want to delete the artist?
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
                    <Button type="button" @click="deleteArtist"> Yes </Button>
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
      :total="totalArtists"
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
