<!-- 小黑猫组件 -->
<template>
    <div class="neco" ref="necoButtom" @click="clickCat">
        <div class="face-and-eyes"></div>
        <div class="eyebrow-l"></div>
        <div class="eyebrow-r"></div>
        <div class="ears"></div>
        <div class="mouse"></div>
    </div>
    <div class="neco-shoot-frame" @dragenter="dragInCat" @dragleave="dragOutCat"></div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { throttle } from "../../utils/throttle";

const props = defineProps({
    message: String
})
const emit = defineEmits(["clickNeco", "isOpenMenu"]);

const necoButtom = ref(null); // necoButtom dom
const clickMessage = ref(false); // 点击事件开关
const dragDiv = ref(null); // 储存正在被拖拽的元素
const message = computed(() => { return props.message }); // 外部消息传入

// 监听传入消息
watch(message, () => {
    if (message.value === "candyAte") {
        emit("isOpenMenu", "open");
        necoButtom.value.className = "neco";
    }
})

// 开启聊天室
function clickCat() {
    emit("clickNeco", clickMessage.value);
    clickMessage.value = !clickMessage.value;
}

// 拖拽到猫上
const dragInCat = throttle((e) => {
    // console.log("id", dragId);
    // console.log(e);
    necoButtom.value.className = "neco-hope";
}, 500);
// 拖拽离开猫猫
const dragOutCat = throttle((e) => {
    necoButtom.value.className = "neco-ogoda";
}, 500)

</script>

<style lang="scss" scoped>
.neco-shoot-frame {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 400px;
    height: 300px;
    border-top-left-radius: 50%;

    &::before {
        z-index: 5;
        content: "";
        cursor: pointer;
        width: 100%;
        height: 100%;
    }
}

.neco {
    position: fixed;
    right: 50px;
    bottom: 30px;
    width: 160px;
    height: 120px;
    animation: 2.8s ease infinite alternate move-body;

    @keyframes move-body {
        0% {
            transform: rotate(0deg);
        }

        50% {
            transform: rotate(-2deg);
        }

        100% {
            transform: rotate(2deg);
        }
    }

    .face-and-eyes {
        width: 100%;
        height: 100%;
        background: #000;
        border-radius: 49% 51% 49% 51% / 62% 57% 43% 38%;
        border: 4px solid black;

        @mixin doubleEyes {
            position: absolute;
            content: '';
            width: 28px;
            height: 28px;
            background: #620f21;
            background: radial-gradient(circle at 10px 8px, #fff 4px, transparent 5px),
                radial-gradient(circle at 6px 16px, #fff 2px, transparent 3px) rgb(82, 0, 34) no-repeat;
            box-shadow: 0 0 0 6px #ffefef;
            border-radius: 50%;
        }

        &::before {
            @include doubleEyes();
            left: 30px;
            top: 32px;
        }

        &::after {
            @include doubleEyes();
            right: 36px;
            top: 36px;
        }
    }

    @mixin eyebrowFrame {
        position: absolute;
        width: 18px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #fff;
        border-width: 2px 0 0 0;
    }

    .eyebrow-l {
        @include eyebrowFrame();
        left: 44px;
        top: 12px;
        transform: rotate(40deg);

        &::before {
            @include eyebrowFrame();
            content: '';
            left: 2px;
            top: -6px;
            transform: rotate(16deg);
        }

        &::after {
            @include eyebrowFrame();
            content: '';
            left: -2px;
            top: 4px;
            transform: rotate(-20deg);
        }
    }

    .eyebrow-r {
        @include eyebrowFrame();
        right: 52px;
        top: 14px;
        transform: rotate(-36deg);

        &::before {
            @include eyebrowFrame();
            content: '';
            left: -2px;
            top: -7px;
            transform: rotate(-14deg);
        }

        &::after {
            @include eyebrowFrame();
            content: '';
            left: 2px;
            top: 4px;
            transform: rotate(20deg);
        }
    }

    .ears {
        &::before {
            z-index: -1;
            position: absolute;
            top: -22px;
            left: -20px;
            content: '';
            width: 50px;
            height: 50px;
            border-radius: 74% 26% 43% 57% / 100% 100% 0% 0%;
            background-color: #5a2f2f;
            transform: rotate(-40deg);
            border: 4px solid #000;
            border-width: 5px 18px 0 10px;
            box-shadow: inset 10px -2px 0 #905050,
                inset 30px -2px 0 #784343;
            animation: 0.5s ease infinite alternate ear-l-move;

            @keyframes ear-l-move {
                to {
                    border-radius: 64% 36% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }

        &::after {
            z-index: -1;
            position: absolute;
            top: -20px;
            right: -32px;
            content: '';
            width: 58px;
            height: 54px;
            border-radius: 26% 74% 43% 57% / 100% 100% 0% 0%;
            background-color: #5a2f2f;
            transform: rotate(40deg);
            border: 4px solid #000;
            border-width: 5px 10px 0 18px;
            box-shadow: inset -10px -2px 0 #905050,
                inset -30px -2px 0 #784343;
            animation: 0.5s ease infinite alternate ear-r-move;

            @keyframes ear-r-move {
                to {
                    border-radius: 34% 66% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }
    }

    .mouse {
        position: absolute;
        top: 66px;
        left: 40px;
        width: 60px;
        height: 40px;
        background: rgb(166, 44, 77);
        border-radius: 46% 54% 50% 50% / 34% 30% 70% 66%;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 24px;
            width: 60px;
            height: 24px;
            background: rgb(185, 103, 125);
            border-radius: 47% 53% 50% 50% / 71% 71% 29% 29%;
        }

        &::after {
            content: "";
            position: absolute;
            top: -2px;
            left: 42px;
            border-top: 14px solid #ebebeb;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            transform: rotate(12deg);
        }
    }
}

.neco-hope {
    @extend .neco;
    animation: 1s ease infinite alternate jump;

    @keyframes jump {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(5px);
        }

        100% {
            transform: translateY(-10px);
        }
    }

    .face-and-eyes {
        &::before {
            animation: 0.1s ease infinite alternate eye-light-run;

            @keyframes eye-light-run {
                to {
                    background: radial-gradient(circle at 11px 7px, #fff 4px, transparent 5px),
                        radial-gradient(circle at 7px 15px, #fff 2px, transparent 3px) rgb(82, 0, 34) no-repeat;
                }
            }
        }

        &::after {
            animation: 0.1s ease infinite alternate eye-light-run;

            @keyframes eye-light-run {
                to {
                    background: radial-gradient(circle at 11px 7px, #fff 4px, transparent 5px),
                        radial-gradient(circle at 7px 15px, #fff 2px, transparent 3px) rgb(82, 0, 34) no-repeat;
                }
            }
        }
    }

    .ears {
        &::before {
            animation: 0.1s ease infinite alternate ear-l-move;

            @keyframes ear-l-move {
                to {
                    border-radius: 64% 36% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }

        &::after {
            animation: 0.1s ease infinite alternate ear-r-move;

            @keyframes ear-r-move {
                to {
                    border-radius: 34% 66% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }
    }

    .mouse {
        animation: 1s ease infinite alternate mouse-on;

        @keyframes mouse-on {
            to {
                height: 44px;
            }
        }
    }
}

.neco-ogoda {
    @extend .neco;
    animation-duration: 10ms;

    .ears {
        &::before {
            animation: 50ms ease infinite alternate ear-l-move;

            @keyframes ear-l-move {
                to {
                    border-radius: 64% 36% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }

        &::after {
            animation: 50ms ease infinite alternate ear-r-move;

            @keyframes ear-r-move {
                to {
                    border-radius: 34% 66% 100% 0% / 100% 100% 0% 0%;
                }
            }
        }
    }

    .eyebrow-l {
        transform: rotate(210deg);

        &::before {
            transform: rotate(-10deg);
        }

        &::after {
            transform: rotate(16deg);
        }
    }

    .eyebrow-r {
        transform: rotate(-216deg);

        &::before {
            transform: rotate(16deg);
        }

        &::after {
            transform: rotate(-14deg);
        }
    }

    .mouse {
        top: 66px;
        left: 60px;
        width: 20px;
        height: 20px;
        background: rgb(166, 44, 77);
        border-radius: 52% 48% 49% 51% / 85% 86% 14% 15%;
        overflow: hidden;

        &::before {
            content: none;
        }

        &::after {
            content: none;
        }
    }
}
</style>