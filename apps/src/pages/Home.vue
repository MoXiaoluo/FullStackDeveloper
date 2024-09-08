<template>
  <div class="p-2">
    <section class="w-full h-14 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <img :src="logo" class="w-[50px] h-[50px]" />
        <span>Full Stack Developer</span>
      </div>
      <div>
        <router-link to="/logout">Logout</router-link>
      </div>
    </section>
    <div class="flex h-screen pt-2">
      <section class="w-[200px]">
        <div class="card flex justify-center">
          <Menu :model="items" />
        </div>
      </section>
      <section>Content</section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/image.webp";
import { ref } from "vue";
import Menu from "primevue/menu";

const items = ref([
  {
    label: "Documents",
    items: [
      {
        label: "New",
        icon: "pi pi-plus",
      },
      {
        label: "Search",
        icon: "pi pi-search",
      },
    ],
  },
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
      },
    ],
  },
]);
</script>

<style scoped></style>
