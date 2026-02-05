<template>
  <button
    class="flex-grow-1 flex-md-grow-0"
    :class="computedClass"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary", // primary, outline, ghost, warn
  },
  size: {
    type: String,
    default: "md",
  },
  block: Boolean,
  disabled: Boolean,
});

const computedClass = computed(() => {
  return [
    "app-btn",
    `btn-${props.variant}`,
    `size-${props.size}`,
    { "w-100": props.block },
  ];
});
</script>

<style scoped>
/* BASE RESET */
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.2s ease;
  border-radius: 10px; /* Slightly rounded as per image */
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
}

/* SIZES */
.size-md {
  padding: 8px 20px;
  font-size: 0.95rem;
}
.size-sm {
  padding: 4px 12px;
  font-size: 0.85rem;
}

/* PRIMARY (View Details) */
.btn-primary {
  background-color: #008080; /* Teal color from screenshot */
  color: white;
  border: none;
}
.btn-primary:hover {
  background-color: #006666;
}

/* LIGHT (View Details) */
.btn-light {
  background-color: #a5dadf; /* Teal color from screenshot */
  color: #202020;
  border: none;
}
.btn-light:hover {
  background-color: #006666;
}

/* GHOST (Share button) */
.btn-ghost {
  background: transparent;
  border: 1px solid #008080;
  color: #008080;
}
.btn-ghost:hover {
  background: rgba(0, 128, 128, 0.05);
}

/* OUTLINE (Price map, Sell it yourself) */
.btn-outline {
  background: white;
  border: 1.5px solid #213547; /* Darker outline per image */
  color: #213547;
}
.btn-outline:hover {
  background: #f8f9fa;
}

/* WARN (In the screenshot, "Real estate" is actually dark outline) */
/* Adjusting this to match the dark teal/black button at the far right */
.btn-warn {
  background: white;
  border: 1.5px solid #004d4d;
  color: #004d4d;
}

.app-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
