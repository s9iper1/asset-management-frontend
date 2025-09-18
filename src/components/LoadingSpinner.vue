<template>
  <div
    class="d-flex justify-content-center align-items-center"
    :class="{ 'w-100 h-100': full }"
  >
    <div
      class="spinner-border"
      :class="[`text-${color}`, { 'spinner-border-sm': small }]"
      :style="customSize"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'primary' }, // Bootstrap color
  small: { type: Boolean, default: false },    // Use smaller spinner
  size: { type: Number, default: null },       // Custom size in px
  full: { type: Boolean, default: false },     // Stretch container (useful for overlays)
})

const customSize = computed(() =>
  props.size ? { width: `${props.size}px`, height: `${props.size}px` } : {}
)
</script>
