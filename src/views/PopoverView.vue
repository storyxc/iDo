<template>
  <div class="container">
    <div class="header">
      <div class="calendar">
        <i class="iconfont icon-calendar"></i>
        <span class="week">周六</span>
        <span class="date">6月10日</span>
        <span class="todo-count">8</span>
      </div>
      <div class="options">
        <i class="iconfont icon-conditions"></i>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="less" scoped>
.container {
  width: 100%;
  margin: 10px 0;
  padding: 0 15px;

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