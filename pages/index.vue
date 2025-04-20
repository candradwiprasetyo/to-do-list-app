<template>
  <div class="max-w-xl mx-auto p-4">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4 text-center">Todo List App</h1>
      <AddTaskButton
        @click="openAddModal"
        label="Add Task"
        customClass="mb-4"
      />
    </div>

    <div class="space-y-3">
      <Item
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo"
        @edit="openEditModal"
        @toggle="toggleStatus"
      />
    </div>
    <Form
      v-if="showModal"
      :editingTodo="editingTodo"
      @save="handleSave"
      @cancel="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Item from "~/components/Item.vue";
import Form from "~/components/Form.vue";
import AddTaskButton from "~/components/Button.vue";
import { useTodos, type Todo } from "~/composables/useTodos";

const { todos, addTodo, deleteTodo, updateTodo, toggleStatus } = useTodos();

const showModal = ref(false);
const editingTodo = ref<Todo | null>(null);

const openAddModal = () => {
  editingTodo.value = null;
  showModal.value = true;
};

const openEditModal = (todo: Todo) => {
  editingTodo.value = todo;
  showModal.value = true;
};

const handleSave = (form: Omit<Todo, "id">) => {
  if (editingTodo.value) {
    updateTodo({ ...editingTodo.value, ...form });
  } else {
    addTodo(form);
  }
  closeModal();
};

const closeModal = () => {
  showModal.value = false;
};
</script>
