<template>
  <div class="container">
    <div class="todo-items">
      <div class="items-wrapper" v-for="todoItem in todoList.data">
        <todo-item
            :todoItem="todoItem"
            :dotted="false"
            :key="todoItem.id"
            @update-todo-item="handleUpdateTodoItem"
            @remove-todo-item="handleRemoveTodoItem"
        />
      </div>
      <todo-item
          :todo-item="todoItemForm"
          v-click-outside="handleClickOutSide"
      />
    </div>

  </div>
</template>
<script setup lang="ts">
import { TodoItemEntity, TodoList } from "@/types/todo";
//@ts-ignore
import { ClickOutside as vClickOutside } from 'element-plus'
import { clone } from "lodash";

const todoList = reactive<TodoList>({
  data: []
});

onMounted(() => {
  todoList.data = [
    {
      "id": 1,
      "title": "todo1",
      "remark": "todo1",
      "tags": ["tag1", "tag2"],
      "flag": true,
      "completed": false
    },
    {
      "id": 2,
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
  id: 0,
  title: '',
  remark: '',
  tags: [],
  flag: false,
  completed: false
});

const handleRemoveTodoItem = (id: number) => {
  todoList.data.splice(todoList.data.findIndex(item => item.id === id), 1);
}

/**
 * 更新待办事项后的回调
 */
const handleUpdateTodoItem = (item: TodoItemEntity) => {
  const index = todoList.data.findIndex(todoItem => todoItem.id === item.id);
  if (index !== -1) {
    todoList.data.splice(index, 1, item);
  }
  console.log(todoList.data);
}

/**
 * 点击新增项元素外部时的回调
 */
const handleClickOutSide = () => {
  if (!todoItemForm.title) {
    return;
  }
  // 获取最大id
  const maxId = todoList.data.reduce((prev, current) => {
    return prev.id > current.id ? prev : current;
  }).id;
  todoItemForm.id = maxId + 1;
  todoList.data.push(clone(todoItemForm));
  resetForm();
}

/**
 * 重置表单
 */
const resetForm = () => {
  todoItemForm.id = 0;
  todoItemForm.title = '';
  todoItemForm.remark = '';
  todoItemForm.tags = [];
  todoItemForm.flag = false;
  todoItemForm.completed = false;
}

</script>
<style lang="less">
</style>