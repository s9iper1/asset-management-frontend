<template>
  <div class="container py-4">
    <!-- Header with title + add button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">Real estate</h4>
      <router-link to="/properties/new" class="btn btn-sm btn-outline-secondary">
        + New
      </router-link>
    </div>

    <!-- Properties list -->
    <div class="row">
      <div
        v-for="property in properties"
        :key="property.id"
        class="col-12 mb-3"
      >
        <div class="card shadow-sm p-3 mb-3">
          <div class="row">
            <!-- 1. Image -->
            <div class="col-auto">
              <div
                class="property-image-wrapper d-flex align-items-center justify-content-center bg-light rounded position-relative"
                style="width: 142px; height: 142px; overflow: hidden;"
              >
                <!-- Image preview -->
                <img
                  v-if="property.image && !uploading[property.id]"
                  :src="property.image"
                  class="img-fluid rounded"
                  style="object-fit: cover; width: 100%; height: 100%;"
                  alt="Property"
                />

                <!-- Upload button (overlay) -->
                <button
                  class="upload-overlay-btn btn btn-outline-light btn-sm"
                  @click="$refs[`fileInput-${property.id}`][0].click()"
                >
                  Upload a photo
                </button>
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  :ref="`fileInput-${property.id}`"
                  class="d-none"
                  @change="e => handleFileUpload(e, property.id)"
                />

                <!-- Spinner overlay -->
                <div
                  v-if="uploading[property.id]"
                  class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded"
                >
                  <LoadingSpinner />
                </div>
              </div>
            </div>

            <!-- 2. Info -->
            <div class="col-5">
              <h6 class="mb-1 fw-bold">{{ property.title || '—' }}</h6>
              <p class="mb-1">{{ property.address || '—' }}</p>
              <p class="mb-1">Type: {{ property.property_type }}</p>
              <p class="mb-1">My price: {{ property.price || '—' }}</p>

              <!-- Static buttons row -->
              <div class="mt-2 d-flex gap-2">
                <button class="btn btn-sm btn-primary">Real estate</button>
                <button class="btn btn-sm btn-outline-secondary">Sell it yourself</button>
                <button class="btn btn-sm btn-success">Price map</button>
              </div>
            </div>

            <!-- 3. Area -->
            <div class="col d-flex align-items-center">
              <p class="text-muted mb-0">Area: —</p>
            </div>

            <!-- 4. Detail -->
            <div class="col-auto d-flex flex-column align-items-end">
              <router-link
                :to="`/properties/${property.id}`"
                class="btn btn-sm btn-dark"
              >
                Detail
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading / error states -->
    <div v-if="loading" class="text-center py-5">
      <LoadingSpinner :size="40" />
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/client'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const properties = ref([])
const loading = ref(false)
const error = ref('')
const uploading = ref({}) // track upload status per property

// Fetch all properties
async function fetchProperties() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.get('/api/properties/')
    properties.value = data
  } catch (err) {
    error.value = 'Failed to load properties'
  } finally {
    loading.value = false
  }
}

// Upload image for a property
async function handleFileUpload(event, propertyId) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  // mark uploading
  uploading.value = { ...uploading.value, [propertyId]: true }

  try {
    await api.patch(`/api/properties/${propertyId}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    await fetchProperties() // reload list
  } catch (err) {
    console.error('Upload failed', err)
    error.value = 'Failed to upload image'
  } finally {
    uploading.value = { ...uploading.value, [propertyId]: false }
  }
}

onMounted(fetchProperties)
</script>

<style scoped>
.property-image-wrapper .upload-overlay-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap; /* prevent text from wrapping */
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.property-image-wrapper:hover .upload-overlay-btn {
  opacity: 1;
}
</style>