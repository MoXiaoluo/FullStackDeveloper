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
    <div class="flex pt-2 menu-height">
      <section class="w-[200px]">
        <div class="flex justify-center menu-height">
          <Menu :model="items" />
        </div>
      </section>
      <section class="px-4">Content</section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/image.webp";
import { ref } from "vue";
import Menu from "primevue/menu";

const items = ref([
  {
    items: [
      {
        label: "Home",
        icon: "pi pi-home",
      },
      {
        label: "Dashboard",
        icon: "pi pi-search",
      },
    ],
  },
]);
</script>

<style scoped>
.menu-height {
  height: calc(100vh - 70px);
}
</style>
