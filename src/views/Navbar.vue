<script setup>
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
        <!-- <router-link to="/home" class="nav-menu-items">Home</router-link> -->
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/users"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
          >Users</NavigationMenuLink
        >
        <!-- <router-link to="/users" class="nav-menu-items">Users</router-link> -->
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/artists"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
        >
          Artists
        </NavigationMenuLink>
        <!-- <router-link to="/artists" class="nav-menu-items">Artists</router-link> -->
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          class="nav-menu-items"
          href="/"
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
