import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore(
  "token",
  () => {
    const token = ref("");
    function setToken(value: string) {
      token.value = value;
    }

    function getToken() {
      return token.value;
    }

    return { setToken, getToken };
  },
  {
    persist: {
      storage: localStorage,
    },
  }
);
