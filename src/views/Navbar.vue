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
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/users"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
          >Users</NavigationMenuLink
        >
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/artists"
          class="nav-menu-items"
          :class="navigationMenuTriggerStyle()"
        >
          Artists
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
