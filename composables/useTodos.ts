import { ref, watch } from "vue";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
}

const LOCAL_STORAGE_KEY = "todos";

export const useTodos = () => {
  const todos = ref<Todo[]>([]);

  const loadTodos = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) todos.value = JSON.parse(saved);
  };

  watch(
    todos,
    (val) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );

  const addTodo = (todo: Omit<Todo, "id">) => {
    todos.value.push({ ...todo, id: Date.now() });
  };

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  };

  const updateTodo = (updatedTodo: Todo) => {
    const index = todos.value.findIndex((t) => t.id === updatedTodo.id);
    if (index !== -1) todos.value[index] = updatedTodo;
  };

  const toggleStatus = (id: number) => {
    const todo = todos.value.find((t) => t.id === id);
    if (!todo) return;
    todo.status = todo.status === "Done" ? "Todo" : "Done";
  };

  loadTodos();

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleStatus,
  };
};
