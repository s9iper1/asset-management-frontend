<template>
  <div class="container-fluid mt-3">
    <div class="row g-4">
      <!-- Main Content -->
      <div class="col-12">
        <!-- Header Card -->
        <div class="card shadow-sm border-0 rounded-4 mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <!-- Left side: image + title + buttons -->
              <div class="d-flex align-items-start gap-3">
                <!-- Primary image upload (edit mode) -->
                <div v-if="mode === 'edit'">
                  <div
                    class="property-image-wrapper d-flex align-items-center justify-content-center bg-light rounded-3"
                    style="
                      width: 142px;
                      height: 142px;
                      position: relative;
                      overflow: hidden;
                    "
                  >
                    <!-- Image -->
                    <img
                      v-if="form.image_url && !uploading"
                      :src="form.image_url"
                      class="img-fluid rounded-3"
                      style="object-fit: cover; width: 100%; height: 100%"
                      alt="Property"
                    />

                    <!-- Overlay button (visible only on hover) -->
                    <div
                      class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25"
                      style="cursor: pointer"
                      @click="$refs.imageInput.click()"
                    >
                      <button
                        class="upload-overlay-btn btn btn-outline-light btn-sm rounded-3"
                      >
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
                      class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded-3"
                    >
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Uploading...</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Title + buttons stacked -->
                <div class="d-flex flex-column gap-2 align-self-end">
                  <h4 class="mb-2 fw-semibold">
                    <span v-if="mode === 'create'">New property</span>
                    <span v-else>Property Detail #{{ id }}</span>
                  </h4>

                  <!-- Address (edit mode only) -->
                  <p v-if="mode === 'edit'" class="text-muted mb-2">
                    {{ form.address || "No address set" }}
                  </p>

                  <!-- Buttons row (edit mode only) -->
                  <div v-if="mode === 'edit'" class="d-flex gap-2">
                    <button
                      class="btn btn-primary px-4 py-2 rounded-3 fw-semibold"
                    >
                      Real estate
                    </button>
                    <button
                      class="btn btn-light px-4 py-2 rounded-3 fw-semibold"
                    >
                      Sell it yourself
                    </button>
                    <button
                      class="btn btn-success px-4 py-2 rounded-3 fw-semibold"
                    >
                      Price map
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right side: back button -->
              <router-link
                v-if="mode === 'edit'"
                to="/properties"
                class="btn btn-outline-primary px-4 py-2 rounded-3 fw-semibold"
              >
                Back to list
              </router-link>
            </div>
          </div>
        </div>

        <!-- Form Card -->
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <form @submit.prevent="handleSubmit">
              <!-- Basic Information -->
              <div class="row g-3 mb-4">
                <!-- Title -->
                <div class="col-12">
                  <label class="form-label text-secondary small mb-2"
                    >Title</label
                  >
                  <div class="input-group border rounded-3">
                    <input
                      v-model="form.title"
                      type="text"
                      class="form-control border-0"
                      placeholder="Enter property title"
                      required
                    />
                  </div>
                </div>

                <!-- Address + Type -->
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >Address</label
                  >
                  <div class="input-group border rounded-3">
                    <input
                      v-model="form.address"
                      type="text"
                      class="form-control border-0"
                      placeholder="Street, city"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >Type</label
                  >
                  <div class="input-group border rounded-3">
                    <select
                      v-model="form.property_type"
                      class="form-select border-0"
                      required
                    >
                      <option disabled value="">— select —</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <!-- Purchase date + Price -->
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >Purchase date</label
                  >
                  <div class="input-group border rounded-3">
                    <input
                      v-model="form.purchase_date"
                      type="date"
                      class="form-control border-0"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >My price</label
                  >
                  <div class="input-group border rounded-3">
                    <span class="input-group-text bg-light border-0 text-muted"
                      >CZK</span
                    >
                    <input
                      v-model="displayPrice"
                      type="text"
                      inputmode="numeric"
                      class="form-control border-0"
                      placeholder="e.g. 3 200 000"
                    />
                  </div>
                </div>
              </div>

              <hr class="my-4" />

              <!-- Contractual relationship -->
              <fieldset class="form-group-box mb-4">
                <legend class="fw-semibold">Contractual relationship</legend>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label text-secondary small mb-2"
                      >Contract type</label
                    >
                    <div class="input-group border rounded-3">
                      <select
                        v-model="form.contract_type"
                        class="form-select border-0"
                      >
                        <option value="none">no</option>
                        <option value="rent">rent</option>
                        <option value="lease">lease</option>
                        <option value="mortgage">mortgage</option>
                        <option value="other">other</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-secondary small mb-2"
                      >Since when</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        v-model="form.available_from"
                        type="date"
                        class="form-control border-0"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label text-secondary small mb-2"
                      >Conditions</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        v-model="form.conditions"
                        type="text"
                        class="form-control border-0"
                        placeholder="e.g. Payment quarterly"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <label class="form-label text-secondary small mb-2"
                      >Contact</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        v-model="form.contact"
                        type="text"
                        class="form-control border-0"
                        placeholder="Name / Company"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <hr class="my-4" />

              <!-- Location -->
              <fieldset class="form-group-box mb-4">
                <legend class="fw-semibold">Location</legend>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label text-secondary small mb-2"
                      >GPS lat</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        v-model="form.latitude"
                        type="number"
                        step="0.000001"
                        class="form-control border-0"
                        placeholder="Latitude"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-secondary small mb-2"
                      >GPS lng</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        v-model="form.longitude"
                        type="number"
                        step="0.000001"
                        class="form-control border-0"
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <hr class="my-4" />

              <!-- Comments -->
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >Comment</label
                  >
                  <textarea
                    v-model="form.comment"
                    class="form-control border rounded-3"
                    rows="3"
                    placeholder="Enter comment"
                  ></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-secondary small mb-2"
                    >Story</label
                  >
                  <textarea
                    v-model="form.story"
                    class="form-control border rounded-3"
                    rows="3"
                    placeholder="Enter story"
                  ></textarea>
                </div>
              </div>

              <!-- Primary image (create mode) -->
              <div v-if="mode === 'create'" class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Primary Image</label
                >
                <input
                  ref="imageInput"
                  type="file"
                  accept="image/jpeg, image/png, image/webp"
                  class="form-control border rounded-3"
                  @change="handleFileUpload"
                />
              </div>

              <!-- Gallery images (edit mode only) -->
              <div v-if="mode === 'edit'" class="mb-4">
                <h5 class="fw-semibold mb-3">Gallery images</h5>
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
                <div class="row mt-3 g-3">
                  <!-- Primary image preview -->
                  <div
                    v-if="form.image_url"
                    class="col-auto"
                    style="cursor: pointer"
                    @click="showLightbox(0)"
                  >
                    <div class="border rounded-3 p-2 bg-light">
                      <img
                        :src="form.image_url"
                        alt="Primary"
                        class="img-fluid rounded-2"
                        style="object-fit: cover; width: 120px; height: 120px"
                      />
                    </div>
                  </div>

                  <!-- Gallery images -->
                  <div
                    v-for="(img, index) in form.images"
                    :key="img.id"
                    class="col-auto"
                    style="cursor: pointer"
                    @click="showLightbox(index + 1)"
                  >
                    <div class="border rounded-3 p-2 bg-light">
                      <img
                        :src="fullImageUrl(img.image)"
                        alt="Gallery"
                        class="img-fluid rounded-2"
                        style="object-fit: cover; width: 120px; height: 120px"
                      />
                    </div>
                  </div>
                </div>
                <vue-easy-lightbox
                  :visible="lightboxVisible"
                  :imgs="
                    [
                      form.image_url,
                      ...form.images.map((img) => fullImageUrl(img.image)),
                    ].filter(Boolean)
                  "
                  :index="lightboxIndex"
                  @hide="lightboxVisible = false"
                />
              </div>

              <!-- Action Buttons -->
              <div class="row g-3 mt-4">
                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn btn-primary px-4 py-3 rounded-3 fw-semibold"
                    :disabled="loading"
                  >
                    {{ mode === "create" ? "Save Property" : "Save Changes" }}
                  </button>
                </div>
                <div class="col-auto">
                  <router-link
                    to="/properties"
                    class="btn btn-outline-primary px-4 py-3 rounded-3 fw-semibold"
                  >
                    Cancel
                  </router-link>
                </div>
              </div>
            </form>

            <!-- Error message -->
            <div v-if="error" class="alert alert-danger mt-3 rounded-3">
              {{ error }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import api from "@/api/client";
import Vue3Dropzone from "@/lib/vue3-dropzone/src/index.js";
import "@/lib/vue3-dropzone/src/style.css";
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps({
  mode: { type: String, required: true },
  id: { type: String, default: null },
});

const components = { VueEasyLightbox };

const form = reactive({
  title: "",
  address: "",
  property_type: "",
  purchase_date: "",
  price: "",
  contract_type: "none",
  available_from: "",
  conditions: "",
  contact: "",
  latitude: "",
  longitude: "",
  comment: "",
  story: "",
  image_url: null,
  images: [],
});

const loading = ref(false);
const error = ref("");
const selectedFile = ref(null);
const uploading = ref(false);

const MEDIA_BASE =
  import.meta.env.VITE_API_MEDIA_BASE_URL || "http://localhost:8000/media/";

const galleryFiles = ref([]);
const galleryPreviews = ref([]);
const existingImages = ref([]);
const removedImages = ref([]);

const lightboxVisible = ref(false);
const lightboxIndex = ref(0);

function showLightbox(index) {
  console.log("Show lightbox at index", index);
  lightboxIndex.value = index;
  lightboxVisible.value = true;
}

// format price with spaces
function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "";
  const num = Number(String(value).replace(/\s/g, ""));
  if (isNaN(num)) return value;
  return num.toLocaleString("fr-FR"); // spaces as thousand separators
}

const displayPrice = computed({
  get() {
    return formatPrice(form.price);
  },
  set(val) {
    const raw = val.replace(/\s/g, "");
    form.price = raw;
  },
});

function fullImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE}${path}`;
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    selectedFile.value = file;
    form.image_url = URL.createObjectURL(file);
  }
}

function handleGalleryError(files) {
  error.value = `Some files were rejected: ${files.map((f) => f.name).join(", ")}`;
}

function syncRemovedImages(newPreviews) {
  // find which existing images are gone
  const removed = existingImages.value.filter(
    (img) => !newPreviews.includes(img.url),
  );

  for (const r of removed) {
    if (!removedImages.value.includes(r.id)) {
      removedImages.value.push(r.id);
    }
  }

  // also update galleryPreviews manually
  galleryPreviews.value = newPreviews;
}

async function uploadGalleryImages(propertyId) {
  if (!galleryFiles.value.length) return;
  for (const { file } of galleryFiles.value) {
    const fd = new FormData();
    fd.append("property", propertyId);
    fd.append("image", file);
    await api.post("/api/properties/property-images/", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  galleryFiles.value = [];
}

async function loadProperty() {
  if (props.mode === "edit" && props.id) {
    try {
      const { data } = await api.get(`/api/properties/${props.id}/`);
      Object.assign(form, data);
      form.image_url = data.image ? fullImageUrl(data.image) : null;
      existingImages.value = data.images.map((img) => ({
        id: img.id,
        url: fullImageUrl(img.image),
      }));
      galleryPreviews.value = existingImages.value.map((img) => img.url);
    } catch {
      error.value = "Failed to load property";
    }
  }
}

async function handleSubmit() {
  loading.value = true;
  error.value = "";
  try {
    const fd = new FormData();
    for (const [key, value] of Object.entries(form)) {
      // Skip image_url completely
      if (key === "image_url") continue;

      // Also skip image if it's just a URL string
      if (key === "image" && typeof value === "string") continue;

      if (value !== null && value !== "") {
        fd.append(key, value);
      }
    }
    if (selectedFile.value) {
      fd.append("image", selectedFile.value);
    }

    let propertyId = props.id;
    if (props.mode === "create") {
      const { data } = await api.post("/api/properties/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      propertyId = data.id;
    } else {
      await api.put(`/api/properties/${props.id}/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    await uploadGalleryImages(propertyId);
    for (const id of removedImages.value) {
      await api.delete(`/api/properties/property-images/${id}/`);
    }
    window.location.href = "/properties";
  } catch {
    error.value = "Failed to save property";
  } finally {
    loading.value = false;
    uploading.value = false;
  }
}

onMounted(loadProperty);
</script>

<style scoped>
/* Custom card styling */
.card {
  border: none;
}

/* Custom shadow */
.shadow-sm {
  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7) !important;
}

/* Custom colors matching design */
.btn-primary {
  background-color: #1c8089;
  border-color: #1c8089;
}

.btn-primary:hover {
  background-color: #166d75;
  border-color: #166d75;
}

.btn-primary:disabled {
  background-color: #1c8089;
  border-color: #1c8089;
  opacity: 0.65;
}

.btn-outline-primary {
  color: #1c8089;
  border-color: #1c8089;
}

.btn-outline-primary:hover {
  background-color: #1c8089;
  border-color: #1c8089;
  color: #fff;
}

.btn-light {
  background-color: #f7f6f2;
  border-color: #f7f6f2;
  color: #202020;
}

.btn-light:hover {
  background-color: #e5e4df;
  border-color: #e5e4df;
  color: #202020;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}

.bg-light {
  background-color: #f7f6f2 !important;
}

/* Remove focus effects */
.form-control:focus,
.form-select:focus {
  border-color: #dee2e6;
  box-shadow: none;
  outline: none;
}

/* Custom border radius */
.rounded-4 {
  border-radius: 1rem !important;
}

/* Form group box styling */
.form-group-box {
  border: 1px solid #dee2e6;
  border-radius: 0.75rem;
  padding: 1.5rem 1rem 1rem;
  position: relative;
  margin-top: 1.5rem;
}

.form-group-box legend {
  width: auto;
  font-size: 0.95rem;
  padding: 0 8px;
  margin: 0;
  position: absolute;
  top: -0.7rem;
  left: 1rem;
  background: #fff;
  color: #202020;
}

/* Property image wrapper */
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

/* Input group styling */
.input-group-text {
  background-color: #f7f6f2;
  border: none;
  color: #6c757d;
}

/* Alert styling */
.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c2c7;
  color: #842029;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1.5rem !important;
  }

  .btn {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  h4 {
    font-size: 1.25rem;
  }
}

/* Better spacing for mobile */
@media (max-width: 576px) {
  .d-flex.gap-3 {
    gap: 0.75rem !important;
  }

  .btn {
    padding: 0.75rem !important;
    font-size: 0.9rem;
  }
}
</style>
