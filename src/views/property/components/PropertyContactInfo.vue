<template>
  <div
    class="contract-details-container bg-white rounded-5 shadow-sm px-4 py-3 mb-3"
  >
    <!-- Header -->
    <div
      class="contract-header d-flex align-items-center justify-content-between"
    >
      <h2 class="contract-title text-primary mb-0">Contract details</h2>
      <div class="action-icon bg-light rounded-3 p-2">
        <a
          href="#contact-detail-collapse"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="contact-detail-collapse"
          @click="toggleIcon"
        >
          <i :class="iconClass"></i>
        </a>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border spinner-border-sm text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Contract Details Content -->
    <div v-else class="contract-content collapse" id="contact-detail-collapse">
      <!-- Two Column Layout for Details -->
      <div class="row g-4 mb-4">
        <!-- Left Column -->
        <div class="col-lg-6">
          <!-- Contract Type -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">
              Contract type
            </div>
            <div class="field-value fw-semibold fs-5 text-dark text-capitalize">
              {{ property.contract_type || 'Not specified' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Conditions -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">Conditions</div>
            <div class="field-value text-dark fs-6">
              {{ property.conditions || 'No conditions specified' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Address -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">Address</div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ property.address || 'No address provided' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Contact -->
          <div class="contract-field">
            <div class="field-label text-secondary small mb-2">Contact</div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ property.contact || 'No contact provided' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-lg-6">
          <!-- Owner Email -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">Owner Email</div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ property.owner_email || 'Not provided' }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Purchase Date -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">
              Purchase date
            </div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ formatDate(property.purchase_date) }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Available From -->
          <div class="contract-field mb-4">
            <div class="field-label text-secondary small mb-2">
              Available from
            </div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ formatDate(property.available_from) }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>

          <!-- Price -->
          <div class="contract-field">
            <div class="field-label text-secondary small mb-2">
              Price
            </div>
            <div class="field-value fw-semibold fs-5 text-dark">
              {{ formatPrice(property.price) }}
            </div>
            <hr class="field-divider mt-3 mb-0" />
          </div>
        </div>
      </div>

      <!-- Notification and Edit Button Section -->
      <div
        class="notification-section d-flex flex-column flex-md-row align-items-md-center justify-content-md-between mt-4"
      >
        <!-- Notification Checkbox -->
        <div class="notification-field mb-3 mb-md-0">
          <div class="field-label text-secondary small mb-2">Notification</div>
          <div class="form-check d-flex align-items-center gap-2">
            <input
              class="form-check-input custom-checkbox"
              type="checkbox"
              v-model="notificationEnabled"
              id="contractNotification"
            />
            <label
              class="form-check-label fw-semibold text-dark"
              for="contractNotification"
            >
              Notify me 1 month in advance before end of contract
            </label>
          </div>
        </div>

        <!-- Edit Button -->
        <button
          class="btn btn-outline-primary border-2 px-4 py-3 rounded-3 edit-btn"
          @click="$router.push(`/edit-property/${route.params.id}`)"
        >
          <span class="fw-semibold">Edit contract details</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Collapse } from "bootstrap";
import { useRoute } from "vue-router";
import api from "@/api/client";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

const route = useRoute();
const notificationEnabled = ref(true);
const isCollapsed = ref(true);
const iconClass = ref("fas fa-plus text-secondary");

// State
const property = ref({});
const loading = ref(true);

// Initialize Bootstrap Collapse
let collapseInstance = null;

// Format date helper
function formatDate(dateString) {
  if (!dateString) return 'Not set';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Format price helper
function formatPrice(price) {
  if (!price) return 'Not set';
  const num = Number(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

// Fetch property data
async function fetchProperty() {
  loading.value = true;
  try {
    const { data } = await api.get(`/api/properties/${props.id}/`);
    property.value = data;
  } catch (err) {
    console.error("Failed to load property:", err);
  } finally {
    loading.value = false;
    // Initialize collapse after loading is done and DOM is updated
    nextTick(() => {
      const collapseElement = document.getElementById("contact-detail-collapse");
      if (collapseElement) {
        collapseInstance = new Collapse(collapseElement, {
          toggle: false,
        });
        collapseInstance.hide();
      }
    });
  }
}

onMounted(() => {
  fetchProperty();
});

const toggleIcon = () => {
  isCollapsed.value = !isCollapsed.value;
  iconClass.value = isCollapsed.value
    ? "fas fa-plus text-secondary"
    : "fas fa-minus text-secondary";
};
</script>

<style scoped>
.contract-details-container {
  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7) !important;
}

.rounded-5 {
  border-radius: 20px !important;
}

.rounded-3 {
  border-radius: 12px !important;
}

/* Header */
.contract-title {
  font-size: 24px;
  font-weight: 600;
  color: #1c8089 !important;
  line-height: 32px;
}

.text-primary {
  color: #1c8089 !important;
}

.action-icon {
  background-color: #f7f6f2 !important;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-icon a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.action-icon i {
  font-size: 16px;
}

/* Fields */
.contract-field {
  min-height: 60px;
}

.field-divider {
  border-color: #e1e9ea;
  border-width: 1px;
  margin: 0;
  opacity: 1;
}

.field-label {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}

.field-value {
  line-height: 24px;
}

.field-value.fs-5 {
  font-size: 18px !important;
}

.field-value.fs-6 {
  font-size: 15px !important;
  line-height: 20px;
  font-weight: 400;
}

/* Notification Checkbox */
.custom-checkbox {
  width: 20px !important;
  height: 20px !important;
  border: 1.5px solid #e5d5ab !important;
  border-radius: 5px !important;
  cursor: pointer;
  position: relative;
  margin-top: 0;
}

.custom-checkbox:checked {
  background-color: #1c8089 !important;
  border-color: #1c8089 !important;
}

.custom-checkbox:checked::before {
  content: "✓";
  color: white;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-check-label {
  font-size: 15px;
  line-height: 20px;
  cursor: pointer;
}

/* Edit Button */
.edit-btn {
  border-color: #1c8089 !important;
  color: #202020 !important;
  height: 55px;
  font-size: 15px;
  line-height: 20px;
  min-width: 200px;
}

.edit-btn:hover {
  background-color: #1c8089 !important;
  color: white !important;
}

/* Responsive Design */
@media (max-width: 992px) {
  .contract-details-container {
    padding: 20px !important;
  }

  .contract-title {
    font-size: 20px;
    line-height: 28px;
  }

  .field-value.fs-5 {
    font-size: 16px !important;
  }

  .field-value.fs-6 {
    font-size: 14px !important;
  }

  .edit-btn {
    min-width: 180px;
    padding: 0.75rem 1.5rem !important;
  }
}

@media (max-width: 768px) {
  .contract-details-container {
    padding: 16px !important;
  }

  .contract-header {
    margin-bottom: 1.5rem !important;
  }

  .contract-title {
    font-size: 18px;
    line-height: 24px;
  }

  .action-icon {
    width: 36px;
    height: 36px;
  }

  .action-icon i {
    font-size: 14px;
  }

  .contract-field {
    min-height: 50px;
  }

  .field-value.fs-5 {
    font-size: 15px !important;
  }

  .field-value.fs-6 {
    font-size: 13px !important;
  }

  .form-check-label {
    font-size: 14px;
  }

  .edit-btn {
    min-width: 160px;
    padding: 0.625rem 1.25rem !important;
    font-size: 14px !important;
  }

  .notification-section {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 1rem;
  }
}

@media (max-width: 576px) {
  .contract-details-container {
    padding: 12px !important;
  }

  .contract-title {
    font-size: 16px;
    line-height: 22px;
  }

  .field-label {
    font-size: 11px;
  }

  .field-value.fs-5 {
    font-size: 14px !important;
    line-height: 20px;
  }

  .field-value.fs-6 {
    font-size: 12px !important;
    line-height: 18px;
  }

  .form-check-label {
    font-size: 13px;
    line-height: 18px;
  }

  .edit-btn {
    width: 100% !important;
    min-width: unset;
    padding: 0.75rem !important;
    font-size: 13px !important;
  }

  .custom-checkbox {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
