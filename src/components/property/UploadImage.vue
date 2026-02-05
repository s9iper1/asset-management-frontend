<template>
  <div class="img-wrapper position-relative">
    <!-- Clickable image with Bootstrap data attributes -->
    <img
      :src="src"
      class="image"
      data-bs-toggle="modal"
      :data-bs-target="'#imageModal-' + propertyId"
    />
    <!-- Hover upload (desktop) -->
    <button class="upload-btn d-none d-lg-block" @click="triggerUpload">
      Upload a photo
    </button>
    <!-- Mobile upload -->
    <button class="mobile-btn d-lg-none" @click="triggerUpload">
      <i class="fas fa-camera"></i>
    </button>
    <input
      ref="fileInput"
      type="file"
      class="d-none"
      accept="image/*"
      @change="onFile"
    />
    <div v-if="loading" class="loader-overlay">
      <LoadingSpinner />
    </div>

    <!-- Beautiful Bootstrap Modal -->
    <div
      class="modal fade"
      :id="'imageModal-' + propertyId"
      tabindex="-1"
      data-bs-backdrop="true"
      data-bs-keyboard="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content bg-transparent border-0 shadow-lg">
          <!-- Stylish close button -->
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

          <!-- Image container with dark background -->
          <div class="modal-body p-0">
            <div class="image-viewer-container">
              <img :src="src" class="modal-image" alt="Property Image" />
            </div>

            <!-- Optional bottom gradient overlay with hint text -->
            <div class="bottom-hint">
              <small class="text-white-50">
                <i class="fas fa-info-circle me-1"></i>
                Click outside or press ESC to close
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LoadingSpinner from "../LoadingSpinner.vue";

const props = defineProps({
  src: String,
  loading: Boolean,
  propertyId: Number,
});

const emit = defineEmits(["upload"]);

const fileInput = ref(null);

function triggerUpload(e) {
  e.stopPropagation();
  fileInput.value.click();
}

function onFile(e) {
  emit("upload", e.target.files[0]);
}
</script>

<style scoped>
.img-wrapper {
  width: 100%;
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.image:hover {
  transform: scale(1.05);
}

.upload-btn {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  background: #008080;
  color: white;
  border: none;
  text-wrap: nowrap;
  border-radius: 10px;
  padding: 4px 10px;
  opacity: 0;
  transition: 0.2s ease;
  z-index: 10;
}

.img-wrapper:hover .upload-btn {
  opacity: 1;
}

.mobile-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  background: white;
  color: #008080;
  border: none;
  padding: 8px 15px;
  z-index: 10;
}

.loader-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
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
  max-height: 85vh;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.modal-image:hover {
  transform: scale(1.02);
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

/* Backdrop enhancement */
:deep(.modal-backdrop) {
  background-color: rgba(0, 0, 0, 0.85);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .image-viewer-container {
    padding: 1rem;
    min-height: 300px;
  }

  .modal-image {
    max-height: 70vh;
  }

  .bottom-hint {
    bottom: 1rem;
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
  }
}
</style>
