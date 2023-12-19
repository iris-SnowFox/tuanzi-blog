<template>
    <header>
        <div class="header-background">
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
        </div>
    </header>
    <main>
        <div class="home-main-frame">
        </div>
    </main>
    <aside>
        <musicCanSee :audioSource="audioSource" :opacity="0.7"></musicCanSee>
    </aside>
    <footer>
        <div class="home-footer-frame">
        </div>
    </footer>
</template>

<script setup>
import musicCanSee from '@/components/musicCanSee/musicCanSee.vue';
import { useMessage } from '@/utils/message.jsx';
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

</script>

<style lang="scss" scoped>
header {
    width: 100%;
    border: 4px solid black;

    .header-background {
        $showFont: "あなたは十分やった",
            "生きて",
            "もう十分です",
            "すべてはあなたのせいではありません",
            "ご健康をお祈り",
            "無事に帰ってきますね",
            "ありがとう",
            "君が安らかでありますように";
        $pNum: 40;
        $animationTime: 4;

        z-index: -1;
        display: flex;
        justify-content: space-around;
        height: 360px;

        @function randomFont() {
            @return nth($showFont , random(length($showFont)));
        }

        p {
            position: relative;
            width: fit-content;
            height: 100%;
            font-family: monospace;
            font-size: 20px;
            font-weight: bold;
            writing-mode: vertical-lr;
            word-break: break-all;
            white-space: pre-wrap;

            &::before,
            &::after {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            &::before {
                color: #eba0b3;
                text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px currentColor, 0 0 8px currentColor;
            }
        }

        @for $i from 0 through $pNum {
            $fontContent: randomFont();
            $fontContentNext: randomFont();
            $fontLength: str-length($fontContent);
            $fontWidth: #{$fontLength*2}ch;
            $randomAnimationTine: #{$animationTime + calc(random($fontLength) / 10) - 1}s;
            $randomAnimationTineNext: #{$animationTime + calc(random($fontLength) / 10) - 1}s;
            $delay: random($pNum);

            p:nth-child(#{$i})::before {
                z-index: 1;
                content: $fontContent;
                height: $fontWidth;
                white-space: nowrap;
                overflow: hidden;
                animation: typing-#{$i} $randomAnimationTine steps($fontLength, end) #{$delay * 0.1s * -1} infinite;
            }

            p:nth-child(#{$i})::after {
                z-index: 3;
                position: absolute;
                top: 0;
                left: 0;
                content: '';
                background: linear-gradient(#fff, #fff, #fff,#fff, transparent 85%, transparent 65%, transparent);
                background-size: 100% 220%;
                background-repeat: no-repeat;
                animation: mask $randomAnimationTine linear #{($delay - 2) * 0.1s * -1} infinite;
            }

            @keyframes typing-#{$i} {
                0% {
                    height: 0;
                }

                35% {
                    height: $fontWidth;
                }

                100% {
                    height: $fontWidth;
                }
            }

            @keyframes mask {
                0% {
                    background-position: 0 220%;
                }

                80% {
                    background-position: 0 0%;
                }

                100% {
                    background-position: 0 0%;
                }
            }
        }
    }
}

main {
    width: 100%;
    border: 4px solid rgb(196, 192, 192);
}

aside {
}

footer {
    width: 100%;
    border: 4px solid black;
}
</style>