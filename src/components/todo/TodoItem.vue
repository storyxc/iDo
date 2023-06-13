<template>
  <div class="item">
    <complete-circle :dotted="false"/>
    <div class="todo-info">
      <input class="todo-title todo-input" v-model="todoItem.title">
      <input class="todo-desc todo-input" v-model="todoItem.remark"/>
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
        <div class="tags-add" @click="showAddTagDialog">
          <span>#</span>
          <div class="add-tag-dialog" v-if="showDialog">
            <input ref="tagInput" type="text" placeholder="标签名" @blur="showDialog = false"
                   @keydown="handleTagInputKeydown"/>
          </div>
        </div>

        <todo-flag :flag="todoItem.flag" @update-flag="handleUpdateFlag"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TodoItemEntity } from "@/types/todo";


const tagInput = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  todoItem: TodoItemEntity
}>()

const showDialog = ref(false)


const showAddTagDialog = () => {
  showDialog.value = true
  nextTick(() => {
    tagInput.value?.focus()
  })
}

const handleTagInputKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    const tag = tagInput.value?.value
    let tags = props.todoItem.tags
    if (tag && !tags.includes(tag) && tags.length <= 2) {
      props.todoItem.tags.push(tag)
    }
    showDialog.value = false
  } else if (e.key === 'Escape') {
    showDialog.value = false
  }
}

const handleUpdateFlag = (newFlag: boolean) => {
  props.todoItem.flag = newFlag
}

</script>
<style scoped lang="less">
.item {
  display: flex;

  .todo-info {
    flex: 1;

    input {
      display: block;
      width: 90%;

      &.todo-title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 2px;
      }

      &.todo-desc {
        font-size: 12px;
        color: #999;
        margin-bottom: 2px;
      }
    }

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
        position: relative;
        color: #858585;
        background-color: #f5f5f5;
        padding: 2px 8px;
        border-radius: 2px;

        .add-tag-dialog {
          width: 65px;
          position: absolute;
          bottom: -40px;
          left: -21px;
          background-color: #f5f5f5;

          input {
            width: 100%;
            height: 30px;
            padding: 0 10px;
            background-color: #f5f5f5;
            border: 1px solid transparent;
            border-radius: 2px;
          }

          &:before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #f5f5f5;
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
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
          color: #ff0000;
          background-color: #f5f5f5;
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