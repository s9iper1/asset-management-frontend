<template>
  <div class="container py-4">
    <!-- Header row -->
    <div class="d-flex justify-content-between align-items-end mb-3 w-100">
      <!-- Left side: image + title + buttons -->
      <div class="d-flex align-items-start gap-3">
        <!-- Primary image upload (edit mode) -->
        <div v-if="mode === 'edit'">
          <div
            class="property-image-wrapper d-flex align-items-center justify-content-center bg-light rounded"
            style="width: 142px; height: 142px; position: relative; overflow: hidden;"
          >
            <!-- Image -->
            <img
              v-if="form.image_url && !uploading"
              :src="form.image_url"
              class="img-fluid rounded"
              style="object-fit: cover; width: 100%; height: 100%;"
              alt="Property"
            />

            <!-- Overlay button (visible only on hover) -->
            <div
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25"
              style="cursor: pointer;"
              @click="$refs.imageInput.click()"
            >
              <button class="upload-overlay-btn btn btn-outline-light btn-sm">
                Upload a photo
              </button>
              <input
                ref="imageInput"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                class="d-none"
                @change="handleFileUpload"
              />
            </div>

            <!-- Spinner -->
            <div
              v-if="uploading"
              class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded"
            >
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Uploading...</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Title + buttons stacked -->
        <div class="d-flex flex-column gap-2 align-self-end">
          <h4 class="mb-2">
            <span v-if="mode === 'create'">New property</span>
            <span v-else>Property Detail #{{ id }}</span>
          </h4>

          <!-- Address (edit mode only) -->
          <p v-if="mode === 'edit'" class="text-muted mb-2">
            {{ form.address || 'No address set' }}
          </p>

          <!-- Buttons row (edit mode only) -->
          <div v-if="mode === 'edit'" class="d-flex gap-2">
            <button class="btn btn btn-primary">Real estate</button>
            <button class="btn btn btn-outline-secondary">Sell it yourself</button>
            <button class="btn btn btn-success">Price map</button>
          </div>
        </div>
      </div>

      <!-- Right side: back button -->
      <router-link
        v-if="mode === 'edit'"
        to="/properties"
        class="btn btn-outline-secondary"
      >
        Back to list
      </router-link>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit">
      <div class="row g-3">
        <!-- Title -->
        <div class="col-12">
          <label class="form-label">Title</label>
          <input v-model="form.title" type="text" class="form-control" placeholder="Title" required />
        </div>

        <!-- Address + Type -->
        <div class="col-md-6">
          <label class="form-label">Address</label>
          <input v-model="form.address" type="text" class="form-control" placeholder="Street, city" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Type</label>
          <select v-model="form.property_type" class="form-select" required>
            <option disabled value="">— select —</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Purchase date + Price -->
        <div class="col-md-6">
          <label class="form-label">Purchase date</label>
          <input v-model="form.purchase_date" type="date" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label">My price (CZK)</label>
          <input
            v-model="displayPrice"
            type="text"
            inputmode="numeric"
            class="form-control"
            placeholder="e.g. 3 200 000"
          />
        </div>
      </div>

      <!-- Contractual relationship -->
      <fieldset class="form-group-box my-4">
        <legend>Contractual relationship</legend>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Contract type</label>
            <select v-model="form.contract_type" class="form-select">
              <option value="none">no</option>
              <option value="rent">rent</option>
              <option value="lease">lease</option>
              <option value="mortgage">mortgage</option>
              <option value="other">other</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Since when</label>
            <input v-model="form.available_from" type="date" class="form-control" />
          </div>
          <div class="col-md-12">
            <label class="form-label">Conditions</label>
            <input v-model="form.conditions" type="text" class="form-control" placeholder="e.g. Payment quarterly" />
          </div>
          <div class="col-md-12">
            <label class="form-label">Contact</label>
            <input v-model="form.contact" type="text" class="form-control" placeholder="Name / Company" />
          </div>
        </div>
      </fieldset>

      <!-- Location -->
      <fieldset class="form-group-box my-4">
        <legend>Location</legend>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">GPS lat</label>
            <input v-model="form.latitude" type="number" step="0.000001" class="form-control" />
          </div>
          <div class="col-md-6">
            <label class="form-label">GPS lng</label>
            <input v-model="form.longitude" type="number" step="0.000001" class="form-control" />
          </div>
        </div>
      </fieldset>

      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">Comment</label>
          <textarea v-model="form.comment" class="form-control" rows="2"></textarea>
        </div>
        <div class="col-md-6">
          <label class="form-label">Story</label>
          <textarea v-model="form.story" class="form-control" rows="2"></textarea>
        </div>
      </div>

      <!-- Primary image (create mode) -->
      <div v-if="mode === 'create'" class="mb-3">
        <label class="form-label">Primary Image</label>
        <input
          ref="imageInput"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          class="form-control"
          @change="handleFileUpload"
        />
      </div>

      <!-- Gallery images (edit mode only) -->
      <div class="my-4">
        <h5>Gallery images</h5>
        <vue3-dropzone
          id="property-gallery-dropzone"
          v-model="galleryFiles"
          v-model:previews="galleryPreviews"
          :multiple="true"
          accept="image/jpeg,image/png,image/webp"
          :maxFiles="10"
          :maxFileSize="10"
          :showSelectButton="false"
          @error="handleGalleryError"
          @update:previews="syncRemovedImages"
          selectFileStrategy="merge"
          mode="edit"
          imgWidth="150px"
          imgHeight="150px"
        >
        </vue3-dropzone>

        <!-- Preview newly added files -->
        <div class="row mt-3 gap-2">
          <!-- Primary image preview -->
          <div
            v-if="form.image_url"
            class="col-auto mb-3"
            style="cursor: pointer;"
            @click="showLightbox(0)"
          >
            <img
              :src="form.image_url"
              alt="Primary"
              class="img-fluid rounded border"
              style="object-fit: cover; width: 120px; height: 120px;"
            />
          </div>

          <!-- Gallery images -->
          <div
            v-for="(img, index) in form.images"
            :key="img.id"
            class="col-auto mb-3"
            style="cursor: pointer;"
            @click="showLightbox(index + 1)"
          >
            <img
              :src="fullImageUrl(img.image)"
              alt="Gallery"
              class="img-fluid rounded border"
              style="object-fit: cover; width: 120px; height: 120px;"
            />
          </div>
        </div>
        <vue-easy-lightbox
          :visible="lightboxVisible"
          :imgs="[form.image_url, ...form.images.map(img => fullImageUrl(img.image))].filter(Boolean)"
          :index="lightboxIndex"
          @hide="lightboxVisible = false"
        />
      </div>

      <div class="mt-4 d-flex gap-2">
        <button class="btn btn-success" :disabled="loading">
          {{ mode === 'create' ? 'Save' : 'Save changes' }}
        </button>
        <router-link to="/properties" class="btn btn-outline-secondary">Back to list</router-link>
      </div>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import api from '@/api/client'
import Vue3Dropzone from '@/lib/vue3-dropzone/src/index.js'
import '@/lib/vue3-dropzone/src/style.css'
import VueEasyLightbox from 'vue-easy-lightbox'

const props = defineProps({
  mode: { type: String, required: true },
  id: { type: String, default: null },
})

const components = { VueEasyLightbox }

const form = reactive({
  address: '',
  property_type: '',
  purchase_date: '',
  price: '',
  contract_type: 'none',
  available_from: '',
  conditions: '',
  contact: '',
  latitude: '',
  longitude: '',
  comment: '',
  story: '',
  image_url: null,
  images: [],
})

const loading = ref(false)
const error = ref('')
const selectedFile = ref(null)
const uploading = ref(false)

const MEDIA_BASE = import.meta.env.VITE_API_MEDIA_BASE_URL || 'http://localhost:8000/media/'

const galleryFiles = ref([])
const galleryPreviews = ref([])
const existingImages = ref([])
const removedImages = ref([])

const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

function showLightbox(index) {
  console.log('Show lightbox at index', index)
  lightboxIndex.value = index
  lightboxVisible.value = true
}

// format price with spaces
function formatPrice(value) {
  if (value === null || value === undefined || value === '') return ''
  const num = Number(String(value).replace(/\s/g, ''))
  if (isNaN(num)) return value
  return num.toLocaleString('fr-FR') // spaces as thousand separators
}

const displayPrice = computed({
  get() {
    return formatPrice(form.price)
  },
  set(val) {
    const raw = val.replace(/\s/g, '')
    form.price = raw
  }
})

function fullImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${MEDIA_BASE}${path}`
}

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    form.image_url = URL.createObjectURL(file)
  }
}

function handleGalleryError(files) {
  error.value = `Some files were rejected: ${files.map(f => f.name).join(', ')}`
}

function syncRemovedImages(newPreviews) {
  // find which existing images are gone
  const removed = existingImages.value.filter(
    img => !newPreviews.includes(img.url)
  )

  for (const r of removed) {
    if (!removedImages.value.includes(r.id)) {
      removedImages.value.push(r.id)
    }
  }

  // also update galleryPreviews manually
  galleryPreviews.value = newPreviews
}

async function uploadGalleryImages(propertyId) {
  if (!galleryFiles.value.length) return
  for (const { file } of galleryFiles.value) {
    const fd = new FormData()
    fd.append('property', propertyId)
    fd.append('image', file)
    await api.post('/api/properties/property-images/', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  galleryFiles.value = []
}

async function loadProperty() {
  if (props.mode === 'edit' && props.id) {
    try {
      const { data } = await api.get(`/api/properties/${props.id}/`)
      Object.assign(form, data)
      form.image_url = data.image ? fullImageUrl(data.image) : null
      existingImages.value = data.images.map(img => ({
        id: img.id,
        url: fullImageUrl(img.image),
      }))
      galleryPreviews.value = existingImages.value.map(img => img.url)
    } catch {
      error.value = 'Failed to load property'
    }
  }
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  try {
    const fd = new FormData()
    for (const [key, value] of Object.entries(form)) {
      // Skip image_url completely
      if (key === 'image_url') continue

      // Also skip image if it's just a URL string
      if (key === 'image' && typeof value === 'string') continue

      if (value !== null && value !== '') {
        fd.append(key, value)
      }
    }
    if (selectedFile.value) {
      fd.append('image', selectedFile.value)
    }

    let propertyId = props.id
    if (props.mode === 'create') {
      const { data } = await api.post('/api/properties/', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      propertyId = data.id
    } else {
      await api.put(`/api/properties/${props.id}/`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }

    await uploadGalleryImages(propertyId)
    for (const id of removedImages.value) {
      await api.delete(`/api/properties/property-images/${id}/`)
    }
    window.location.href = '/properties'
  } catch {
    error.value = 'Failed to save property'
  } finally {
    loading.value = false
    uploading.value = false
  }
}

onMounted(loadProperty)
</script>

<style scoped>
.form-group-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.5rem 1rem 1rem;
  position: relative;
  margin-top: 1.5rem;
}

.form-group-box legend {
  width: auto;
  font-size: 0.9rem;
  padding: 0 6px;
  margin: 0;
  position: absolute;
  top: -0.7rem;
  left: 1rem;
  background: #fff;
}

.property-image-wrapper .upload-overlay-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.property-image-wrapper:hover .upload-overlay-btn {
  opacity: 1;
}
</style>
