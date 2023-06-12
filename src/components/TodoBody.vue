<template>
  <div class="container">
    <div class="todo-items" v-for="todoItem in todoList.data">
      <todo-item :todoItem="todoItem" :key="todoItem.title"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TodoList } from "@/common/todo/types.ts";

const todoList = reactive<TodoList>({
  data: []
});

onMounted(() => {
  todoList.data = [
    {
      "title": "todo1",
      "remark": "todo1",
      "tags": ["tag1", "tag2"],
      "flag": true
    },
    {
      "title": "todo2",
      "remark": "todo2",
      "tags": ["tag1", "tag2"],
      "flag": false
    }
  ];
});

</script>
<style lang="less">
</style>