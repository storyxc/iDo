<template>
  <div class="container">
    <div class="todo-items">
      <div class="items-wrapper" v-for="todoItem in todoList.data">
        <todo-item
            :todoItem="todoItem"
            :dotted="false"
            :key="todoItem.title"
            @update-todo-item="handleUpdateTodoItem"
        />
      </div>
      <todo-item
          :todo-item="todoItemForm"
          @add-todo-item="handleAddTodoItem"
          v-click-outside="handleClickOutSide"
      />
    </div>

  </div>
</template>
<script setup lang="ts">
import { TodoItemEntity, TodoList } from "@/types/todo";
import TodoItemEditable from "@/components/todo/TodoItemEditable.vue";
import { ClickOutside as vClickOutside } from 'element-plus'


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
 * 新增todoItem
 */
const todoItemForm: TodoItemEntity = reactive<TodoItemEntity>({
  title: '',
  remark: '',
  tags: [],
  flag: false,
  completed: false
});

const handleAddTodoItem = (item: TodoItemEntity) => {
  console.log('addTodoCallback');
  console.log(item);
  todoList.data.push(item);
  nextTick(() => {
    todoItemForm.title = '';
  })
}

/**
 * 更新待办事项后的回调
 */
const handleUpdateTodoItem = (item: TodoItemEntity) => {
  console.log('updateTodoCallback');
  console.log(item);
}

/**
 * 点击todo-item-editable外部的回调
 */

const handleClickOutSide = () => {
  console.log('handleClickOutSide');
}

</script>
<style lang="less">
</style>