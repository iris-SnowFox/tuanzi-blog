<template>
    <div class="menu-frame" ref="menuFrame">
        <ul>
            <li><span ref="butCai">技术榨菜</span>
                <div class="font-ball" @mouseenter="mouseInCai" @mouseleave="mouseOutCai">菜</div>
            </li>
            <li><span ref="butYan">博客留言</span>
                <div class="font-ball" @mouseenter="mouseInYan" @mouseleave="mouseOutYan">言</div>
            </li>
            <li><span ref="butWu">关于博主</span>
                <div class="font-ball" @mouseenter="mouseInWu" @mouseleave="mouseOutWu">吾</div>
            </li>
            <li><span ref="butZu">生活足迹</span>
                <div class="font-ball" @mouseenter="mouseInZu" @mouseleave="mouseOutZu">足</div>
            </li>
            <li><span ref="butLian">友情链接</span>
                <div class="font-ball" @mouseenter="mouseInLian" @mouseleave="mouseOutLian">链</div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
    message: String
})

const menuFrame = ref(null); // menuFrame DOM
const butCai = ref(null); // butCai DOM
const butYan = ref(null); // butYan DOM
const butWu = ref(null); // butWu DOM
const butZu = ref(null); // butZu DOM
const butLian = ref(null); // butLian DOM
const message = computed(() => { return props.message }); // 外部消息传入

watch(message, () => {
    if (message.value === "open") {
        menuFrame.value.classList.add("ball-move-anime");
    }
})

// 鼠标移动至菜
function mouseInCai() {
    butCai.value.style.opacity = "1";
}
function mouseOutCai() {
    butCai.value.style.opacity = "0";
}

// 鼠标移动至言
function mouseInYan() {
    butYan.value.style.opacity = "1";
}
function mouseOutYan() {
    butYan.value.style.opacity = "0";
}

// 鼠标移动至吾
function mouseInWu() {
    butWu.value.style.opacity = "1";
}
function mouseOutWu() {
    butWu.value.style.opacity = "0";
}

// 鼠标移动至足
function mouseInZu() {
    butZu.value.style.opacity = "1";
}
function mouseOutZu() {
    butZu.value.style.opacity = "0";
}

// 鼠标移动至链
function mouseInLian() {
    butLian.value.style.opacity = "1";
}
function mouseOutLian() {
    butLian.value.style.opacity = "0";
}
</script>

<style lang="scss" scoped>
.ball-move-anime {
    animation: 2s ease alternate forwards ball-move;

    @keyframes ball-move {
        0% {
            right: -50px;
        }

        100% {
            right: 50px;
        }
    }
}

.menu-frame {
    position: fixed;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);

    ul {
        display: flex;
        flex-direction: column;

        li {
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            height: 40px;
            position: relative;
            cursor: pointer;

            span {
                position: relative;
                padding: 6px 12px 6px 12px;
                border-radius: 2px;
                background-color: black;
                box-shadow: 4px 6px 7px -5px rgba(0, 0, 0, 0.68);
                color: white;
                font-size: 16px;
                font-weight: 500;
                opacity: 0;
                transition: opacity 1s ease;
                &::before {
                    position: absolute;
                    top: 10px;
                    right: -6px;
                    content: "";
                    width: 6px;
                    height: 12px;
                    background: black;
                    clip-path: polygon(0 0, 0 100%, 100% 50%);
                }
            }

            .font-ball {
                position: relative;
                margin-left: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 36px;
                height: 36px;
                background: white;
                border: 4px black solid;
                border-radius: 50%;
                box-shadow: 2px 1px 10px -3px rgba(0, 0, 0, 0.68);
                font-size: 20px;
                font-weight: 700;

                &::before {
                    position: absolute;
                    top: -10px;
                    left: 26px;
                    content: "";
                    width: 16px;
                    height: 14px;
                    background: black;
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                    transform: rotate(36deg);
                }

                &::after {
                    position: absolute;
                    top: -10px;
                    left: -6px;
                    content: "";
                    width: 16px;
                    height: 14px;
                    background: black;
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                    transform: rotate(-36deg);
                }
            }
        }
    }
}
</style>