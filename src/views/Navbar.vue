<script setup>
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "../stores/user";

const role_id = useUserStore().user.role_id;

const isAdmin = () => {
  return role_id === 1;
};

const isArtist = () => {
  return role_id === 3;
};
</script>

<template>
  <NavigationMenu class="max-w-none justify-end p-3 bg-[#628ec3] min-h-[70px]">
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/home"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
          >Home</NavigationMenuLink
        >
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          v-if="isAdmin()"
          href="/users"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
          >Users</NavigationMenuLink
        >
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          v-if="!isArtist()"
          href="/artists"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
        >
          Artists
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          v-if="isArtist()"
          href="/songs"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
        >
          Songs
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="nav-menu-items"
          href="/logout"
          :class="navigationMenuTriggerStyle()"
        >
          Logout
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style scoped>
.nav-menu-items {
  color: white;
  background-color: transparent;
  font-size: 18px;
}
</style>
