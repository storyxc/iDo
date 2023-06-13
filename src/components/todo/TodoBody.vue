<template>
  <div class="container">
    <div class="todo-items">
      <div class="items-wrapper" v-for="todoItem in todoList.data">
        <todo-item :todoItem="todoItem" :key="todoItem.title"/>
      </div>
      <todo-item-editable @add-todo="addTodoCallback" @edit-focused="todoItemEditableFocused = true"
                          v-click-outside="handleClickOutSide"/>
    </div>

  </div>
</template>
<script setup lang="ts">
import { TodoList } from "@/types/todo";
import TodoItemEditable from "@/components/todo/TodoItemEditable.vue";
import { DirectiveBinding } from "vue";

const vClickOutside = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (e: MouseEvent) => {
      if (!el.contains(e.target as Node)) {
        binding.value();
      }
    };
    (el as any).__vueClickOutside__ = handler;
    document.addEventListener('click', handler);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).__vueClickOutside__);
    delete (el as any).__vueClickOutside__;
  },
};


const todoList = reactive<TodoList>({
  data: []
});

onMounted(() => {
  todoList.data = [
    {
      "title": "todo1",
      "remark": "todo1",
      "tags": ["tag1", "tag2"],
      "flag": true,
      "completed": false
    },
    {
      "title": "todo2",
      "remark": "todo2",
      "tags": ["tag1", "tag2"],
      "flag": false,
      "completed": false
    }
  ];
});

/**
 * 添加待办事项后的回调
 */
const addTodoCallback = () => {
  console.log('addTodoCallback');
}

/**
 * 点击todo-item-editable外部的回调
 */
const todoItemEditableFocused = ref(false);

const handleClickOutSide = () => {
  if (todoItemEditableFocused.value) {
    console.log('handleClickOutSide');
    todoItemEditableFocused.value = false;
  }
}

</script>
<style lang="less">
</style>