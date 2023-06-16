<template>
  <div class="item">
    <todo-complete-circle :dotted="!todoItem.title"/>
    <div class="todo-info">
      <input
          :class="[(todoItem.title || focused && !todoItem.title) ? ['todo-title', 'todo-input'] : 'todo-hide' ]"
          v-model="todoItem.title"
          @blur="titleInputOnBlur"
          @focus="titleInputOnFocus"
      />
      <div :class="[ {'display-none' : !focused && !todoItem.title } ]">
        <input
            class="todo-desc todo-input"
            v-model="todoItem.remark"
        />
        <!--标签-->
        <div class="todo-tags">
          <div class="tags-list">
            <el-tag
                v-for="(tag, index) in todoItem.tags"
                :key="tag"
                class="todo-tag"
                effect="light"
                type="info"
                size="small"
                @close="handleTagCloseClick(index)"
                closable
            >
              {{ tag }}
            </el-tag>
          </div>
          <!--新增标签-->
          <div class="tags-add" @click="showAddTagDialog">
            <span>#</span>
            <div class="add-tag-dialog" v-if="showDialog">
              <input ref="tagInput" type="text" placeholder="标签名" @blur="showDialog = false"
                     @keydown="handleTagInputKeydown"/>
            </div>
          </div>
          <!--flag标记-->
          <todo-flag :flag="todoItem.flag" @update-flag="handleUpdateFlag"/>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TodoItemEntity } from "@/types/todo";

const props = defineProps<{
  todoItem: TodoItemEntity
}>()

const emit = defineEmits(['update-todo-item', 'remove-todo-item'])

const focused = ref(false)

/**
 * 标题部分
 */

// 获取焦点时,将focus状态设置为true
const titleInputOnFocus = () => {
  focused.value = true
}
// 失去焦点时，如果标题为空，则填充默认标题
const titleInputOnBlur = () => {
  if (!props.todoItem.title) {
    if (props.todoItem.id) {
      emit('remove-todo-item', props.todoItem.id)
    }
  } else {
    console.log('update-todo-item')
    emit('update-todo-item', props.todoItem)
  }
  focused.value = false
}


/**
 * 删除标签部分
 */
const handleTagCloseClick = (index: number) => {
  props.todoItem.tags.splice(index, 1)
  emit('update-todo-item', props.todoItem)
}

/**
 * 新增标签部分
 */
const tagInput = ref<HTMLInputElement | null>(null)
const showDialog = ref(false)

// 展示新增标签对话框
const showAddTagDialog = () => {
  showDialog.value = true
  nextTick(() => {
    tagInput.value?.focus()
  })
}
// 处理新增标签对话框的键盘事件
const handleTagInputKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    const tag = tagInput.value?.value
    let tags = props.todoItem.tags
    if (tag && !tags.includes(tag) && tags.length <= 2) {
      props.todoItem.tags.push(tag)
      emit('update-todo-item', props.todoItem)
    }
    showDialog.value = false
  } else if (e.key === 'Escape') {
    showDialog.value = false
  }
}
/**
 * 标记部分
 * @param newFlag
 */
const handleUpdateFlag = (newFlag: boolean) => {
  props.todoItem.flag = newFlag
  emit('update-todo-item', props.todoItem)
}

</script>
<style scoped lang="less">
.item {
  display: flex;

  .display-none {
    display: none;
  }

  .todo-info {
    flex: 1;
    height: 70px;

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

      &.todo-hide {
        border: none;
        font-size: 14px;
        font-weight: 500;
        //height: 69px;
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

        span {
          cursor: default;
        }

        .add-tag-dialog {
          width: 65px;
          position: absolute;
          bottom: -40px;
          left: -21px;
          z-index: 1;
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

    .line {
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
}
</style>