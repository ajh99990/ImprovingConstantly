<template>
  <div class="home-page pb-200px px-12px pt-12px bg-white w-full min-h-100vh flex flex-col box-border">
    <MenuBar class="mb-16px"/>
    <component :is="processManager.entry" />
    <br />
    <br />
    <ExamplePersistentState />
    <br />
    <br />
    <ExampleAxios />
    <br />
    <br />
    <TxnForm />

  </div>
</template>

<script setup lang="ts">
import ExampleAxios from "~~/components/exampleAxios/index.vue"
import TxnForm from "~~/components/txnForm/index.vue"
const { processManager } = useProcessScheduler()
</script>
