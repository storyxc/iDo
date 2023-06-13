<template>
  <div class="item">
    <complete-circle :dotted="dotted"/>
    <div class="todo-info">
      <input type="text"
             :class="['todo-input', focused ? 'todo-title-focused' : 'todo-title']"
             @blur="titleInputOnBlur"
             @focus="titleInputOnFocus"
             v-model="todoForm.title"/>
      <div :class="[ {'display-none' : !focused } ]">
        <input class="todo-desc todo-input" type="text" v-model="todoForm.remark" placeholder="备注"/>
        <!--标签-->
        <div class="todo-tags">
          <div class="tags-list">
            <input
                v-for="tag in todoForm.tags"
                :key="tag"
                class="todo-tag"

                :value="tag"
            />
          </div>
          <div class="tags-add">#</div>
          <todo-flag :flag="todoForm.flag"/>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TodoItemEntity } from "@/types/todo";
import { Ref } from "vue";
import TodoFlag from "@/components/widget/TodoFlag.vue";

const dotted: Ref<boolean> = ref(true)
const focused: Ref<boolean> = ref(false)

const todoForm: TodoItemEntity = reactive({
  title: '',
  remark: '',
  tags: [],
  flag: false,
  completed: false
})

const emit = defineEmits(['addTodo', 'editFocused'])

/**
 * 获取焦点时，将focus状态设置为true
 */
const titleInputOnFocus = () => {
  focused.value = true
}

/**
 * 失去焦点时，如果标题为空，则填充默认标题
 */
const titleInputOnBlur = () => {
  if (!todoForm.title) {
    todoForm.title = '新待办事项'
    dotted.value = false
    emit('editFocused')
  }
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

    input {
      display: block;
      width: 90%;

      &.todo-title {
        font-size: 14px;
        font-weight: 500;
        height: 69px;
        margin-bottom: 2px;
      }

      &.todo-title-focused {
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