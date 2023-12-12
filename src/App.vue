<template>
  <div id="app">
    <div id="message-frame"></div>
    <router-view></router-view>
  </div>
</template>

<script setup>
/*
  首屏时间计算
    1. DOMContentLoaded 绑定这个监听器
    2. performance 获取
*/
// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log(event);
// })

// performance监听
// const startTimeByPerformance = performance.getEntriesByName('first-contentful-paint')[0].startTime;
// console.log(startTimeByPerformance);  
</script>


<style scoped>
#message-frame {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
