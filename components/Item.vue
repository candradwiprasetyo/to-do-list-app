<template>
  <div class="bg-white p-6 rounded-2xl flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-bold">{{ todo.title }}</h3>
        <p class="text-sm text-gray-500">{{ todo.description }}</p>
        <p class="text-xs mt-1">
          <Label :status="todo.status" />
        </p>
      </div>
      <div class="flex gap-2">
        <button @click="$emit('edit', todo)" class="text-blue-500">
          <Icon name="edit" size="24px" color="green" />
        </button>
        <button @click="$emit('delete', todo.id)" class="text-red-500">
          <Icon name="delete" size="24px" color="red" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Label from "~/components/Label.vue";

defineProps<{
  todo: {
    id: number;
    title: string;
    description: string;
    status: "Todo" | "In Progress" | "Done";
  };
}>();

defineEmits(["edit", "delete", "toggle"]);
</script>
