<template>
  <div class="container">
    <div class="todo-items">
      <div class="items-wrapper" v-for="todoItem in todoList.data">
        <todo-item
            :todoItem="todoItem"
            :dotted="false"
            :key="todoItem.id"
            @update-completed="handleComplete"
            @update-todo-item="handleUpdateTodoItem"
            @remove-todo-item="handleRemoveTodoItem"
            @update-flag="handleUpdateFlag"
        />
      </div>
      <todo-item
          :todo-item="todoItemForm"
          v-click-outside="handleClickOutside"
          @update-add-todo-form="handleUpdateAddTodoItemForm"
      />
    </div>

  </div>
</template>
<script setup lang="ts">
import { TodoItemEntity, TodoList } from "src/universal/todo";
//@ts-ignore
import { ClickOutside as vClickOutside } from 'element-plus'

const todoList = reactive<TodoList>({
  data: []
});

const initData = async () => {
  todoList.data = await window.api.fetchTodoItem();
}

onMounted(() => {
  initData();
});

/**
 * 点击完成circle的回调
 */
const handleComplete = async (item: TodoItemEntity) => {
  const index = todoList.data.findIndex(todoItem => todoItem.id === item.id);
  if (index !== -1) {
    await window.api.completeTodoItem(item.id)
    await initData();
  }
}

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

const handleRemoveTodoItem = async (id: number) => {
  const index = todoList.data.findIndex(item => item.id === id)
  if (index !== -1) {
    await window.api.removeTodoItem(id)
    await initData();
  }
}

/**
 * 更新待办事项后的事件回调
 */
const handleUpdateTodoItem = async (item: TodoItemEntity) => {
  const index = todoList.data.findIndex(todoItem => todoItem.id === item.id);
  if (index !== -1) {
    await window.api.updateTodoItem(JSON.stringify(item));
    await initData();
  }
}

/**
 * track子组件的新增待办事项事件变化
 */

const childTodoForm = reactive<TodoItemEntity>({
  id: 0,
  title: '',
  remark: '',
  tags: [],
  flag: false,
  completed: false
});
const handleUpdateAddTodoItemForm = async (item: TodoItemEntity) => {
  childTodoForm.id = item.id;
  childTodoForm.title = item.title;
  childTodoForm.remark = item.remark;
  childTodoForm.tags = item.tags;
  childTodoForm.flag = item.flag;
  childTodoForm.completed = item.completed;
  todoItemForm.id = item.id;
  todoItemForm.title = item.title;
  todoItemForm.remark = item.remark;
  todoItemForm.tags = item.tags;
  todoItemForm.flag = item.flag;
  todoItemForm.completed = item.completed;
}
/**
 * 点击新增项元素外部时的回调
 */

const handleClickOutside = async () => {
  if (!childTodoForm.title && !childTodoForm.id) {
    resetForm();
    return;
  } else if (!childTodoForm.id && childTodoForm.title) {
    await window.api.addTodoItem(JSON.stringify(childTodoForm));
    await initData();
  } else {
    await window.api.updateTodoItem(JSON.stringify(childTodoForm));
    await initData();
  }
  resetForm();
}


/**
 * 重置表单
 */
const resetForm = () => {
  childTodoForm.id = 0;
  childTodoForm.title = '';
  childTodoForm.remark = '';
  childTodoForm.tags = [];
  childTodoForm.flag = false;
  childTodoForm.completed = false;
  todoItemForm.id = 0;
  todoItemForm.title = '';
  todoItemForm.remark = '';
  todoItemForm.tags = [];
  todoItemForm.flag = false;
  todoItemForm.completed = false;
}

/**
 * 更新flag标记
 * @param item
 */
const handleUpdateFlag = (item: TodoItemEntity) => {
  const index = todoList.data.findIndex(todoItem => todoItem.id === item.id);
  if (index !== -1) {
    todoList.data.splice(index, 1, item);
  }
}

</script>
<style lang="less">
</style>