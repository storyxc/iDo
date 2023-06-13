<template>
  <div class="flag">
    <i :class="['iconfont', 'icon-wodeokr', flag ? 'todo-flag-y' : 'todo-flag-n' ]"
       @click="$emit('update-flag', !props.flag)"></i>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  flag: {
    type: Boolean,
    default: false
  }
})

</script>
<style scoped lang="less">

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
</style>