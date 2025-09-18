<template>
  <nav class="navbar navbar-light bg-white shadow-sm px-3">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- Left: Logo / Title -->
      <router-link to="/properties" class="navbar-brand d-flex align-items-center gap-2">
        <span style="font-size: 1.2rem;">🏠</span>
        <span class="fw-bold">Real estate</span>
      </router-link>

      <!-- Right: Navigation buttons -->
      <div class="d-flex gap-2">
        <router-link to="/properties" class="btn btn-dark">List</router-link>

        <!-- Logout button (only if logged in) -->
        <button
          v-if="authStore.isAuthenticated()"
          class="btn btn-outline-danger"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  border-bottom: 1px solid #eee;
}
</style>
