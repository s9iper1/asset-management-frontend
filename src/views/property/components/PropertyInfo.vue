<template>
  <div class="property-details-container">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger m-4">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else class="row g-4 bg-white rounded-5 shadow-sm px-3">
      <!-- Left Column - Property Photos -->
      <div class="col-lg-6">
        <div class="property-section sp-4 h-100">
          <h2 class="section-title text-primary mb-4">Property photos</h2>

          <!-- Main Large Image -->
          <div class="main-photo mb-3">
            <img
              :src="allImages[0] || placeholderImage"
              class="img-fluid rounded-4 w-100"
              alt="Property main photo"
              style="height: 400px; object-fit: cover; cursor: pointer"
              data-bs-toggle="modal"
              data-bs-target="#imageGalleryModal"
              @click="setCurrentImage(0)"
            />
          </div>

          <!-- Thumbnail Grid -->
          <div class="thumbnail-grid" v-if="allImages.length > 1">
            <div class="row g-3 mb-3">
              <div
                class="col-4"
                v-for="(img, index) in allImages.slice(1, 4)"
                :key="index"
              >
                <img
                  :src="img"
                  class="img-fluid rounded-3 w-100"
                  :alt="`Property thumbnail ${index + 1}`"
                  style="height: 120px; object-fit: cover; cursor: pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#imageGalleryModal"
                  @click="setCurrentImage(index + 1)"
                />
              </div>
            </div>
            <div class="row g-3" v-if="allImages.length > 4">
              <div
                class="col-4"
                v-for="(img, index) in allImages.slice(4, 7)"
                :key="index + 3"
              >
                <img
                  :src="img"
                  class="img-fluid rounded-3 w-100"
                  :alt="`Property thumbnail ${index + 4}`"
                  style="height: 120px; object-fit: cover; cursor: pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#imageGalleryModal"
                  @click="setCurrentImage(index + 4)"
                />
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div
            class="action-buttons d-flex align-items-center justify-content-between mt-4"
          >
            <button
              class="btn btn-outline-primary border-2 px-4 py-2 rounded-3"
            >
              <span class="fw-semibold">Upload more photos</span>
            </button>

            <div
              v-if="allImages.length > 0"
              class="d-flex align-items-center gap-2"
              style="cursor: pointer"
              data-bs-toggle="modal"
              data-bs-target="#imageGalleryModal"
              @click="setCurrentImage(0)"
            >
              <span class="show-all-photos fw-semibold text-dark"
                >Show all photos</span
              >
              <div
                class="photo-counter rounded-circle d-flex align-items-center justify-content-center"
              >
                <span class="text-white fw-semibold">{{ allImages.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Basic Information -->
      <div class="col-lg-6">
        <div class="property-section p-4 h-100">
          <h2 class="section-title text-primary mb-4">Basic information</h2>

          <!-- Property Title -->
          <div class="property-field mb-4">
            <div class="field-label text-secondary small mb-2">
              Property title
            </div>
            <div class="field-value fw-semibold fs-4 text-dark">
              {{ property.title || 'Untitled Property' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Address -->
          <div class="property-field mb-4">
            <div class="field-label text-secondary small mb-2">Address</div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ property.address || 'No address provided' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Type -->
          <div class="property-field mb-4">
            <div class="field-label text-secondary small mb-2">Type</div>
            <div class="field-value fw-semibold fs-5 text-dark text-capitalize">
              {{ property.property_type || 'Not specified' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Comment -->
          <div class="property-field mb-4" v-if="property.comment">
            <div class="field-label text-secondary small mb-2">Comment</div>
            <div class="field-value comment-text text-dark mb-2">
              {{ isCommentExpanded ? property.comment : truncatedComment }}
            </div>
            <button
              v-if="property.comment && property.comment.length > 150"
              class="btn-show-more btn-link text-dark p-0 border-0 text-decoration-underline"
              @click="toggleComment"
            >
              {{ isCommentExpanded ? "Show less" : "Show more" }}
            </button>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Story -->
          <div class="property-field mb-4" v-if="property.story">
            <div class="field-label text-secondary small mb-2">Story</div>
            <div class="field-value comment-text text-dark mb-2">
              {{ isStoryExpanded ? property.story : truncatedStory }}
            </div>
            <button
              v-if="property.story && property.story.length > 200"
              class="btn-show-more btn-link text-dark p-0 border-0 text-decoration-underline"
              @click="toggleStory"
            >
              {{ isStoryExpanded ? "Show less" : "Show more" }}
            </button>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Location -->
          <div class="property-field">
            <div class="field-label text-secondary small mb-3">Location</div>

            <div class="location-content row g-3">
              <!-- GPS Info -->
              <div class="col-md-6">
                <div class="gps-info">
                  <!-- GPS Latitude -->
                  <div class="gps-card bg-light rounded-3 p-3 mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div class="gps-label text-secondary small mb-1">
                          GPS lat
                        </div>
                        <div class="gps-value fw-semibold text-dark">
                          {{ property.latitude || 'Not set' }}
                        </div>
                      </div>
                      <i
                        v-if="property.latitude"
                        class="fas fa-copy text-secondary"
                        style="cursor: pointer"
                        @click="copyToClipboard(property.latitude)"
                      ></i>
                    </div>
                  </div>

                  <!-- GPS Longitude -->
                  <div class="gps-card bg-light rounded-3 p-3 mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div class="gps-label text-secondary small mb-1">
                          GPS lng
                        </div>
                        <div class="gps-value fw-semibold text-dark">
                          {{ property.longitude || 'Not set' }}
                        </div>
                      </div>
                      <i
                        v-if="property.longitude"
                        class="fas fa-copy text-secondary"
                        style="cursor: pointer"
                        @click="copyToClipboard(property.longitude)"
                      ></i>
                    </div>
                  </div>

                  <!-- Google Maps Button -->
                  <button
                    class="btn btn-outline-primary border-2 w-100 py-3 rounded-3"
                    :disabled="!property.latitude || !property.longitude"
                    @click="openGoogleMaps"
                  >
                    <span class="fw-semibold">Show on Google Maps</span>
                  </button>
                </div>
              </div>

              <!-- Map Preview -->
              <div class="col-md-6">
                <div class="map-preview rounded-3 overflow-hidden h-100">
                  <img
                    v-if="property.latitude && property.longitude"
                    :src="`https://maps.googleapis.com/maps/api/staticmap?center=${property.latitude},${property.longitude}&zoom=15&size=400x300&markers=color:red%7C${property.latitude},${property.longitude}&key=YOUR_API_KEY`"
                    class="img-fluid w-100 h-100"
                    alt="Map preview"
                    style="object-fit: cover; min-height: 200px"
                    @error="handleMapError"
                  />
                  <div
                    v-else
                    class="d-flex align-items-center justify-content-center bg-light h-100"
                    style="min-height: 200px"
                  >
                    <span class="text-muted">No location set</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Gallery Modal -->
    <div
      class="modal fade"
      id="imageGalleryModal"
      tabindex="-1"
      data-bs-backdrop="true"
      data-bs-keyboard="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-transparent border-0 shadow-lg">
          <!-- Close button -->
          <button
            type="button"
            class="btn-close btn-close-white position-absolute top-0 end-0 m-3 shadow-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="
              z-index: 1060;
              opacity: 1;
              background-color: rgba(255, 255, 255, 0.9);
              border-radius: 50%;
              width: 2.5rem;
              height: 2.5rem;
              padding: 0.75rem;
            "
          ></button>

          <!-- Image counter -->
          <div
            class="position-absolute top-0 start-0 m-3"
            style="z-index: 1060"
          >
            <div
              class="badge bg-dark bg-opacity-75 px-3 py-2"
              style="font-size: 14px"
            >
              {{ currentImageIndex + 1 }} / {{ allImages.length }}
            </div>
          </div>

          <!-- Modal body -->
          <div class="modal-body p-0">
            <div class="image-viewer-container position-relative">
              <!-- Previous button -->
              <button
                class="nav-button nav-button-prev position-absolute start-0 top-50 translate-middle-y ms-3"
                @click="previousImage"
                v-show="currentImageIndex > 0"
              >
                <i class="fas fa-chevron-left"></i>
              </button>

              <!-- Main image -->
              <img
                :src="allImages[currentImageIndex]"
                class="modal-image"
                alt="Property Image"
              />

              <!-- Next button -->
              <button
                class="nav-button nav-button-next position-absolute end-0 top-50 translate-middle-y me-3"
                @click="nextImage"
                v-show="currentImageIndex < allImages.length - 1"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>

            <!-- Thumbnail strip -->
            <div class="thumbnail-strip mt-3 px-4 pb-4">
              <div class="d-flex gap-2 justify-content-center flex-wrap">
                <div
                  v-for="(img, index) in allImages"
                  :key="index"
                  class="thumbnail-item"
                  :class="{ active: index === currentImageIndex }"
                  @click="currentImageIndex = index"
                >
                  <img :src="img" alt="Thumbnail" />
                </div>
              </div>
            </div>

            <!-- Bottom hint -->
            <div class="bottom-hint">
              <small class="text-white-50">
                <i class="fas fa-info-circle me-1"></i>
                Use arrow keys or click arrows to navigate • Click outside or
                press ESC to close
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import api from "@/api/client";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const MEDIA_BASE =
  import.meta.env.VITE_API_MEDIA_BASE_URL || "http://localhost:8000/media/";

const placeholderImage = "/images/placeholder-property.png";

// State
const property = ref({});
const loading = ref(true);
const error = ref("");

// Current image index in modal
const currentImageIndex = ref(0);

// Expand states
const isCommentExpanded = ref(false);
const isStoryExpanded = ref(false);

// Computed properties
const allImages = computed(() => {
  const images = [];

  // Add primary image first
  if (property.value.image) {
    images.push(fullImageUrl(property.value.image));
  }

  // Add gallery images
  if (property.value.images && Array.isArray(property.value.images)) {
    property.value.images.forEach((img) => {
      if (img.image) {
        images.push(fullImageUrl(img.image));
      }
    });
  }

  return images;
});

const truncatedComment = computed(() => {
  if (!property.value.comment) return "";
  if (property.value.comment.length <= 150) return property.value.comment;
  return property.value.comment.substring(0, 150) + "...";
});

const truncatedStory = computed(() => {
  if (!property.value.story) return "";
  if (property.value.story.length <= 200) return property.value.story;
  return property.value.story.substring(0, 200) + "...";
});

// Helper functions
function fullImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${MEDIA_BASE}${path}`;
}

// Toggle functions
const toggleComment = () => {
  isCommentExpanded.value = !isCommentExpanded.value;
};

const toggleStory = () => {
  isStoryExpanded.value = !isStoryExpanded.value;
};

// Set current image before opening modal
const setCurrentImage = (index) => {
  currentImageIndex.value = index;
};

// Navigate to previous image
const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

// Navigate to next image
const nextImage = () => {
  if (currentImageIndex.value < allImages.value.length - 1) {
    currentImageIndex.value++;
  }
};

// Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(String(text));
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

// Open Google Maps
const openGoogleMaps = () => {
  if (property.value.latitude && property.value.longitude) {
    window.open(
      `https://www.google.com/maps?q=${property.value.latitude},${property.value.longitude}`,
      "_blank"
    );
  }
};

// Handle map image error (fallback)
const handleMapError = (e) => {
  e.target.style.display = "none";
};

// Handle keyboard navigation
const handleKeydown = (e) => {
  const modalElement = document.getElementById("imageGalleryModal");
  if (modalElement && modalElement.classList.contains("show")) {
    if (e.key === "ArrowLeft") {
      previousImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  }
};

// Fetch property data
async function fetchProperty() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get(`/api/properties/${props.id}/`);
    property.value = data;
  } catch (err) {
    console.error("Failed to load property:", err);
    error.value = "Failed to load property details. Please try again.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchProperty();
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.property-details-container {
  padding: 20px;
}

.property-section {
  min-height: 100%;
}

.rounded-5 {
  border-radius: 20px !important;
}

.rounded-4 {
  border-radius: 16px !important;
}

.rounded-3 {
  border-radius: 12px !important;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #1c8089 !important;
  line-height: 32px;
}

.text-primary {
  color: #1c8089 !important;
}

/* Photo Counter */
.photo-counter {
  background: #1c8089;
  width: 18px;
  height: 18px;
  font-size: 10px;
}

.show-all-photos {
  font-size: 15px;
  line-height: 20px;
}

/* Property Fields */
.field-divider {
  border-color: #e1e9ea;
  border-width: 1px;
  margin: 0;
  opacity: 1;
}

.field-label {
  font-size: 12px;
  line-height: 20px;
}

.field-value {
  line-height: 20px;
}

.field-value.fs-4 {
  font-size: 26px !important;
}

.field-value.fs-5 {
  font-size: 18px !important;
}

/* Comment & Story Text */
.comment-text {
  font-size: 15px;
  line-height: 24px;
  font-weight: 400;
  text-align: justify;
}

.btn-show-more {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
  background: none;
}

.btn-show-more:hover {
  text-decoration: underline !important;
}

/* GPS Cards */
.gps-card {
  background-color: #f7f6f2 !important;
}

.gps-label {
  font-size: 12px;
  line-height: 20px;
}

.gps-value {
  font-size: 16px;
  line-height: 20px;
}

/* Buttons */
.btn-outline-primary {
  border-color: #1c8089 !important;
  color: #202020 !important;
  height: 55px;
  font-size: 15px;
  line-height: 20px;
}

.btn-outline-primary:hover {
  background-color: #1c8089 !important;
  color: white !important;
}

.btn-outline-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Map Preview */
.map-preview {
  height: 100%;
  min-height: 200px;
}

/* Modal styling */
.image-viewer-container {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.image-viewer-container::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(0, 128, 128, 0.1) 0%,
    transparent 70%
  );
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.modal-image {
  max-width: 100%;
  max-height: 70vh;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

/* Navigation buttons */
.nav-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1060;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.nav-button i {
  font-size: 20px;
  color: #1c8089;
}

/* Thumbnail strip */
.thumbnail-strip {
  max-height: 120px;
  overflow-x: auto;
  overflow-y: hidden;
}

.thumbnail-item {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.thumbnail-item.active {
  border-color: #1c8089;
  transform: scale(1.1);
}

.thumbnail-item:hover {
  border-color: rgba(28, 128, 137, 0.5);
  transform: scale(1.05);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bottom-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  z-index: 2;
}

/* Close button hover effect */
.btn-close:hover {
  transform: rotate(90deg) scale(1.1);
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 1) !important;
}

/* Responsive Design */
@media (max-width: 992px) {
  .property-details-container {
    padding: 15px;
  }

  .property-section {
    padding: 20px !important;
  }

  .main-photo img {
    height: 300px !important;
  }

  .thumbnail-grid .col-4 img {
    height: 100px !important;
  }

  .field-value.fs-4 {
    font-size: 22px !important;
  }

  .field-value.fs-5 {
    font-size: 16px !important;
  }
}

@media (max-width: 768px) {
  .property-details-container {
    padding: 10px;
  }

  .property-section {
    padding: 16px !important;
  }

  .section-title {
    font-size: 20px;
    line-height: 28px;
  }

  .main-photo img {
    height: 250px !important;
  }

  .thumbnail-grid .col-4 img {
    height: 80px !important;
  }

  .action-buttons {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start !important;
  }

  .btn-outline-primary {
    width: 100% !important;
  }

  .location-content {
    flex-direction: column;
  }

  .map-preview {
    min-height: 180px !important;
  }

  .modal-image {
    max-height: 60vh;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .nav-button i {
    font-size: 16px;
  }

  .thumbnail-item {
    width: 60px;
    height: 45px;
  }
}

@media (max-width: 576px) {
  .property-section {
    padding: 12px !important;
  }

  .main-photo img {
    height: 200px !important;
  }

  .thumbnail-grid .col-4 img {
    height: 70px !important;
  }

  .field-value.fs-4 {
    font-size: 18px !important;
  }

  .field-value.fs-5 {
    font-size: 14px !important;
  }

  .gps-value {
    font-size: 14px !important;
  }

  .btn-outline-primary {
    height: 45px !important;
    font-size: 14px !important;
  }

  .bottom-hint {
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
}
</style>
