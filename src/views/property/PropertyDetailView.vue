<template>
  <div>
    <!-- <TopFilters /> -->
    <PropertyDetailFilter />
    <PropertyInfo :id="route.params.id" />
    <PropertyContactInfo :id="route.params.id" />
    <PropertyCommunicationInfo />
  </div>
</template>

<script setup>
// import TopFilters from "../../components/shared/TopFilters.vue";
import PropertyCommunicationInfo from "./components/PropertyCommunicationInfo.vue";
import PropertyContactInfo from "./components/PropertyContactInfo.vue";
import PropertyDetailFilter from "./components/PropertyDetailFilter.vue";
import PropertyInfo from "./components/PropertyInfo.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
