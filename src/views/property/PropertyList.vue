<template>
  <div class="property-page container">
    <!-- Top Notifications -->
    <TopNotifications />

    <!-- TOP FILTERS -->
    <TopFilters class="mb-4" />

    <!-- LOADING STATE -->
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner :size="40" />
    </div>

    <!-- ERROR -->
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- EMPTY STATE -->
    <div
      v-if="!loading && properties.length === 0"
      class="text-center py-5 text-muted"
    >
      No properties found.
    </div>

    <!-- PROPERTY LIST -->
    <div class="property-list">
      <PropertyCard
        v-for="p in properties"
        :key="p.id"
        :property="p"
        :uploading="uploading[p.id]"
        @upload="onUpload"
        @price="openPriceMap"
        @sell="openSellFlow"
        @estate="openRealEstate"
        @share="shareProperty"
      />
    </div>

    <!-- PAGINATION -->
    <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
      <Pagination v-model="page" :total="totalPages" />
    </div>

    <!-- FOOTER -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import api from "@/api/client";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import TopFilters from "@/components/shared/TopFilters.vue";
import Pagination from "@/components/shared/Pagination.vue";
// import FooterDesktop from "@/components/shared/FooterDesktop.vue";

import PropertyCard from "@/components/property/PropertyCard.vue";
import TopNotifications from "@/components/shared/TopNotifications.vue";

const properties = ref([]);
const loading = ref(false);
const error = ref("");

const uploading = ref({});

/* PAGINATION */
const page = ref(1);
const pageSize = 10;
const totalPages = ref(1);

/* Fetch properties */
async function fetchProperties() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get("/api/properties/", {
      params: { page: page.value, page_size: pageSize },
    });

    // If backend isn't paginated yet:
    properties.value = data.results || data;
    totalPages.value = data.total_pages || 1;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load properties";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProperties);

/* Auto-refresh when page changes */
watch(page, fetchProperties);

/* Image upload handler */
async function onUpload({ id, file }) {
  const formData = new FormData();
  formData.append("image", file);

  uploading.value = { ...uploading.value, [id]: true };

  try {
    await api.patch(`/api/properties/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    fetchProperties();
  } catch (err) {
    console.error("Upload failed", err);
  } finally {
    uploading.value = { ...uploading.value, [id]: false };
  }
}

/* ACTION HANDLERS */
function openPriceMap(id) {
  alert("Open price map for property " + id);
}
function openSellFlow(id) {
  alert("Sell it yourself: " + id);
}
function openRealEstate(id) {
  alert("Real estate service clicked for " + id);
}
function shareProperty(id) {
  navigator.share
    ? navigator.share({ url: window.location.href })
    : alert("Share clicked for property " + id);
}
</script>

<style scoped>
.property-page {
  /* Using a light background for the page body helps
     the white cards pop, just like in the screenshot */
  background-color: #faf9f3;
  min-height: 100vh;
  padding: 20px 40px;
}

.property-list {
  display: flex;
  flex-direction: column;
  /* 24px gap between cards as seen in the desktop view */
  gap: 24px;
}

/* .container {
  max-width: 1200px;
} */

/* Mobile adjustments to match the vertical stack screenshot */
@media (max-width: 768px) {
  .property-page {
    padding: 20px 10px;
  }
  .property-list {
    gap: 16px;
  }
}
</style>
