<template>
  <span
    :class="statusClass"
    class="px-2 py-1 rounded text-xs font-bold text-white"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  status: "Todo" | "In Progress" | "Done";
}>();

const statusClass = computed(() => {
  switch (props.status) {
    case "Todo":
      return "bg-gray-400";
    case "In Progress":
      return "bg-yellow-400";
    case "Done":
      return "bg-green-400";
    default:
      return "";
  }
});
</script>
