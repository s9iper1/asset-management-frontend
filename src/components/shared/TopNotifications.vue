<template>
  <div
    class="notification-bar d-flex align-items-center justify-content-between p-3 mb-4 rounded shadow-sm"
  >
    <!-- Left section with message -->
    <div
      class="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3 flex-grow-1"
    >
      <!-- Greeting section -->
      <div class="d-flex align-items-center">
        <h5 class="fw-bold mb-0 text-dark">Hi John, good morning!</h5>
      </div>

      <!-- Message section -->
      <div class="notification-message text-dark">
        You have
        <span class="text-primary fw-semibold">5 new messages</span>
        and
        <span class="text-primary fw-semibold">3 upcoming anniversaries</span>
        within 30 days.
      </div>
    </div>
    <div
      class="d-block d-md-none border-start border-2 divider mx-2"
      style="height: 80px"
    ></div>
    <!-- Right section with button and timestamp -->
    <div
      class="d-flex flex-column flex-md-row align-items-lg-center align-items-end justify-content-end gap-2 gap-md-3"
    >
      <!-- Ask AI Button -->
      <button
        class="btn ask-btn text-nowrap border-0 fw-semibold px-3 py-2 rounded order-2 order-lg-1"
      >
        Ask AI
      </button>

      <!-- Vertical divider (hidden on mobile) -->
      <div
        class="d-none d-md-block border-start border-2 divider mx-2 order-lg-2"
        style="height: 40px"
      ></div>

      <!-- Timestamp -->
      <div class="d-none d-lg-block text-muted small text-nowrap order-lg-3">
        1 hour ago
      </div>

      <!-- Close button (optional) -->
      <button class="btn close-btn text-dark ms-2 order-1 order-lg-4">
        <!-- <i class="bi bi-x-lg"></i> -->
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for static component
</script>

<style scoped>
.notification-bar {
  background-color: #fef6e2;
  border: 2px solid transparent;
  box-shadow: 0 5px 15px rgba(238, 220, 175, 0.5);
}
.divider {
  border-color: #efe1bd !important;
}
.text-muted {
  color: #bbb29b !important;
}
/* Custom color for the primary text accents */
.text-primary {
  color: #1c8089 !important;
}

.ask-btn {
  background-color: #f5e9c9;
  color: "#202020";
}
.close-btn {
  padding: 5px 10px;
  background-color: #f5e9c9;
  color: #d8d8d8;
  font-size: 10px;
}

/* Ensure proper spacing on mobile */
@media (max-width: 768px) {
  .notification-bar {
    padding: 1rem !important;
  }

  .notification-message {
    font-size: 0.95rem;
    line-height: 1.5;
  }
}
</style>
