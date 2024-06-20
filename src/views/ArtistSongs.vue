<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import { ref, onMounted, defineProps } from "vue";
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
import { useRoute } from "vue-router";
import { axiosInstance } from "../axios/axios";
import { useUserStore } from "../stores/user";

const route = useRoute();
const toast = useToast();
const role_id = useUserStore().user.role_id;

const props = defineProps({
  details: {
    type: {
      type: String,
      required: true,
    },
  },
});

const songs = ref([]);

let artistId = "";

const isDialogOpen = ref(false);
const songToDelete = ref(null);

const isArtist = () => {
  return role_id === 3;
};

const fetchData = async () => {
  try {
    const response = artistId
      ? await axiosInstance.get(`/artists/${artistId}/music`)
      : await axiosInstance.get(`/musics`);
    songs.value = response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
};

const openDialog = (songId) => {
  songToDelete.value = songId;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  songToDelete.value = null;
};

const deleteSong = async () => {
  console.log("Song deleted ", songToDelete.value);
  isDialogOpen.value = false;
  try {
    await axiosInstance.delete(`/musics/${songToDelete.value}`);
    songs.value = songs.value.filter((u) => u.id !== songToDelete.value);

    toast.success("Song Deleted");
  } catch (error) {
    console.error("Error deleting:", error);
    if (error.response) {
      if (typeof error.response.data.error === "string")
        toast.error(error.response.data.error);
      else toast.error(error.response.data.error[0]);
    } else toast.error(error.message);
  }
  songToDelete.value = null;
};

onMounted(() => {
  if (props.details.type === "artist") {
    artistId = route.params.id;
  }
  fetchData();
});
</script>

<template>
  <div class="py-8 px-12">
    <span class="mb-6 flex justify-between">
      <p class="text-2xl font-semibold">Songs</p>
      <router-link v-if="isArtist()" :to="`songs/add`"
        ><Button class="text-base py-6 bg-green-700 hover:bg-green-800">
          Add Song <Plus class="ml-1 w-[20px] h-[20px]" /> </Button
      ></router-link>
    </span>
    <Table>
      <TableHeader class="text-base">
        <TableRow>
          <TableHead class=""> ID </TableHead>
          <TableHead class="cell-min-width"> Title </TableHead>
          <TableHead class="cell-min-width"> Album</TableHead>
          <TableHead class="cell-min-width"> Genre </TableHead>
          <TableHead class="cell-min-width"> Artist ID </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="songs.length" v-for="song in songs" :key="song.id">
          <TableCell class="font-medium">
            {{ song.id }}
          </TableCell>
          <TableCell>{{ song.title }}</TableCell>
          <TableCell>{{ song.album_name }}</TableCell>
          <TableCell>{{ song.genre }}</TableCell>
          <TableCell>{{ song.artist_id }}</TableCell>

          <TableCell>
            <router-link v-if="isArtist()" :to="`/songs/${song.id}/edit`"
              ><Button class="mb-2 xl:mb-0 bg-blue-800 hover:bg-blue-900 mr-2"
                >Edit</Button
              ></router-link
            >
            <Dialog
              v-if="isArtist()"
              :open="isDialogOpen && songToDelete === song.id"
              :modal="true"
            >
              <DialogTrigger as-child>
                <Button
                  class="bg-red-700 hover:bg-red-800"
                  @click="openDialog(song.id)"
                  >Delete</Button
                > </DialogTrigger
              ><DialogContent class="sm:max-w-md p-8">
                <DialogHeader>
                  <DialogTitle class="my-4">
                    Are you sure you want to delete the song?
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
                    <Button type="button" @click="deleteSong"> Yes </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
        <TableRow v-else class="my-6 text-lg font-medium"
          ><TableCell colspan="4"
            >Oops! No songs for the artist</TableCell
          ></TableRow
        >
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
.cell-min-width {
  min-width: 120px;
}
</style>
