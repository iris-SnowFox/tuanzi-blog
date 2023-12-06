<template>
    <div class="home-frame">
        <musicCanSee :audioSource="audioSource" :opacity="0.7"></musicCanSee>
    </div>
</template>

<script setup>
import musicCanSee from '@/components/musicCanSee/musicCanSee.vue';
import { ref } from 'vue';
const audioSource = ref([{
    src: 'src/assets/music/星と君が消えた日.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
    musicColor: 'rgb(255, 224, 0)'
}, {
    src: 'src/assets/music/だんご大家族.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
}, {
    src: 'src/assets/music/Moon Halo.mp3',
    img: 'src/assets/images/musicImg/maomao.png',
    musicColor: 'red'
}, {
    src: 'src/assets/music/Da Capo.flac',
    img: 'src/assets/images/musicImg/maomao.png',
    musicColor: 'black'
}]);

</script>

<style lang="scss" scoped>
.home-frame {
    padding: 10px;
}
</style>