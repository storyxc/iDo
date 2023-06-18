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
  width: 25px;
  height: 25px;
  margin-left: 10px;
  border: 1px solid var(--tag-border-color);
  border-radius: 5px;
  background-color: var(--tag-bg-color);

  .todo-flag {
    &-n {
      padding: 2px 3px;
      color: #858585;
    }

    &-y {
      padding: 2px 3px;
      color: #ff0000;
    }
  }
}
</style>