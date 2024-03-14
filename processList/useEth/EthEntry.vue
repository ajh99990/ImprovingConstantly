<template>
  <div class="eth-entry">
    <div class="flex flex-row items-center">
      <div>当前是eth流程</div>
      <button class="ml-16px" @click="switchProcessManager">切换到另一个流程</button>
    </div>
    <Calculator class="mt-8px"/>
    <EthTxnFrom class="mt-8px" />
  </div>
</template>

<script setup lang="ts">
import { ProcessNames } from "@/helper/enum"
import Calculator from "~/components/calculator/index.vue"
const { changeProcessManager, processManager } = useProcessScheduler()
const switchProcessManager = () => {
  if (processManager.value.name === ProcessNames.Eth) {
    changeProcessManager(ProcessNames.Tron, { transfer: true })
  } else {
    changeProcessManager(ProcessNames.Eth, { transfer: true })
  }
}
</script>