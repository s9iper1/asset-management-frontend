<template>
  <div class="container-fluid mt-3">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger m-4">
      {{ error }}
      <button class="btn btn-link" @click="loadProperty">Try again</button>
    </div>

    <!-- Content -->
    <div v-else class="row g-4">
      <!-- Left Column - Property Details -->
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <!-- Draft Status -->
            <div class="d-flex justify-content-end mb-4">
              <span
                class="badge px-3 py-2 rounded-3"
                :class="property.is_active ? 'bg-success text-white' : 'bg-light text-dark'"
              >
                {{ property.is_active ? 'Active' : 'Draft' }}
              </span>
            </div>

            <!-- Property Title -->
            <h4 class="mb-4 fw-semibold">
              {{ property.title || 'Untitled Property' }}
            </h4>

            <!-- Property Form -->
            <form @submit.prevent="saveChanges">
              <!-- Property Title Field -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Property title</label
                >
                <div class="input-group border rounded-3">
                  <input
                    type="text"
                    class="form-control border-0"
                    v-model="property.title"
                    placeholder="Enter property title"
                  />
                </div>
              </div>

              <!-- Type and Contract Type -->
              <div class="row mb-4">
                <div class="col-6">
                  <label class="form-label text-secondary small mb-2"
                    >Type</label
                  >
                  <div class="input-group border rounded-3">
                    <select
                      v-model="property.property_type"
                      class="form-select border-0"
                    >
                      <option value="">— select —</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="land">Land</option>
                      <option value="commercial">Commercial</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="col-6">
                  <label class="form-label text-secondary small mb-2"
                    >Contract</label
                  >
                  <div class="input-group border rounded-3">
                    <select
                      v-model="property.contract_type"
                      class="form-select border-0"
                    >
                      <option value="none">None</option>
                      <option value="rent">Rent</option>
                      <option value="lease">Lease</option>
                      <option value="mortgage">Mortgage</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Purchase Date and Available From -->
              <div class="row mb-4">
                <div class="col-6">
                  <label class="form-label text-secondary small mb-2"
                    >Purchase Date</label
                  >
                  <div class="input-group border rounded-3">
                    <input
                      type="date"
                      class="form-control border-0"
                      v-model="property.purchase_date"
                    />
                  </div>
                </div>
                <div class="col-6">
                  <label class="form-label text-secondary small mb-2"
                    >Available From</label
                  >
                  <div class="input-group border rounded-3">
                    <input
                      type="date"
                      class="form-control border-0"
                      v-model="property.available_from"
                    />
                  </div>
                </div>
              </div>

              <hr class="my-4" />

              <!-- Address Section -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Address</label
                >
                <div class="input-group border rounded-3 mb-3">
                  <input
                    type="text"
                    class="form-control border-0"
                    v-model="property.address"
                    placeholder="Enter address"
                  />
                </div>

                <div class="row mb-3">
                  <div class="col-6">
                    <label class="form-label text-secondary small mb-2"
                      >GPS lat</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        type="number"
                        step="0.000001"
                        class="form-control border-0"
                        v-model="property.latitude"
                        placeholder="Latitude"
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <label class="form-label text-secondary small mb-2"
                      >GPS lng</label
                    >
                    <div class="input-group border rounded-3">
                      <input
                        type="number"
                        step="0.000001"
                        class="form-control border-0"
                        v-model="property.longitude"
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-outline-primary w-100 border-2 rounded-3 py-2"
                  @click="openMapSelector"
                >
                  <i class="bi bi-map me-2"></i>Select from map
                </button>
              </div>

              <hr class="my-4" />

              <!-- Conditions -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Conditions</label
                >
                <div class="input-group border rounded-3">
                  <input
                    type="text"
                    class="form-control border-0"
                    v-model="property.conditions"
                    placeholder="Describe conditions"
                  />
                </div>
              </div>

              <!-- Comment (Short Description) -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Comment</label
                >
                <textarea
                  class="form-control border rounded-3"
                  v-model="property.comment"
                  rows="3"
                  placeholder="Enter comment/short description"
                ></textarea>
              </div>

              <!-- Story (Expectations) -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Story</label
                >
                <textarea
                  class="form-control border rounded-3"
                  v-model="property.story"
                  rows="3"
                  placeholder="Enter story/expectations"
                ></textarea>
              </div>

              <!-- Contact -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Contact</label
                >
                <div class="input-group border rounded-3">
                  <input
                    type="text"
                    class="form-control border-0"
                    v-model="property.contact"
                    placeholder="Name/Company"
                  />
                </div>
              </div>

              <!-- Purchase Price -->
              <div class="mb-4">
                <label class="form-label text-secondary small mb-2"
                  >Price</label
                >
                <div class="input-group border rounded-3">
                  <span class="input-group-text bg-light border-0 text-muted"
                    >CZK</span
                  >
                  <input
                    type="text"
                    class="form-control border-0"
                    v-model="displayPrice"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <!-- Active Toggle -->
              <div
                class="d-flex align-items-center justify-content-between mb-4"
              >
                <div class="form-check form-switch mb-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    v-model="property.is_active"
                    style="width: 3em; height: 1.5em"
                  />
                  <label class="form-check-label ms-2 fw-semibold"
                    >Active listing</label
                  >
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="row g-3">
                <div class="col-6">
                  <button
                    type="submit"
                    class="btn btn-primary w-100 py-3 rounded-3 fw-semibold"
                    :disabled="saving"
                  >
                    <span v-if="saving">
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
                <div class="col-6">
                  <button
                    type="button"
                    @click="discardChanges"
                    class="btn btn-outline-primary w-100 py-3 rounded-3 fw-semibold"
                  >
                    Discard Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Right Column - Main Content -->
      <div class="col-12 col-lg-8">
        <!-- Action Buttons Row -->
        <div class="card shadow-sm border-0 rounded-4 mb-4">
          <div class="card-body p-4">
            <div
              class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
            >
              <!-- Action Buttons (Purpose Selection) -->
              <div class="d-flex gap-3">
                <button
                  type="button"
                  class="btn px-4 py-3 rounded-3 fw-semibold"
                  :class="messagePurpose === 'price_inquiry' ? 'btn-primary' : 'btn-light'"
                  @click="messagePurpose = 'price_inquiry'"
                >
                  Request Price
                </button>
                <button
                  type="button"
                  class="btn px-4 py-3 rounded-3 fw-semibold"
                  :class="messagePurpose === 'sale' ? 'btn-primary' : 'btn-light'"
                  @click="messagePurpose = 'sale'"
                >
                  Sell
                </button>
                <button
                  type="button"
                  class="btn px-4 py-3 rounded-3 fw-semibold"
                  :class="messagePurpose === 'advice' ? 'btn-primary' : 'btn-light'"
                  @click="messagePurpose = 'advice'"
                >
                  Get Advice
                </button>
              </div>

              <!-- AI Text Generation -->
              <div class="d-flex align-items-center gap-3">
                <span class="text-muted" v-if="creditBalance !== null">
                  Credits: {{ creditBalance }}
                </span>
                <button
                  type="button"
                  class="btn btn-outline-primary px-4 py-3 rounded-3 fw-semibold"
                  @click="generateAIText"
                  :disabled="generatingAI"
                >
                  <span v-if="generatingAI">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Generating...
                  </span>
                  <span v-else>Generate AI Text</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Preview Card -->
        <div class="card shadow-sm border-0 rounded-4 mb-4">
          <div class="card-body p-4">
            <!-- Tab Navigation -->
            <div class="d-flex mb-4">
              <button
                type="button"
                class="btn flex-fill me-3 py-3 rounded-3 fw-semibold"
                :class="editorTab === 'preview' ? 'btn-info' : 'btn-light'"
                @click="editorTab = 'preview'"
              >
                Preview
              </button>
              <button
                type="button"
                class="btn flex-fill me-3 py-3 rounded-3 fw-semibold"
                :class="editorTab === 'edit' ? 'btn-info' : 'btn-light'"
                @click="editorTab = 'edit'"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn flex-fill py-3 rounded-3 fw-semibold"
                :class="editorTab === 'info' ? 'btn-info' : 'btn-light'"
                @click="editorTab = 'info'"
              >
                Prompt (Info)
              </button>
            </div>

            <!-- Subject -->
            <div class="mb-3">
              <span class="text-muted">Subject: </span>
              <span class="fw-semibold">{{ emailSubject }}</span>
            </div>

            <!-- Message -->
            <div class="mb-2">
              <span class="text-muted">Message:</span>
            </div>

            <!-- Preview Tab -->
            <div v-if="editorTab === 'preview'" class="border rounded-3 p-4 bg-light">
              <div v-if="emailBody" style="white-space: pre-wrap;">{{ emailBody }}</div>
              <div v-else>
                <p class="mb-2">Hello,</p>
                <p class="mb-2">
                  I'm contacting you regarding my property ({{ property.property_type }}, {{ property.address || 'No address' }}).
                  Please provide an estimated sale price and a recommended strategy.
                </p>
                <p class="mb-2" v-if="property.comment">
                  Brief details: {{ property.comment }}
                </p>
                <p class="mb-2" v-if="property.conditions">
                  Condition: {{ property.conditions }}
                </p>
                <p class="mb-2" v-if="property.story">
                  My expectations: {{ property.story }}
                </p>
                <p class="mb-0">
                  Thank you and I look forward to your response.<br />
                  Best regards
                </p>
              </div>
            </div>

            <!-- Edit Tab -->
            <div v-else-if="editorTab === 'edit'">
              <textarea
                class="form-control border rounded-3"
                v-model="emailBody"
                rows="10"
                placeholder="Generate AI text or write your message here..."
                style="resize: vertical;"
              ></textarea>
              <div class="d-flex justify-content-end mt-2">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  @click="resetEmailBody"
                  v-if="aiGeneratedText"
                >
                  Reset to AI Text
                </button>
              </div>
            </div>

            <!-- Info Tab -->
            <div v-else class="border rounded-3 p-4 bg-light">
              <p class="mb-2"><strong>How it works:</strong></p>
              <ol class="mb-0 ps-3">
                <li>Select the purpose: Request Price, Sell, or Get Advice</li>
                <li>Click "Generate AI Text" to create a message (uses 1 credit)</li>
                <li>Switch to Edit tab to modify the text if needed</li>
                <li>Select agencies below and click "Send to Selected"</li>
              </ol>
            </div>
          </div>
        </div>

        <!-- Agencies Card -->
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h6 class="fw-semibold mb-0">Select Agencies</h6>
              <small v-if="loadingAgencies" class="text-muted">
                <span class="spinner-border spinner-border-sm"></span> Loading...
              </small>
            </div>

            <!-- No Agencies Message -->
            <div v-if="!loadingAgencies && agencies.length === 0" class="text-center py-4">
              <p class="text-muted mb-2">No agencies found.</p>
              <button class="btn btn-primary btn-sm">Add Agency</button>
            </div>

            <!-- Agencies List -->
            <div class="row g-3 mb-4" v-else>
              <div
                class="col-12 col-md-6 col-lg-4"
                v-for="agency in agencies"
                :key="agency.id"
              >
                <div
                  class="border rounded-3 p-3 h-100"
                  :class="agency.selected ? 'bg-warning-subtle' : 'bg-light'"
                  @click="toggleAgency(agency.id)"
                  style="cursor: pointer;"
                >
                  <div class="d-flex align-items-center mb-3">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :checked="agency.selected"
                        @click.stop
                        @change="toggleAgency(agency.id)"
                      />
                    </div>
                    <span
                      class="ms-2 fw-semibold"
                      :class="agency.selected ? 'text-dark' : 'text-muted'"
                    >
                      {{ agency.name }}
                    </span>
                  </div>
                  <div class="border rounded-2 p-2 bg-white">
                    <small class="text-muted">{{ agency.email }}</small>
                  </div>
                  <div v-if="agency.phone" class="mt-2">
                    <small class="text-muted">{{ agency.phone }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="d-flex flex-column flex-md-row gap-3">
              <button
                class="btn btn-primary px-4 py-3 rounded-3 fw-semibold d-flex align-items-center gap-2"
                @click="sendToAgencies"
                :disabled="selectedCount === 0 || sendingEmail"
              >
                <span v-if="sendingEmail">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Sending...
                </span>
                <span v-else>
                  Send to Selected
                  <span class="badge bg-light text-primary rounded-circle ms-2">
                    {{ selectedCount }}
                  </span>
                </span>
              </button>
              <button
                class="btn btn-outline-primary px-4 py-3 rounded-3 fw-semibold"
                @click="copyToClipboard"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/client";

const props = defineProps({
  mode: { type: String, default: "edit" },
  id: { type: [String, Number], required: true },
});

const router = useRouter();

// State
const loading = ref(true);
const saving = ref(false);
const error = ref("");

// AI Text Generation state
const generatingAI = ref(false);
const aiGeneratedText = ref("");
const aiGenerationId = ref(null);
const creditBalance = ref(null);

// Message composer state
const messagePurpose = ref("price_inquiry"); // price_inquiry, sale, advice
const editorTab = ref("preview"); // preview, edit, info
const emailSubject = ref("Request for property valuation");
const emailBody = ref("");

// Agencies state
const loadingAgencies = ref(false);
const sendingEmail = ref(false);

// Original property data for discard
const originalProperty = ref({});

// Property data
const property = ref({
  title: "",
  property_type: "",
  address: "",
  latitude: null,
  longitude: null,
  conditions: "",
  comment: "",
  story: "",
  contact: "",
  price: "",
  purchase_date: "",
  available_from: "",
  contract_type: "none",
  is_active: false,
});

// Price formatting
const displayPrice = computed({
  get() {
    if (!property.value.price) return "";
    const num = Number(String(property.value.price).replace(/\s/g, ""));
    if (isNaN(num)) return property.value.price;
    return num.toLocaleString("fr-FR");
  },
  set(val) {
    const raw = val.replace(/\s/g, "");
    property.value.price = raw;
  },
});

// Agencies data (loaded from API)
const agencies = ref([]);

// Toggle agency selection
const toggleAgency = (id) => {
  const agency = agencies.value.find((a) => a.id === id);
  if (agency) {
    agency.selected = !agency.selected;
  }
};

// Count selected agencies
const selectedCount = computed(() => {
  return agencies.value.filter((agency) => agency.selected).length;
});

// Load property from API
async function loadProperty() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get(`/api/properties/${props.id}/`);
    property.value = { ...data };
    originalProperty.value = { ...data };
  } catch (err) {
    console.error("Failed to load property:", err);
    error.value = "Failed to load property. Please try again.";
  } finally {
    loading.value = false;
  }
}

// Save changes to API
async function saveChanges() {
  saving.value = true;
  error.value = "";

  try {
    // Prepare data for API
    const payload = {
      title: property.value.title,
      address: property.value.address,
      property_type: property.value.property_type,
      purchase_date: property.value.purchase_date || null,
      price: property.value.price || null,
      contract_type: property.value.contract_type,
      available_from: property.value.available_from || null,
      conditions: property.value.conditions || "",
      contact: property.value.contact || "",
      latitude: property.value.latitude || null,
      longitude: property.value.longitude || null,
      comment: property.value.comment || "",
      story: property.value.story || "",
      is_active: property.value.is_active,
    };

    await api.put(`/api/properties/${props.id}/`, payload);

    // Update original for future discards
    originalProperty.value = { ...property.value };

    // Navigate back to detail view
    router.push(`/properties/${props.id}`);
  } catch (err) {
    console.error("Failed to save property:", err);
    error.value = "Failed to save changes. Please try again.";
  } finally {
    saving.value = false;
  }
}

// Discard changes
const discardChanges = () => {
  property.value = { ...originalProperty.value };
};

// Open map selector (placeholder)
const openMapSelector = () => {
  alert("Map selector coming soon!");
};

// Load agencies from API
async function loadAgencies() {
  loadingAgencies.value = true;
  try {
    const { data } = await api.get('/api/properties/agencies/');
    // Handle paginated response or array
    const agencyList = data.results || data;
    agencies.value = agencyList.map(a => ({ ...a, selected: false }));
  } catch (err) {
    console.error("Failed to load agencies:", err);
  } finally {
    loadingAgencies.value = false;
  }
}

// Load credit balance
async function loadCreditBalance() {
  try {
    const { data } = await api.get('/api/properties/auth/credit-balance/');
    creditBalance.value = data.balance;
  } catch (err) {
    console.error("Failed to load credit balance:", err);
  }
}

// Generate AI text for property
async function generateAIText() {
  generatingAI.value = true;
  error.value = "";

  // Map purpose to text_type and subject
  const purposeConfig = {
    price_inquiry: {
      text_type: "description",
      tone: "professional",
      subject: "Request for property valuation"
    },
    sale: {
      text_type: "story",
      tone: "luxury",
      subject: "Property listing for sale"
    },
    advice: {
      text_type: "description",
      tone: "professional",
      subject: "Request for property advice"
    }
  };

  const config = purposeConfig[messagePurpose.value] || purposeConfig.price_inquiry;
  emailSubject.value = config.subject;

  try {
    const { data } = await api.post(
      `/api/properties/properties/${props.id}/generate-text/`,
      {
        text_type: config.text_type,
        language: "en",
        tone: config.tone
      }
    );

    aiGeneratedText.value = data.generated_text;
    aiGenerationId.value = data.generation_id;

    // Populate the editable email body
    emailBody.value = data.generated_text;

    // Update credit balance
    if (data.new_balance !== undefined) {
      creditBalance.value = data.new_balance;
    }
  } catch (err) {
    console.error("Failed to generate AI text:", err);
    if (err.response?.status === 402) {
      error.value = "Insufficient credits. Please add more credits to use AI features.";
    } else {
      error.value = "Failed to generate AI text. Please try again.";
    }
  } finally {
    generatingAI.value = false;
  }
}

// Reset email body to AI generated text
function resetEmailBody() {
  if (aiGeneratedText.value) {
    emailBody.value = aiGeneratedText.value;
  }
}

// Apply AI generated text to property
async function applyAIText() {
  if (!aiGenerationId.value) return;

  try {
    await api.post(`/api/properties/ai-generations/${aiGenerationId.value}/apply/`);
    // Reload property to get updated data
    await loadProperty();
    aiGeneratedText.value = "";
    aiGenerationId.value = null;
  } catch (err) {
    console.error("Failed to apply AI text:", err);
    error.value = "Failed to apply AI text. Please try again.";
  }
}

// Send communication to selected agencies
async function sendToAgencies() {
  const selectedAgencies = agencies.value.filter(a => a.selected);
  if (selectedAgencies.length === 0) return;

  if (!emailBody.value.trim()) {
    error.value = "Please enter a message before sending.";
    return;
  }

  sendingEmail.value = true;
  error.value = "";

  try {
    // Create communication for each selected agency
    for (const agency of selectedAgencies) {
      await api.post('/api/properties/communications/', {
        property: props.id,
        agency: agency.id,
        subject: emailSubject.value || "Property Inquiry",
        initial_message: emailBody.value,
        status: "sent"
      });
    }
    alert(`Email sent to ${selectedAgencies.length} ${selectedAgencies.length === 1 ? 'agency' : 'agencies'}! Check email history for status.`);
  } catch (err) {
    console.error("Failed to send communications:", err);
    error.value = "Failed to send to some agencies. Please try again.";
  } finally {
    sendingEmail.value = false;
  }
}

// Copy preview text to clipboard
function copyToClipboard() {
  const text = aiGeneratedText.value ||
    `Hello,\n\nI'm contacting you regarding my property (${property.value.property_type}, ${property.value.address || 'No address'}).\n\n${property.value.comment || ''}\n\nThank you and I look forward to your response.\nBest regards`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

onMounted(() => {
  loadProperty();
  loadAgencies();
  loadCreditBalance();
});
</script>

<style scoped>
/* Minimal custom CSS - Most styling handled by Bootstrap */

/* Custom card styling */
.card {
  border: none;
}

/* Custom shadow */
.shadow-sm {
  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7) !important;
}

/* Custom badge styling */
.badge.bg-primary {
  background: radial-gradient(
    closest-side,
    rgba(28, 128, 137, 1) 100%
  ) !important;
  min-width: 21px;
  min-height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form switch custom color */
.form-check-input:checked {
  background-color: #86dbe3;
  border-color: #86dbe3;
}

.form-check-input:checked::after {
  background-color: #1c8089;
}

/* Custom colors matching original design */
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
}

.btn-info {
  background-color: #a5dadf;
  border-color: #a5dadf;
  color: #202020;
}

.btn-info:hover {
  background-color: #94c8cc;
  border-color: #94c8cc;
  color: #202020;
}

.bg-warning-subtle {
  background-color: #fef6e2 !important;
  border-color: #e5d5ab !important;
}

.bg-light {
  background-color: #f7f6f2 !important;
}

/* Remove focus effects on inputs */
.form-control:focus,
.form-select:focus {
  border-color: #dee2e6;
  box-shadow: none;
  outline: none;
}

/* Remove hover effects on agency cards */
.agency-card {
  cursor: pointer;
  transition: none;
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

/* Custom border radius */
.rounded-4 {
  border-radius: 1rem !important;
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
