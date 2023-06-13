<template>
  <div class="container">
    <div class="header">
      <div class="calendar">
        <i class="iconfont icon-calendar"></i>
        <span class="week">{{ week }}</span>
        <span class="date">{{ date }}</span>
        <!--<span class="todo-count">8</span>-->
      </div>
      <div class="options">
        <i class="iconfont icon-conditions"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import { onMounted } from "vue";

const week = ref('')
const date = ref('')

onMounted(() => {
  const weekArr = ['日', '一', '二', '三', '四', '五', '六']
  const dateObj = new Date()
  week.value = `周${ weekArr[dateObj.getDay()] }`
  date.value = `${ dateObj.getMonth() + 1 }月${ dateObj.getDate() }日`
})


</script>
<style lang="less" scoped>
.container {

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    font-weight: 450;
    color: #808080;

    .iconfont {
      font-size: 20px;
    }

    .calendar {
      display: inline-flex;
      align-items: center;

      i {
        cursor: pointer;
      }

      span {
        margin-left: 5px;
        cursor: default;
      }

      .todo-count {
        display: inline-table;
        width: 1.2em;
        height: 1.2em;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        text-align: center;
        line-height: 1.2em;
        vertical-align: middle;
      }
    }

    .options {
      i {
        cursor: pointer;
      }
    }
  }
}
</style>