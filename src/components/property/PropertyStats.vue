<template>
  <div class="stats-row">
    <div class="chip">Documents: {{ documents }}</div>
    <div class="chip">Co-owners: {{ owners }}</div>
    <div class="chip">Alerts: {{ alerts }}</div>
    <div class="chip">Last Update: {{ lastUpdate }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  documents: { type: [Number, String], default: 0 },
  owners: { type: [Number, String], default: 0 },
  alerts: { type: [Number, String], default: 0 },
  lastUpdate: { type: String, default: '—' }
})
</script>

<style scoped>
.stats-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* Removed margin-top because the parent container now handles spacing */
}

.chip {
  background: #ffffff; /* Pure white background per screenshot */
  border: 1px solid #dee2e6; /* Lighter, standard Bootstrap-style border */
  padding: 4px 12px;
  border-radius: 8px; /* Slightly more squared/modern than 10px */
  font-weight: 600;
  font-size: 0.85rem; /* Slightly smaller text for the badge look */
  color: #212529;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02); /* Very subtle depth */
}

/* Optional: Make the "Alerts" red if count > 0 to match UI logic */
/* .chip-alert-active {
  color: #dc3545;
}
*/
</style>