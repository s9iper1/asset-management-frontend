import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

// Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// Create app
const app = createApp(App)

// Pinia store
const pinia = createPinia()
app.use(pinia)

// Vue Router
app.use(router)

// Wait for authStore.init() before mounting
const authStore = useAuthStore()
authStore.init().finally(() => {
  app.mount('#app')
})
