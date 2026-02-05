<template>
  <div
    class="communication-container bg-white rounded-5 shadow-sm px-4 py-3 mb-4"
  >
    <!-- Header -->
    <div
      class="communication-header d-flex align-items-center justify-content-between"
    >
      <h2 class="communication-title text-primary mb-0">Communication</h2>
      <div class="action-icon bg-light rounded-3 p-2">
        <a
          href="#communicationContent"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="communicationContent"
          @click="toggleIcon"
        >
          <i :class="iconClass"></i>
        </a>
      </div>
    </div>

    <!-- Messages List -->
    <div class="messages-list collapse mt-2" id="communicationContent">
      <!-- Message 1 (Latest) -->
      <div class="message-card mb-4 pb-4 border-bottom">
        <!-- Message Header -->
        <div
          class="message-header d-flex flex-column flex-md-row justify-content-md-between align-items-md-start mb-3"
        >
          <!-- Sender Info -->
          <div
            class="sender-info bg-light border rounded-4 p-3 mb-2 mb-md-0 me-md-3 flex-grow-1"
          >
            <div class="sender-label text-secondary small mb-1">From</div>
            <div class="sender-name fw-semibold text-dark">Anna Novakova</div>
            <div class="sender-role text-dark">
              Real Estate Agent – Prague Homes
            </div>
          </div>

          <!-- Time Info -->
          <div class="time-info bg-light border rounded-4 p-3 flex-grow-1">
            <div class="time-label text-secondary small mb-1">When</div>
            <div class="time-value fw-semibold text-dark">
              March 14, 2025 · 9:05 AM
            </div>
          </div>
        </div>

        <!-- Message Content -->
        <div class="message-content px-3">
          <div class="message-label text-secondary small mb-2">Message</div>
          <div class="message-body text-dark mb-4">
            Hello John,
            <br /><br />
            I am attaching a preliminary price analysis based on recent
            comparable sales in the area. We can discuss the details and next
            steps during a call if that works for you.
            <br /><br />
            Kind regards,
            <br />
            Anna
          </div>

          <!-- Attachments -->
          <div class="attachments-section">
            <div class="attachments-label text-secondary small mb-2">
              Attachments
            </div>
            <div class="attachment-item bg-light border-0 rounded-4 p-3 w-25">
              <div class="attachment-name fw-semibold text-dark">
                <i class="fas fa-file-pdf me-2 text-danger"></i>
                Preliminary-price-analysis.pdf
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Message 2 -->
      <div class="message-card mb-4 pb-4 border-bottom">
        <!-- Message Header -->
        <div
          class="message-header d-flex flex-column flex-md-row justify-content-md-between align-items-md-start mb-3"
        >
          <!-- Sender Info -->
          <div
            class="sender-info bg-light border rounded-4 p-3 mb-2 mb-md-0 me-md-3 flex-grow-1"
          >
            <div class="sender-label text-secondary small mb-1">From</div>
            <div class="sender-name fw-semibold text-dark">John Doe</div>
            <div class="sender-role text-dark">Property Owner</div>
          </div>

          <!-- Time Info -->
          <div class="time-info bg-light border rounded-4 p-3 flex-grow-1">
            <div class="time-label text-secondary small mb-1">When</div>
            <div class="time-value fw-semibold text-dark">
              March 12, 2025 · 1:18 PM
            </div>
          </div>
        </div>

        <!-- Message Content -->
        <div class="message-content px-3">
          <div class="message-label text-secondary small mb-2">Message</div>
          <div class="message-body text-dark">
            Hello Anna,
            <br /><br />
            thank you for the update. I look forward to reviewing the market
            overview and the proposed price range.
            <br /><br />
            Please let me know if you need any additional information from my
            side.
            <br /><br />
            Best regards,
            <br />
            John
          </div>
        </div>
      </div>

      <!-- Message 3 (Oldest) -->
      <div class="message-card">
        <!-- Message Header -->
        <div
          class="message-header d-flex flex-column flex-md-row justify-content-md-between align-items-md-start mb-3"
        >
          <!-- Sender Info -->
          <div
            class="sender-info bg-light border rounded-4 p-3 mb-2 mb-md-0 me-md-3 flex-grow-1"
          >
            <div class="sender-label text-secondary small mb-1">From</div>
            <div class="sender-name fw-semibold text-dark">Anna Novakova</div>
            <div class="sender-role text-dark">
              Real Estate Agent – Prague Homes
            </div>
          </div>

          <!-- Time Info -->
          <div class="time-info bg-light border rounded-4 p-3 flex-grow-1">
            <div class="time-label text-secondary small mb-1">When</div>
            <div class="time-value fw-semibold text-dark">
              March 12, 2025 · 10:42 AM
            </div>
          </div>
        </div>

        <!-- Message Content -->
        <div class="message-content px-3">
          <div class="message-label text-secondary small mb-2">Message</div>
          <div class="message-body text-dark">
            Hello,
            <br /><br />
            thank you for your inquiry regarding the apartment in Vinohrady. We
            have received your request and are currently preparing a market
            overview and price estimate.
            <br /><br />
            We will get back to you shortly with more details.
            <br /><br />
            Best regards,
            <br />
            Anna Novakova
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Collapse } from "bootstrap";

const isCollapsed = ref(true);
const iconClass = ref("fas fa-plus text-secondary");

// Initialize Bootstrap Collapse
let collapseInstance = null;

onMounted(() => {
  const collapseElement = document.getElementById("communicationContent");
  collapseInstance = new Collapse(collapseElement, {
    toggle: false,
  });

  // Ensure it's collapsed by default
  collapseInstance.hide();
});

const toggleIcon = () => {
  isCollapsed.value = !isCollapsed.value;
  // Toggle between ellipsis (collapsed) and minus (expanded) icon
  iconClass.value = isCollapsed.value
    ? "fas fa-plus text-secondary"
    : "fas fa-minus text-secondary";
};
</script>

<style scoped>
.communication-container {
  box-shadow: 0px 5px 15px 0px rgba(223, 222, 203, 0.7) !important;
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

/* Header */
.communication-title {
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

/* Message Cards */
.message-card:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.border-bottom {
  border-color: #e1e9ea !important;
}

/* Message Header */
.message-header {
  gap: 12px;
}

.sender-info,
.time-info {
  border-color: #e1e9ea !important;
  background-color: #ffffff !important;
  min-width: 0;
}

.sender-label,
.time-label,
.message-label,
.attachments-label {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}

.sender-name,
.time-value,
.attachment-name {
  font-size: 12px;
  line-height: 20px;
}

.sender-role {
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
}

/* Message Body */
.message-body {
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
}

/* Attachments */
.attachment-item {
  background-color: #f7f6f2 !important;
  border-radius: 16px !important;
}

.attachment-item:hover {
  background-color: #efeee6 !important;
}

.text-danger {
  color: #dc3545 !important;
}

/* Responsive Design */
@media (max-width: 992px) {
  .communication-container {
    padding: 20px !important;
  }

  .communication-title {
    font-size: 20px;
    line-height: 28px;
  }

  .message-header {
    flex-direction: column;
  }

  .sender-info,
  .time-info {
    width: 100%;
    margin-bottom: 12px;
  }

  .sender-info:last-child,
  .time-info:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .communication-container {
    padding: 16px !important;
  }

  .communication-header {
    margin-bottom: 1.5rem !important;
  }

  .communication-title {
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

  .sender-info,
  .time-info {
    padding: 12px !important;
  }

  .message-content {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .message-body {
    font-size: 14px;
    line-height: 20px;
  }
}

@media (max-width: 576px) {
  .communication-container {
    padding: 12px !important;
  }

  .communication-title {
    font-size: 16px;
    line-height: 22px;
  }

  .sender-label,
  .time-label,
  .message-label,
  .attachments-label {
    font-size: 11px;
  }

  .sender-name,
  .time-value,
  .sender-role,
  .attachment-name {
    font-size: 11px;
    line-height: 18px;
  }

  .message-body {
    font-size: 13px;
    line-height: 18px;
  }

  .attachment-item {
    padding: 10px !important;
  }
}
</style>
