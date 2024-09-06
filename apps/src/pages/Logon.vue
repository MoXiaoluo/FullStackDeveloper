<template>
  <div class="flex items-center justify-center h-screen flex-col">
    <div class="p-4 rounded border-[1px] border-solid border-black">
      <FloatLabel class="mt-3">
        <InputText id="username" v-model="username" size="large" />
        <label for="username">Username</label>
      </FloatLabel>
      <div class="p-2"></div>
      <FloatLabel>
        <Password
          v-model="password"
          inputId="password"
          toggle-mask
          size="large"
        />
        <label for="password">Password</label>
      </FloatLabel>
      <div class="flex justify-between mt-3">
        <Button label="Sign Up" class="p-button-outlined" />
        <Button label="Register" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "PrimeVue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";

import Password from "primevue/password";

import { ref } from "vue";

const username = ref("");
const password = ref("");
</script>

<style></style>
