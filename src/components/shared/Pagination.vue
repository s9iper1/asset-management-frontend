<template>
  <div class="pagination-wrapper d-flex gap-2 mt-4">

    <button class="page-btn" @click="goTo(1)">First page</button>

    <button
      v-for="p in pages"
      :key="p"
      class="page-num"
      :class="{ active: p === modelValue }"
      @click="goTo(p)"
    >
      {{ p }}
    </button>

    <button class="page-btn" @click="goTo(total)">Last page</button>

  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
  total: Number,
})

const emit = defineEmits(['update:modelValue'])

const pages = computed(() => {
  // Example: always show ±2 pages
  const start = Math.max(1, props.modelValue - 2)
  const end = Math.min(props.total, props.modelValue + 2)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

function goTo(p){
  emit('update:modelValue', p)
}
</script>

<style scoped>
.page-btn {
  padding: 8px 14px;
  border-radius: 12px;
  background: #f6f5f2;
  border: 1px solid #e9e7e2;
  font-weight: 600;
}

.page-num {
  padding: 8px 14px;
  border-radius: 12px;
  border: 1px solid #dfddd7;
  background: white;
  font-weight: 700;
}

.page-num.active {
  background: #0f7b73;
  color: white;
  border-color: #0f7b73;
}
</style>
