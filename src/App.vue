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
}, {
  src: 'src/assets/music/Anytime Anywhere.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'Anytime Anywhere',
  musicColor: 'rgb(206, 206, 206)'
}, {
  src: 'src/assets/music/WHITE ALBUM .mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'WHITE ALBUM',
  musicColor: 'rgb(246, 255, 254)'
}, {
  src: 'src/assets/music/届かない恋.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '届かない恋',
  musicColor: 'rgb(246, 255, 254)'
}, {
  src: 'src/assets/music/鳥の詩.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '鳥の詩',
  musicColor: 'rgb(255, 208, 55)'
}, {
  src: 'src/assets/music/The Meteor Shower.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'The Meteor Shower',
  musicColor: 'rgb(59, 45, 166)'
}, {
  src: 'src/assets/music/遠い空へ-.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '遠い空へ',
  musicColor: 'white'
}, {
  src: 'src/assets/music/アイドル.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'アイドル',
  musicColor: 'rgb(115, 0, 157)'
}, {
  src: 'src/assets/music/eternal reality.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'eternal reality',
  musicColor: 'rgb(100, 192, 213)'
}, {
  src: 'src/assets/music/Asterism.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'Asterism',
}, {
  src: 'src/assets/music/平行線.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '平行線',
  musicColor: 'black'
}, {
  src: 'src/assets/music/神様の神様.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '神様の神様',
}, {
  src: 'src/assets/music/エウテルペ.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'エウテルペ',
  musicColor: 'black'
}, {
  src: 'src/assets/music/きみと恋のままで終われない いつも夢のままじゃいられない.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'きみと恋のままで終われない いつも夢のままじゃいられない',
  musicColor: 'orange'
}, {
  src: 'src/assets/music/朝焼けのスターマイン.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '朝焼けのスターマイン',
  musicColor: 'blue'
}, {
  src: 'src/assets/music/Ring of Fortune.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'Ring of Fortune',
  musicColor: 'blue'
}, {
  src: 'src/assets/music/My Soul,Your Beats!.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'My Soul,Your Beats!',
  musicColor: 'white'
}, {
  src: 'src/assets/music/茜さす.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '茜さす',
  musicColor: 'orange'
}, {
  src: 'src/assets/music/愛してる.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '愛してる',
  musicColor: 'orange'
}, {
  src: 'src/assets/music/secret base ~君がくれたもの.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'secret base ~君がくれたもの',
  musicColor: 'white'
}, {
  src: 'src/assets/music/火炎.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '火炎',
  musicColor: 'red'
}, {
  src: 'src/assets/music/光るなら.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '光るなら',
  musicColor: 'orange'
}, {
  src: 'src/assets/music/オレンジ.flac',
  img: 'src/assets/images/musicImg/maomao.png',
  name: 'オレンジ',
  musicColor: 'orange'
}, {
  src: 'src/assets/music/希望之花.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '希望之花',
  musicColor: 'grey'
}, {
  src: 'src/assets/music/紅蓮華.mp3',
  img: 'src/assets/images/musicImg/maomao.png',
  name: '紅蓮華',
  musicColor: 'red'
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
