<template>
  <DefaultLayout>
    <router-view v-slot="{ Component }">
      <Transition :name="transitionName" @after-enter="onAfterEnter" @before-leave="onBeforeLeave"
        @enter-cancelled="onEnterCancelled">
        <keep-alive :include="keepaliveList">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "~/layouts/default.vue";
const globalData = useGlobalData();
const i18n = useI18n();
i18n.locale.value = globalData.language;

let newPageName = "";
let oldPageName = "";
let scrollTopStore = new Map();

const handleNewPage = (el: any, newPageName: string) => {
  if (el) {
    el.style.removeProperty("top");
  }
  /** fixed布局的元素也要做处理 */
  const doms = el.getElementsByClassName("anima-fixed-dom");
  for (let i = 0; i < doms.length; i++) {
    const item = doms[i];
    const key = item.getAttribute("anima-fix-key") || "";
    const name = `${newPageName}${item.tagName}${key}`;
    const t = scrollTopStore.get(name);
    item.style.top = `${t || 0}px`;
    //item.className = item.className.replace(/\banima-fix\b/g, "");
  }

  const html = document.querySelector("html");
  const scrollTop = scrollTopStore.get(newPageName) || 0;
  if (html) {
    html.scrollTop = scrollTop;
  }
};

//【开始时】el是旧页面
function onBeforeLeave(el: any) {
  //方案2 fixed
  const html = document.querySelector("html");
  if (html) {
    const scrollTop = html?.scrollTop;
    oldPageName && scrollTopStore.set(oldPageName, scrollTop);
    if (el) {
      el.style.top = `-${scrollTop}px`;
    }
    /** 页面上fixed布局的元素也要做处理 */
    const doms = el.getElementsByClassName("anima-fixed-dom");
    for (let i = 0; i < doms.length; i++) {
      const item = doms[i];
      const key = item.getAttribute("anima-fix-key") || "";
      const name = `${oldPageName}${item.tagName}${key}`;
      const originTop = Number.parseInt(item.style.top) || 0;
      scrollTopStore.set(name, originTop);
      item.style.top = `${scrollTop + originTop}px`;
      //item.className += " anima-fix";
    }
  }
}

//【结束时】el是 新页面
function onAfterEnter(el: any) {
  handleNewPage(el, newPageName);
}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el: any) {
  handleNewPage(el, oldPageName);
}

const keepaliveList = ["i18n", 'index'];
const transition = ["fold-left", "fold-right", "fade"];
let transitionName = ref(transition[0]);
const route = useRoute();
watch(
  () => route.name,
  (newName: any, oldName: any) => {
    newPageName = newName;
    oldPageName = oldName;
  }
);

watch(
  () => route.meta,
  (newMeta: any, oldMeta: any) => {
    const newIndex = newMeta.index;
    const oldIndex = oldMeta.index;
    if (newIndex > oldIndex) {
      //进入下一层级
      //进入下一层级的时候，新页面是【左《= 右】 进入，旧页面是 【左《= 右】移出
      //但是旧页面只移走一半，新页面是整个进来
      transitionName.value = transition[0];
    } else if (newIndex < oldIndex) {
      //返回上一层级
      //返回上一层级的时候，新页面是【左 =》右】进入，旧页面是 【左 =》右】移出
      //旧页面是整个移走，新页面是半个进来
      transitionName.value = transition[1];
    } else {
      //同级切换不做任何动画效果（因为产品要求首页tabbar切换不做动画）
      transitionName.value = transition[2];
    }
  }
);

</script>

<style lang="scss">
.fold-right-enter-active {
  position: fixed;
  top: 0;
  animation-name: fold-right-in;
  animation-duration: 0.4s;
}

.fold-right-leave-active {
  position: fixed;
  top: 0;
  animation-name: fold-right-out;
  animation-duration: 0.4s;
  z-index: 99;
}

.fold-left-enter-active {
  position: fixed;
  top: 0;
  animation-name: fold-left-in;
  animation-duration: 0.4s;
  z-index: 99;
}

.fold-left-leave-active {
  position: fixed;
  top: 0;
  animation-name: fold-left-out;
  animation-duration: 0.4s;
}

.fade-enter-active,
.fade-leave-active {
  //transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  //opacity: 0;
}

//向左进入
@keyframes fold-left-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

//向左移出
@keyframes fold-left-out {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-30%);
  }
}

//向右进入
@keyframes fold-right-in {
  0% {
    transform: translateX(-30%);
  }

  100% {
    transform: translateX(0);
  }
}

//向右移出
@keyframes fold-right-out {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>
