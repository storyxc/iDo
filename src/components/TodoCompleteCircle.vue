<template>
  <div :class="[ { 'circle-solid' : id, 'circle-dotted' : id <= 0 } ]" @click="handleComplete">
    <div class="circle-fill">
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

const emit = defineEmits(['todo-complete'])

const handleComplete = (e: MouseEvent) => {
  if (props.id <= 0) {
    return
  }
  // 添加circle-fill动画
  const circleFill = (e.target as HTMLElement).querySelector('.circle-fill');
  circleFill!.classList.add('animate-circle-fill');
  emit('todo-complete', props.id)
}
</script>
<style scoped lang="less">

.circle-solid {
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #838383;
  margin-right: 14px;
  transform: translateY(1px);
}

.circle-dotted {
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px dotted #838383;
  margin-right: 14px;
  transform: translateY(1px);
}

.circle-fill {
  border-radius: 50%;
  top: 1px;
  left: 1px;
  bottom: 1px;
  right: 1px;
  position: absolute;
  background-color: #838383;
  transform: scale(0);
}

.animate-circle-fill {
  transform: scale(1);
}

</style>