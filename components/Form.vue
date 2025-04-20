<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-xl w-80">
      <h2 class="text-lg font-bold mb-2">
        {{ editingTodo ? "Edit" : "Add" }} Task
      </h2>
      <form @submit.prevent="submitForm">
        <Input v-model="localForm.title" placeholder="Title" />
        <div v-if="errorMessages.title" class="text-red-500 text-sm mb-2">
          {{ errorMessages.title }}
        </div>

        <Textarea v-model="localForm.description" placeholder="Description" />
        <div v-if="errorMessages.description" class="text-red-500 text-sm mb-2">
          {{ errorMessages.description }}
        </div>

        <Select v-model="localForm.status" />
        <div v-if="errorMessages.status" class="text-red-500 text-sm mb-2">
          {{ errorMessages.status }}
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <CancelButton
            @click="closeModal"
            label="Cancel"
            customClass="bg-red-500"
          />
          <SubmitButton @click="submitForm" label="Save" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";
import Input from "~/components/Input.vue";
import Textarea from "~/components/Textarea.vue";
import Select from "~/components/Select.vue";
import SubmitButton from "~/components/Button.vue";
import CancelButton from "~/components/Button.vue";
import type { Todo } from "~/composables/useTodos";

const props = defineProps<{
  editingTodo: Todo | null;
}>();

const emit = defineEmits(["save", "cancel"]);

const localForm = ref<Omit<Todo, "id">>({
  title: "",
  description: "",
  status: "Todo",
});

const errorMessages = ref({
  title: "",
  description: "",
  status: "",
});

const showModal = ref(true);

watch(
  () => props.editingTodo,
  (todo) => {
    if (todo) {
      localForm.value = {
        title: todo.title,
        description: todo.description,
        status: todo.status,
      };
    } else {
      localForm.value = { title: "", description: "", status: "Todo" };
    }
  },
  { immediate: true }
);

const submitForm = () => {
  errorMessages.value = {
    title: "",
    description: "",
    status: "",
  };

  if (!localForm.value.title) {
    errorMessages.value.title = "Title is required";
  }

  if (!localForm.value.description) {
    errorMessages.value.description = "Description is required";
  }

  if (!localForm.value.status) {
    errorMessages.value.status = "Status is required";
  }

  if (
    errorMessages.value.title ||
    errorMessages.value.description ||
    errorMessages.value.status
  ) {
    return;
  }

  emit("save", localForm.value);
};

const closeModal = () => {
  showModal.value = false;
  emit("cancel");
};
</script>
