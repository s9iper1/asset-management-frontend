<template>
  <div
    class="d-flex flex-wrap gap-2 mb-4 bg-white p-3 rounded-3 shadow-sm justify-content-between"
  >
    <div class="d-flex flex-wrap gap-2">
      <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
        <AppButton variant="pill" size="md">My properties</AppButton>
        <AppButton variant="pill" size="md">End Date</AppButton>
      </div>
      <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
        <AppButton variant="pill" size="md">Fair-Price Check</AppButton>
        <AppButton variant="pill" size="md">AI Advisor</AppButton>
      </div>
    </div>
    <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
      <AppButton variant="primary" size="md">Add new</AppButton>
      <AppButton variant="outline" size="md">Customize View</AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from "../shared/AppButton.vue";
</script>
