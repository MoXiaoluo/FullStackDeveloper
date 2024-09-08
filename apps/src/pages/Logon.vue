<template>
  <div class="flex items-center justify-center h-screen flex-col">
    <div class="p-4 rounded border-[1px] border-solid border-black w-1/3">
      <h1 class="text-center">Full Stack Developer</h1>
      <div class="p-2"></div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <InputText v-model="username" placeholder="Username" />
      </InputGroup>
      <div class="p-2"></div>
      <InputGroup>
        <Password
          v-model="password"
          :feedback="false"
          toggle-mask
          placeholder="Password"
        />
      </InputGroup>
      <div class="flex justify-between mt-3">
        <Button label="Sign In" class="p-button-outlined" @click="logon" />
        <Button label="Sing Up" class="p-button-outlined" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "PrimeVue/button";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Password from "primevue/password";

import { ref } from "vue";
import { logonApi } from "@/apis/logon";
import { useTokenStore } from "@/stores/useTokenStore";
import router from "@/routers/router";

const username = ref("");
const password = ref("");

const logon = async () => {
  const userInfo = {
    username: username.value,
    password: password.value,
  };
  const { data } = await logonApi(userInfo);
  console.log(data);
  const { setToken } = useTokenStore();
  setToken(data.access_token);
  router.push("/");
};
</script>

<style></style>
