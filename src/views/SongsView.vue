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
import { useRoute } from "vue-router";

const route = useRoute();
const toast = useToast();

const songs = ref([
  {
    id: 1,
    title: "Song 1",
    album_name: "Album 1",
    genre: "country",
  },
  {
    id: 2,
    title: "Song 1",
    album_name: "Album 1",
    genre: "rnb",
  },
  {
    id: 3,
    title: "Song 1",
    album_name: "Album 1",
    genre: "rock",
  },
  {
    id: 4,
    title: "Song 1",
    album_name: "Album 1",
    genre: "rock",
  },
  {
    id: 5,
    title: "Song 1",
    album_name: "Album 1",
    genre: "rock",
  },
  {
    id: 6,
    title: "Song 1",
    album_name: "Album 1",
    genre: "rock",
  },
]);

const artistId = route.params.id;

const isDialogOpen = ref(false);
const songToDelete = ref(null);

const openDialog = (songId) => {
  songToDelete.value = songId;
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  songToDelete.value = null;
};

const deleteSong = () => {
  console.log("Song deleted ", songToDelete.value);
  isDialogOpen.value = false;
  songs.value = songs.value.filter((u) => u.id !== songToDelete.value);
  songToDelete.value = null;
  toast.success("Song Deleted");
};
</script>

<template>
  <div class="py-8 px-12">
    <span class="mb-6 flex justify-between">
      <p class="text-2xl font-semibold">Songs</p>
      <router-link :to="`songs/add`"
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
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="song in songs" :key="song.id">
          <TableCell class="font-medium">
            {{ song.id }}
          </TableCell>
          <TableCell>{{ song.title }}</TableCell>
          <TableCell>{{ song.album_name }}</TableCell>
          <TableCell>{{ song.genre }}</TableCell>

          <TableCell>
            <router-link :to="`/artists/${artistId}/songs/${song.id}/edit`"
              ><Button class="mb-2 xl:mb-0 bg-blue-800 hover:bg-blue-900 mr-2"
                >Edit</Button
              ></router-link
            >
            <Dialog
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
      </TableBody>
    </Table>
  </div>
</template>

<style scoped>
.cell-min-width {
  min-width: 120px;
}
</style>
