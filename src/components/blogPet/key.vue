<!-- 糖果组件 -->
<template>
    <div class="clone-candy" v-if="isCloneCandyDivOn" ref="cloneCandyDiv"></div>
    <div class="candy" ref="candy" draggable="true" @dragstart="startGrag" @dragend="dragEndCat" @drag="draging">
        <div class="tape"></div>
        <div class="body" ref="candyBody"></div>
    </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { throttle } from "../../utils/throttle";

const emit = defineEmits(["isAte"]);

const cloneCandyDiv = ref(null); // cloneCandyDiv dom
const candy = ref(null); // candy dom
const candyBody = ref(null); // candyBody dom

const cloneCandy = ref(null); // 糖果克隆体
const dragInDiv = ref(null); // 目前拖动到的div

const isCloneCandyDivOn = ref(false); // 糖果克隆体储存div是否开启

// 开始拖拽
function startGrag(e) {
    console.log(e);
    e.dataTransfer.setData('candy', 'candy');
    console.log("id", e.dataTransfer.getData('candy'));
    isCloneCandyDivOn.value = true;
    cloneCandy.value = e.target.cloneNode(true);
    cloneCandy.value.style = 'position:fixed;left:0;top:0;z-index:999;pointer-events:none;transform:translate( ' + (e.clientX - 60) + 'px ,' + (e.clientY - 40) + 'px);'
    nextTick(() => {
        cloneCandyDiv.value.appendChild(cloneCandy.value);
        e.target.style.opacity = 0;
    })
}

// 拖拽中
const draging = throttle((e) => {
    // console.log(e);
    if (cloneCandy.value) {
        cloneCandy.value.style.transform = 'translate( ' + (e.clientX - 60) + 'px ,' + (e.clientY - 40) + 'px)';
    }
}, 10);

// 查询当前拖拽到的div
const dragInWhatDiv = throttle((e) => {
    dragInDiv.value = document.elementFromPoint(e.clientX, e.clientY);
    // console.log(dragInDiv.value);
}, 50)

// 拖拽鼠标默认样式取消
document.addEventListener('dragover', function (e) {
    e.preventDefault();
    dragInWhatDiv(e);
    // e.dataTransfer.dropEffect = "move";
}, false);

// 拖拽结束
function dragEndCat(e) {
    // console.log("end:", e.target);
    // 总结当前糖果位置并取消克隆体
    cloneCandyDiv.value.removeChild(cloneCandy.value);
    isCloneCandyDivOn.value = false;
    e.target.style.transform = 'translate( ' + (e.clientX - 60) + 'px ,' + (e.clientY - 40) + 'px)';
    e.target.style.opacity = 1;
    cloneCandy.value = null;

    // 判断是否进入可吃范围
    if (dragInDiv.value.className === "neco-shoot-frame") {
        // e.draggable = false;
        candy.value.draggable = false;
        e.target.style.transform = 'translate(-50%, -50%)';
        // e.target.style.top = (e.clientX - 60) + 'px';
        // e.target.style.left = (e.clientY + 60) + 'px';
        e.target.style.right = (window.innerWidth - e.clientX - 130) + "px";
        e.target.style.bottom = (window.innerHeight - e.clientY - 100) + "px";
        setTimeout(() => {
            e.target.classList.add("candy-animation-ate");
        }, 200);
        setTimeout(() => {
            emit("isAte", "candyAte");
        }, 2200);
    }
}
</script>

<style lang="scss" scoped>
.candy-animation-ate {
    animation: 2s ease forwards eat-it;

    @keyframes eat-it {
        0% {
            transform: rotate(0deg);
        }

        60% {
            transform: rotate(360deg) scale(0.2);
            right: 76px;
            bottom: 20px;
        }

        100% {
            right: 76px;
            bottom: 20px;
            transform: rotate(720deg) scale(0);
        }
    }
}

.candy {
    z-index: 999;
    cursor: pointer;
    position: fixed;
    // top: 10%;
    // left: 10%;
    // transform: translate(-50%, -50%);
    transform: translate(50px, 20px);
    // transition: bottom 1s ease, right 1s ease;

    .body {
        position: relative;
        width: 120px;
        height: 80px;
        background: rgb(252, 120, 142);
        border-radius: 52% 48% 59% 41% / 59% 44% 56% 41%;
        border: 6px solid black;
        overflow: hidden;

        @mixin candyTextureSameStyle {
            content: "";
            position: absolute;
            border-radius: 50%;
        }

        &::before {
            @include candyTextureSameStyle();
            top: -26px;
            left: -30px;
            width: 18px;
            height: 80px;
            border-right: 22px solid rgb(255, 255, 255);
            border-top: 16px solid transparent;
            border-bottom: 16px solid transparent;
            border-left: 50px solid transparent;
            transform: rotate(20deg);
        }

        &::after {
            @include candyTextureSameStyle();
            top: -18px;
            left: 10px;
            width: 18px;
            height: 100px;
            border-right: 18px solid rgb(255, 255, 255);
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 60px solid transparent;
            transform: rotate(10deg);
        }
    }

    .tape {
        &::before {
            position: absolute;
            top: 28px;
            left: -30px;
            content: "";
            width: 80px;
            height: 40px;
            background: rgb(243, 116, 137);
            clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
            border-radius: 4px;
            border: 8px solid black;
            transform: rotate(-10deg);
        }

        &::after {
            position: absolute;
            top: 10px;
            left: 64px;
            content: "";
            width: 80px;
            height: 40px;
            background: rgb(243, 116, 137);
            clip-path: polygon(0 0, 100% 16%, 100% 84%, 0 100%);
            border: 8px solid black;
            border-radius: 4px;
            transform: rotate(170deg);
        }
    }
}
</style>