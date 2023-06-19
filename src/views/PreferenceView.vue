<template>
  <div class="container">
    <el-form @submit.prevent>
      <el-checkbox v-model="preferences.startAtLogin" @change="handleStartAtLoginChange">Launch on system startup
      </el-checkbox>
    </el-form>
  </div>
</template>
<script setup lang="ts">

const preferences = reactive({
  startAtLogin: false,
  updateFrequency: "never"
})

onMounted(async () => {
  // 获取开机自启
  const { startAtLogin, updateFrequency } = await window.api.getPreferences()
  preferences.startAtLogin = startAtLogin
  preferences.updateFrequency = updateFrequency
})

const handleStartAtLoginChange = async (enabled: boolean) => {
  await window.api.toggleAutoLaunch(enabled)
}


</script>
<style scoped lang="less">
.container {
  font-weight: 500;
}
</style>