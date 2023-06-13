<template>
  <div :class="[ { 'circle-solid' : !dotted, 'circle-dotted' : dotted } ]" @click="handleFinished"></div>
</template>
<script setup lang="ts">
defineProps({
  dotted: {
    type: Boolean,
    required: true,
    default: false
  }
})
const handleFinished = () => {
  alert('finished')
}
</script>
<style scoped lang="less">

.circle-solid {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #838383;
  margin-right: 14px;
  transform: translateY(3px);
}

.circle-dotted {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px dotted #838383;
  margin-right: 14px;
  transform: translateY(3px);
}

</style>