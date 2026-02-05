<template>
  <div class="actions d-flex gap-2 flex-wrap">
    <AppButton variant="pill" @click="$emit('price')">Price map</AppButton>
    <AppButton variant="outline" @click="$emit('sell')">Sell it yourself</AppButton>
    <AppButton variant="warn" @click="$emit('estate')">Real estate</AppButton>
  </div>
</template>

<script setup>
import AppButton from '../shared/AppButton.vue'
</script>
