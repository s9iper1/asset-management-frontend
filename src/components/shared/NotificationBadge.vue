<template>
  <div class="notif-box d-flex align-items-center gap-2">
    <span class="label"><slot /></span>
    <span class="count">{{ count }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  count: { type: Number, required: true }
})
</script>

<style scoped>
.notif-box {
  border: 1px solid #e8e6df;
  padding: 6px 12px;
  border-radius: 10px;
  background: white;
}

.label {
  font-weight: 600;
}

.count {
  background: #e8f6f4;
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
