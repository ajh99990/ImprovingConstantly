<template>
  <div class="flex flex-row items-center pb-8px justify-between w-full border-transparent border-b-gray-300 border-solid border-1px">
    导航：
    <div @click="jumpto('/')" :style="route.name === 'home' ? 'color:blue;' : ''"
      class=" cursor-pointer text-center leading-24px flex-1 bg-gray-50  border-transparent border-r-gray-300 border-solid border-1px">
      基本功能测试页
    </div>
    <div :style="route.name === 'i18n' ? 'color:blue;' : ''" @click="jumpto('/testi18n')"
      class="cursor-pointer text-center leading-24px flex-1 bg-gray-50 ">
      国际化测试页
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
watchEffect(() => {
  console.log(route.name)
})
const jumpto = (to: string) => {
  router.push(to)
}
</script>