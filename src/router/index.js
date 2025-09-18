import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/auth/Login.vue'
import PropertyList from '@/views/property/PropertyList.vue'
import PropertyForm from '@/views/property/PropertyForm.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/login', component: Login },
  { path: '/properties', component: PropertyList },
  { path: '/properties/new', component: PropertyForm, props: { mode: 'create' } },
  { path: '/properties/:id', component: PropertyForm, props: route => ({ mode: 'edit', id: route.params.id }) },
  { path: '/', redirect: '/properties' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.path !== '/login' && !auth.isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

export default router

// import { createRouter, createWebHistory } from 'vue-router'
// import Login from '@/views/auth/Login.vue'
// import PropertyList from '@/views/property/PropertyList.vue'
// import PropertyForm from '@/views/property/PropertyForm.vue'

// const routes = [
//   { path: '/login', name: 'Login', component: Login },
//   { path: '/properties', name: 'PropertyList', component: PropertyList },
//   { path: '/properties/new', name: 'PropertyCreate', component: PropertyForm, props: { mode: 'create' } },
//   { path: '/properties/:id', name: 'PropertyEdit', component: PropertyForm, props: route => ({ id: route.params.id, mode: 'edit' }) },
//   { path: '/', redirect: '/properties' },
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// })

// export default router
