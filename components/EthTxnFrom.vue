<template>
  <div class="eth-txn-form bg-blue-100 rounded-4px ">
    <TxnForm />
    <div class="p-8px">eth独有：<input type="text" v-model="pm.ethCustomValue.value" /></div>
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from "vue";
import type { ProcessManagerEth } from "~~/processList/useEth"
const pm = useProcessScheduler().processManager as ComputedRef<ProcessManagerEth>
</script>
