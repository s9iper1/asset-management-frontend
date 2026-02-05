<template>
  <div class="card property-card shadow-sm border-0">
    <div class="row g-0 h-100">
      <div class="col-12 col-xl-3 col-lg-4 p-3">
        <div class="image-wrapper h-100">
          <UploadImage
            :src="imageUrl"
            :loading="uploading"
            :propertyId="property.id"
            @upload="(file) => $emit('upload', { id: property.id, file })"
            class="property-image"
          />
        </div>
      </div>

      <div class="col-12 col-xl-9 col-lg-8 p-3 ps-lg-0 py-lg-4 pe-lg-4">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div>
            <h2 class="property-title mb-2">
              {{ property.title }} – {{ property.address }}
            </h2>

            <div class="info-grid mb-2">
              <div class="info-item">
                <label>Type</label>
                <span>{{ property.property_type }}</span>
              </div>
              <div class="info-item">
                <label>Ownership</label>
                <span>Verified</span>
              </div>
              <div class="info-item">
                <label>Location</label>
                <span>{{ property.address_short || property.address }}</span>
              </div>
              <div class="info-item">
                <label>Area</label>
                <span>{{ property.area || "—" }} m²</span>
              </div>
              <div class="info-item text-lg-end">
                <label>My price</label>
                <span>{{ formattedPrice }}</span>
              </div>
            </div>
          </div>

          <div class="stats-container border rounded-3 p-2 mb-3">
            <div class="row align-items-center justify-between gy-2">
              <div class="col-12 col-lg-9 d-flex flex-column">
                <div class="stats-label me-3">Stats:</div>
                <div class="d-flex flex-wrap gap-2">
                  <span class="stat-pill"
                    >Documents: {{ property.images?.length || 0 }}</span
                  >
                  <span class="stat-pill">Co-owners: 0</span>
                  <span class="stat-pill">Alerts: 1</span>
                  <span class="stat-pill"
                    >Last Update: {{ formatDate(property.updated_at) }}</span
                  >
                </div>
              </div>
              <div class="col-12 col-lg-3 d-flex flex-column align-items-end">
                <div class="stats-label me-1">Current Stats:</div>
                <div class="d-flex flex-wrap gap-2">
                  <span class="status-value">Pending agent replies</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="d-flex flex-column flex-xl-row align-items-lg-center justify-content-between gap-3"
          >
            <!-- MAIN ACTIONS -->
            <div class="d-flex gap-3 main-actions order-2 order-xl-1">
              <router-link
                :to="`/properties/${property.id}`"
                class="btn btn-primary-teal px-4 fw-bold"
              >
                View Details
              </router-link>
              <button
                class="btn btn-outline-teal px-4 fw-bold"
                @click="$emit('share')"
              >
                Share
              </button>
            </div>

            <!-- QUICK ACTIONS -->
            <div
              class="d-flex align-items-center gap-3 quick-actions-wrapper order-1 order-xl-2"
            >
              <span class="stats-label d-none d-xl-inline">Quick actions</span>

              <div class="d-flex bottom-btn gap-2 w-100 w-md-auto">
                <div class="position-relative flex-grow-1 flex-md-grow-0">
                  <div class="badge-float d-none d-xl-block">First step</div>
                  <button
                    class="btn btn-action w-100 w-md-auto"
                    @click="$emit('price')"
                  >
                    Price map
                  </button>
                </div>

                <button
                  class="btn btn-action flex-grow-1 flex-md-grow-0"
                  @click="$emit('sell')"
                >
                  Sell it yourself
                </button>

                <button
                  class="btn btn-action flex-grow-1 flex-md-grow-0"
                  @click="$emit('estate')"
                >
                  Real estate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UploadImage from "./UploadImage.vue";

const props = defineProps({
  property: { type: Object, required: true },
  uploading: { type: Boolean, default: false },
});

defineEmits(["upload", "share", "price", "sell", "estate"]);

const MEDIA_BASE =
  import.meta.env.VITE_API_MEDIA_BASE_URL || "http://localhost:8000/media/";

const imageUrl = computed(() => {
  if (!props.property.image) return "/placeholder.jpg"; // Replace with your placeholder logic
  if (props.property.image.startsWith("http")) return props.property.image;
  return MEDIA_BASE + props.property.image;
});

const formattedPrice = computed(() => {
  const n = Number(props.property.price);
  if (isNaN(n)) return "—";
  // Creates space format: 6 200 000
  return n.toLocaleString("cs-CZ").replace(/\./g, " ") + " Kč";
});

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
</script>

<style scoped>
/* --- Core Layout & Card --- */
.property-card {
  background-color: #ffffff;
  border-radius: 16px; /* Matches the rounded-4 look */
  overflow: visible; /* Allows badge to float if needed, though handled relatively */
}

/* --- Typography --- */
.property-title {
  color: #1e7b85; /* Specific Teal from image */
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
}

label {
  display: block;
  font-size: 0.75rem;
  color: #b0b9ba; /* Light gray for labels */
  margin-bottom: 2px;
  font-weight: 400;
}

span,
button {
  font-family: inherit;
}

/* --- Image Section --- */
.image-wrapper {
  overflow: hidden;
  border-radius: 12px;
  background-color: #f3f4f6;
  min-height: 200px;
  max-height: 240px;
}

:deep(.property-image) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* --- Info Grid --- */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Desktop: 5 columns roughly equal, Price at end */
@media (min-width: 992px) {
  .info-grid {
    grid-template-columns: 1fr 1fr 1.5fr 1fr 1.5fr;
    gap: 0;
  }
}

.info-item span {
  font-size: 0.95rem;
  color: #202020; /* Dark almost black */
  font-weight: 700;
}

/* --- Stats Bar --- */
.stats-container {
  border-color: #e1e9ea !important; /* Tailwind gray-200 equivalent */
}

.stats-label {
  font-size: 0.8rem;
  color: #b0b9ba; /* Very light gray */
}

.stat-pill {
  background-color: #f7f6f2; /* Light gray bg */
  color: #202020;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
}

.status-value {
  font-weight: 600;
  color: #111827;
  font-size: 0.9rem;
}

.status-label-mobile {
  display: none;
}
@media (max-width: 991px) {
  .status-label-mobile {
    display: inline-block;
    margin-right: 8px;
  }
}

/* --- Buttons & Actions --- */
.btn-primary-teal {
  background-color: #1e7b85;
  border: 1px solid #1e7b85;
  color: white;
  border-radius: 8px;
  padding: 8px 24px;
  transition: all 0.2s;
}
.btn-primary-teal:hover {
  background-color: #165f67;
  color: white;
}

.btn-outline-teal {
  background-color: transparent;
  border: 1px solid #1c8089;
  color: #1c8089;
  border-radius: 8px;
  padding: 8px 24px;
}
.btn-outline-teal:hover {
  background-color: #f0fdfa;
  color: #202020;
}

/* Quick Action Buttons (The 3 on the right) */
.btn-action {
  /* background-color: white; */
  border: 1px solid #1c8089; /* Using teal border based on image */
  color: #202020;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 8px;
  white-space: nowrap;
}
.btn-action:hover {
  background-color: #f9fafb;
}

/* --- Badge Float --- */
.badge-float {
  position: absolute;
  top: -10px; /* Pulls it up outside the button */
  left: 60%;
  transform: translateX(-50%);
  background-color: #f5e9c9; /* Light yellow/beige */
  color: #202020; /* Dark amber text */
  font-size: 0.65rem;
  font-weight: 500;
  padding: 1px 8px;
  border-radius: 20px;
  white-space: nowrap;
  z-index: 2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* --- Responsive Adjustments --- */
@media (max-width: 768px) {
  .main-actions {
    width: 100%;
  }
  .main-actions .btn {
    flex: 1;
  }

  .quick-actions-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .quick-actions-wrapper .d-flex {
    justify-content: space-between;
  }

  .btn-action {
    flex: 1;
    padding: 6px 4px;
    font-size: 0.75rem;
  }
}
</style>
