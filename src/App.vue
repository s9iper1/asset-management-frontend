<template>
  <div class="layout p-3">
    <!-- <Navbar /> -->
    <top-nav-bar v-if="userLogin?.name" />
    <div style="overflow-y: auto"><router-view /></div>
    <app-footer v-if="userLogin?.name" />
  </div>
</template>

<script setup>
// import Navbar from '@/components/Navbar.vue'
import TopNavBar from "@/components/TopNavBar.vue";
import AppFooter from "@/components/shared/AppFooter.vue";
import { useAuthStore } from "./stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();

const userLogin = computed(() => authStore.getLoginUserInfo);
</script>
<style>
.layout {
  background: #faf9f3 !important;
  /* overflow: hidden; */
  min-height: 100vh !important;
}
</style>
