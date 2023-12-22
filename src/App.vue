<template>
  <div id="app">
    <div id="message-frame"></div>
    <musicCanSee :audioSource="audioSource" :opacity="0.7"></musicCanSee>
    <router-view></router-view>
  </div>
</template>

<script setup>
import musicCanSee from '@/components/musicCanSee/musicCanSee.vue';
import { ref } from 'vue';

const audioSource = ref([{
    src: 'src/assets/music/星と君が消えた日.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
    name: '星と君が消えた日',
    musicColor: 'rgb(255, 224, 0)'
}, {
    src: 'src/assets/music/だんご大家族.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
    name: 'だんご大家族',
}, {
    src: 'src/assets/music/Moon Halo.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
    name: 'Moon Halo',
    musicColor: 'red'
}, {
    src: 'src/assets/music/Da Capo.flac',
    img: 'src/assets/images/musicImg/maomao.png',
    name: 'Da Capo',
    musicColor: 'black'
}]);
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
