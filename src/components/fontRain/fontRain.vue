<template>
    <div class="font-rain" ref="fontRain">
        <p v-for="(list, index) in dataAllNum" :key="index" @animationiteration="changeData(index)"
            :class="`font-${index}`"></p>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import scss from './data.module.scss'
const props = defineProps({ data: String });
const fontRain = ref(null); // fontRain dom
const dataIndex = ref(computed(() => { return parseInt(scss.pNum) })); // 数据量
const dataAllNum = ref(computed(() => { return new Array(dataIndex.value).fill("") })); // 数据总数
const dataList = ref(props.data);// 字数据

onMounted(() => {
    randomDataList();
    getPContent();
})

// Fisher–Yates shuffle 洗牌算法 O(n2)
function randomDataList() {
    let newArr = []; // 新数组
    let arr = dataList.value; // 原数组
    while (dataList.value.length) { // 循环直到arr被清空
        let randomIndex = Math.floor(Math.random() * arr.length); // 获取随机数
        newArr.push(arr[randomIndex]); // 添加随机到的arr数据进入新数组
        arr.splice(randomIndex, 1); // 删除该数据
    }
    dataList.value = newArr;
}

// 开局为p元素内容赋值
function getPContent() {
    for (let i = 0; i < dataIndex.value; i++) {
        const fontDom = document.querySelector(`.font-${i}`);
        let randomIndex = Math.floor(Math.random() * dataList.value.length);
        let length = 0;
        fontDom.textContent = dataList.value[randomIndex];
        length = fontDom.textContent.length;
    }
}

// 改变当前p标签中数据
function changeData(index) {
    const fontDom = document.querySelector(`.font-${index}`);
    let randomIndex = Math.floor(Math.random() * dataList.value.length);
    fontDom.textContent = dataList.value[randomIndex];
}
</script>

<style lang="scss" scoped>
.font-rain {
    @import "./data.module.scss";

    $animationTime: 4;

    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100vh;

    p {
        width: fit-content;
        height: 100%;
        font-family: monospace;
        font-size: 20px;
        font-weight: bold;
        writing-mode: vertical-lr;
        word-break: break-all;
        white-space: pre-wrap;
        transition: all 0.3s linear;
        transform: translateY(-10vh);
        color: #eba0b3;
        text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px currentColor, 0 0 8px currentColor;
    }

    @for $i from 0 through $pNum {
        $randomAnimationTine: #{$animationTime + calc(random(10) / 10) - 1}s;
        // $randomAnimationTineNext: #{$animationTime + calc(random($fontLength) / 10) - 1}s;
        $delay: random($pNum);

        p:nth-child(#{$i}) {
            // height: $fontWidth;
            overflow: hidden;
            // animation: typing-#{$i} $randomAnimationTine steps($fontLength, end) #{$delay * 0.1s * -1} infinite;
            animation: typing-#{$i} $randomAnimationTine #{$delay * 0.1s * -1} infinite;
        }

        @keyframes typing-#{$i} {
            0% {
                opacity: 0;
            }

            40% {
                opacity: 0.4;
                transform: translateY(30vh);
            }

            60% {
                opacity: 0.8;
                transform: translateY(30vh);
            }

            100% {
                opacity: 1;
                transform: translateY(100vh);
            }
        }
    }
}
</style>