<template>
  <div class="details">
    <div class="title">{{ title }}</div>

    <div class="meta">
      <span class="strong">{{ type }}</span>
      <span>• {{ ownership }}</span>
      <span>• {{ area }} m²</span>
    </div>

    <div class="location">{{ location }}</div>

    <div class="price">{{ price }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  type: String,
  ownership: String,
  area: Number,
  location: String,
  price: String
})
</script>

<style scoped>
.title { font-size:1.2rem; font-weight:700; color:var(--accent); }
.meta { color:var(--muted); margin-top:4px; display:flex; gap:6px; font-size:0.92rem; }
.meta .strong { font-weight:700; color:var(--text-primary); }
.location { margin-top:6px; color:var(--muted); }
.price { margin-top:12px; font-size:1.1rem; font-weight:700; }
</style>
