<template>
  <div class="item">
    <div class="circle" @click="handleFinished"></div>
    <div class="todo-info">
      <h4 class="todo-title">{{ todoItem.title }}</h4>
      <p class="todo-desc">{{ todoItem.remark }}</p>
      <!--标签-->
      <div class="todo-tags">
        <div class="tags-list">
          <div
              v-for="tag in todoItem.tags"
              :key="tag"
              class="todo-tag"
          >
            {{ tag }}
          </div>
        </div>
        <div class="tags-add">#</div>
        <div class="flag"><i
            :class="['iconfont', 'icon-flag_px', { 'todo-flag-n': !todoItem.flag, 'todo-flag-y': todoItem.flag }]"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TodoItemEntity } from "@/common/todo/types";

defineProps<{
  todoItem: TodoItemEntity
}>()

const handleFinished = () => {
  alert('finished')
}


</script>
<style scoped lang="less">
.item {
  display: flex;

  .circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px dotted #838383;
    margin-right: 14px;
    transform: translateY(3px);
  }

  .todo-info {
    flex: 1;

    .todo-title {
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }

    .todo-desc {
      font-size: 12px;
      color: #999;
      margin: 0;
    }

    .todo-tags {
      display: flex;
      align-items: center;
      font-size: 12px;

      .tags-list {
        display: flex;
        align-items: center;

        .todo-tag {
          display: flex;
          align-items: center;
          margin-right: 10px;
          padding: 2px 5px;
          background-color: #f5f5f5;
        }
      }

      .tags-add {
        color: #858585;
        background-color: #f5f5f5;
        padding: 2px 8px;
        border-radius: 2px;
      }

      .flag {
        margin-left: 10px;

        .todo-flag-n {
          color: #858585;
          background-color: #f5f5f5;
          padding: 2px 5px;
          border-radius: 2px;
        }

        .todo-flag-y {
          color: #fff;
          background-color: red;
          padding: 2px 5px;
          border-radius: 2px;
        }
      }

    }

    &:after {
      content: '';
      display: block;
      width: 90%;
      height: 1px;
      background-color: #ececec;
      margin: 5px 0;
    }
  }
}
</style>