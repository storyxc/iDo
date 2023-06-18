<template>
  <div class="container">
    <el-form @submit.prevent>
      <el-checkbox v-model="preferences.startAtLogin" @change="handleStartAtLoginChange">Launch on system startup
      </el-checkbox>
      <el-form-item label="Update ">
        <el-select v-model="preferences.updateFrequency" placeholder="Select" size="small"
                   @change="handleUpdateFrequencyChange">
          <el-option v-for="(value, key) in UpdateFrequency" :key="key" :label="key" :value="value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { UpdateFrequency } from "@/universal/todo";

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

const handleUpdateFrequencyChange = async (updateFrequency: string) => {
  await window.api.changeUpdateFrequency(updateFrequency)
}


</script>
<style scoped lang="less">
.container {
  font-weight: 500;
}
</style>