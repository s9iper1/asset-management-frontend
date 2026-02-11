<template>
  <div
    class="d-flex flex-wrap gap-2 mb-4 bg-white p-3 rounded-3 shadow-sm justify-content-between"
  >
    <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
      <AppButton
        variant="primary"
        size="md"
        class="gap-2"
        @click="$router.push('/properties')"
      >
        <img src="/public/back-icon.png" alt="back" />
        Back to list
      </AppButton>
    </div>
    <div class="d-flex flex-wrap gap-2">
      <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
        <AppButton variant="light" size="md">Property detail</AppButton>
        <AppButton variant="pill" size="md">Price evalutation</AppButton>
      </div>
      <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
        <AppButton variant="pill" size="md">Sell by your self</AppButton>
        <AppButton variant="pill" size="md">Talk to Realestate</AppButton>
      </div>
      <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
        <AppButton variant="pill" size="md">Get Advice by AI</AppButton>
      </div>
    </div>
    <div class="d-flex gap-2 flex-grow-1 flex-md-grow-0">
      <AppButton variant="outline" size="md" @click="editProperty"
        >Edit proprty</AppButton
      >
    </div>
  </div>
</template>

<script setup>
import AppButton from "@/components/shared/AppButton.vue";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const editProperty = () => {
  router.push(`/edit-propertyview/${route.params.id}`);
};
</script>
