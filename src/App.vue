<template>
  <div id="app">
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

<style scoped></style>
