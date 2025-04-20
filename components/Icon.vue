<template>
  <span
    class="material-symbols-outlined"
    :class="customClass"
    :style="{ fontSize: size, color }"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "20px",
  },
  color: {
    type: String,
    default: "inherit",
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>
