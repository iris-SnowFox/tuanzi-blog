<template>
    <div class="home-frame">
        <musicCanSee :audioSource="audioSource" :opacity="0.7"></musicCanSee>
    </div>
    <button @click="openMsgSuccess()">点我一下</button>
    <button @click="openMsgWarning()">点我一下</button>
    <button @click="openMsgError()">点我一下</button>
    <button @click="openMsgInfo()">点我一下</button>
</template>

<script setup>
import musicCanSee from '@/components/musicCanSee/musicCanSee.vue';
import { useMessage } from '@/utils/message.jsx';
import { ref } from 'vue';
function openMsgSuccess() {
    useMessage('success');
}
function openMsgWarning() {
    useMessage('warning');
}
function openMsgError() {
    useMessage('error');
}
function openMsgInfo() {
    useMessage();
}
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

</script>

<style lang="scss" scoped>
.home-frame {
    padding: 10px;
}
</style>