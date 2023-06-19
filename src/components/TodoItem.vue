<template>
  <div class="item" :class="{ 'slide-out': isCompleted }">
    <todo-complete-circle :id="todoItem.id" @todo-complete="handleComplete"/>
    <div class="todo-info">
      <input
          :class="[todoItem.title || (focused && !todoItem.title) ? ['todo-title', 'todo-input'] : 'todo-hide']"
          :value="todoItem.title"
          @blur="titleInputOnBlur"
          @focus="titleInputOnFocus"
          @input="handleTitleInput"
      />
      <div :class="[{ 'display-none': !focused && !todoItem.title }]">
        <input class="todo-desc todo-input"
               :value="todoItem.remark"
               @blur="descInputOnBlur"
               @input="handleDescInput"
        />
        <!--标签-->
        <div class="todo-tags">
          <div class="tags-list">
            <el-tag
                v-for="(tag, index) in todoItem.tags"
                :key="tag"
                class="todo-tag"
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
              <input
                  ref="tagInput"
                  type="text"
                  placeholder="标签名"
                  @blur="showDialog = false"
                  @keydown="handleTagInputKeydown"
              />
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
import type { TodoItemEntity } from "@/universal/todo";

const props = defineProps<{
  todoItem: TodoItemEntity;
}>();

const emit = defineEmits([
  "update-todo-item",
  "remove-todo-item",
  "update-flag",
  "update-completed",
  "update-add-todo-form"
]);

const focused = ref(false);
const isCompleted = ref(false);


/**
 * 完成标记部分
 */
const handleComplete = async (id: number) => {
  if (id <= 0) {
    return;
  }
  props.todoItem.completed = true;
  isCompleted.value = true;
  setTimeout(() => {
    emit("update-completed", props.todoItem);
  }, 400);
};

/**
 * 标题部分
 */
// 获取焦点时,将focus状态设置为true
const titleInputOnFocus = () => {
  focused.value = true;
};

// 标题输入事件
const handleTitleInput = (e: InputEvent) => {
  props.todoItem.title = (e.target as HTMLInputElement).value;
};

const titleInputOnBlur = () => {
  if (!props.todoItem.title) {
    // 失去焦点时，如果标题为空，且id不为空，则删除该todoItem
    if (props.todoItem.id) {
      emit("remove-todo-item", props.todoItem.id);
    }
    focused.value = false;
  } else {
    if (!props.todoItem.id) {
      // 失去焦点时，如果标题不为空，且没有id，则通知父组件更新待提交表单
      emit("update-add-todo-form", props.todoItem);
    } else {
      // 失去焦点时，如果标题不为空，且有id 则通知父组件更新todoItem
      emit("update-todo-item", props.todoItem);
    }
    focused.value = false;
  }
};
/**
 * 描述部分
 */
const handleDescInput = (e: InputEvent) => {
  props.todoItem.remark = (e.target as HTMLInputElement).value;
};

const descInputOnBlur = () => {
  // 失去焦点时，如果描述不为空，且有id，则通知父组件更新todoItem
  if (props.todoItem.id) {
    emit("update-todo-item", props.todoItem);
  } else {
    // 失去焦点时，如果描述不为空，且没有id，则通知父组件更新待提交表单
    emit("update-add-todo-form", props.todoItem);
  }
}

/**
 * 删除标签部分
 */
const handleTagCloseClick = (index: number) => {
  props.todoItem.tags.splice(index, 1);
  if (props.todoItem.id) {
    emit("update-todo-item", props.todoItem);
  } else {
    emit("update-add-todo-form", props.todoItem);
  }
};

/**
 * 新增标签部分
 */
const tagInput = ref<HTMLInputElement | null>(null);
const showDialog = ref(false);

// 展示新增标签对话框
const showAddTagDialog = () => {
  showDialog.value = true;
  nextTick(() => {
    tagInput.value?.focus();
  });
};
// 处理新增标签对话框的键盘事件
const handleTagInputKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    const tag = tagInput.value?.value;
    let tags = props.todoItem.tags;
    if (tag && !tags.includes(tag) && tags.length <= 2) {
      props.todoItem.tags.push(tag);
      if (props.todoItem.id) {
        emit("update-todo-item", props.todoItem);
      } else {
        emit("update-add-todo-form", props.todoItem)
      }
    }
    showDialog.value = false;
  } else if (e.key === "Escape") {
    showDialog.value = false;
  }
};
/**
 * 标记important flag部分
 * @param newFlag
 */
const handleUpdateFlag = (newFlag: boolean) => {
  props.todoItem.flag = newFlag;
  console.log(props.todoItem)
  if (props.todoItem.id) {
    emit("update-todo-item", props.todoItem);
  } else {
    emit("update-add-todo-form", props.todoItem);
  }
};
</script>
<style scoped lang="less">
.item {
  display: flex;
  transition: all 0.7s ease-out;

  &.slide-out {
    opacity: 0;
    transform: translateX(100%);
  }

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
          border-color: var(--tag-border-color);
          background-color: var(--tag-bg-color);
        }
      }

      .tags-add {
        position: relative;
        width: 25px;
        height: 25px;
        color: #858585;
        background-color: var(--tag-bg-color);
        border: 1px solid var(--tag-border-color);
        padding: 2px 8px;
        border-radius: 5px;

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
            background-color: var(--tag-bg-color);
            border: 1px solid transparent;
            border-radius: 2px;
          }

          &:before {
            content: "";
            display: block;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: var(--tag-bg-color);
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }

    .line {
      &:after {
        content: "";
        display: block;
        width: 90%;
        height: 1px;
        background-color: var(--line-color);
        margin: 5px 0;
      }
    }
  }
}
</style>
