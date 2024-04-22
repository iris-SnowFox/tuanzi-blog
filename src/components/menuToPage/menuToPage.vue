<template>
    <div class="page-frame" v-if="isShow" ref="pageDiv">
        <div class="mask" v-show="!isConShow" @click="returnPage" ref="maskDiv"></div>
        <div class="page-all-content" v-show="isConShow">
            <div class="page-intro">
                <div class="back">◀</div>
                <div class="page-name">{{ pageName }}</div>
                <div class="mini" @click="toMini">﹣</div>
                <div class="over" @click="closePage">×</div>
            </div>
            <div class="content"></div>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue"

const props = defineProps({
    pageMessage: String
})
const emit = defineEmits(["closeMessage"]);

const pageMessage = computed(() => {
    return props.pageMessage;
}); // 菜单栏点击信息

const pageDiv = ref(null); // pageDiv DOM
const maskDiv = ref(null); // maskDiv DOM

const isShow = ref(false); // 是否打开页面
const isConShow = ref(true); // 是否显示内容
const pageName = ref(""); // 本页页名

// 筛选名字方法
function whatNameOfPage() {
    if (pageMessage.value === "cai") {
        pageName.value = "技术榨菜";
    } else if (pageMessage.value === "yan") {
        pageName.value = "博客留言";
    } else if (pageMessage.value === "wu") {
        pageName.value = "关于博主";
    } else if (pageMessage.value === "zu") {
        pageName.value = "生活足迹";
    } else {
        pageName.value = "友情链接";
    }
}

// 最小化结束方法
function miniOutFn() {
    maskDiv.value.classList.remove("mask-open");
    pageDiv.value.classList.remove("page-mini");
    pageDiv.value.classList.add("page-max");
    maskDiv.value.classList.add("mask-out");
    setTimeout(() => {
        maskDiv.value.classList.remove("mask-out");
        isConShow.value = true;
        pageDiv.value.classList.remove("page-max");
    }, 1000);
}

// 监听菜单栏点击获取的消息
watch(pageMessage, () => {
    if (isConShow.value === false) {
        miniOutFn();
        setTimeout(() => {
            whatNameOfPage();
        }, 1000);
    } else {
        if (pageMessage.value != "close") {
            isShow.value = true;
            nextTick(() => {
                if (pageName.value === "") {
                    pageDiv.value.classList.add("page-show");
                    setTimeout(() => {
                        pageDiv.value.classList.remove("page-show");
                    }, 2000);
                    whatNameOfPage();
                } else if (pageMessage.value !== pageName.value) {
                    pageDiv.value.classList.add("page-none");
                    setTimeout(() => {
                        pageDiv.value.classList.remove("page-none");
                        pageDiv.value.classList.add("page-show");
                        whatNameOfPage();
                    }, 1000);
                    setTimeout(() => {
                        pageDiv.value.classList.remove("page-show");
                    }, 2000);
                }
            })
        }
    }
})

// 最小化
function toMini() {
    pageDiv.value.classList.add("page-mini");
    setTimeout(() => {
        isConShow.value = false;
        maskDiv.value.classList.add("mask-open");
    }, 1000);
}

// 最小化取消
function returnPage() {
    miniOutFn();
}

// 关闭页面
function closePage() {
    pageDiv.value.classList.add("page-none");
    setTimeout(() => {
        pageName.value = "";
        emit("closeMessage", "close");
        isShow.value = false;
    }, 500);
}
</script>

<style lang="scss" scoped>
@mixin showContent {
    animation: 1s ease alternate forwards show-content;

    @keyframes show-content {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
}

@mixin closeContent {
    animation: 0.5s ease alternate forwards none-content;

    @keyframes none-content {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
}

.page-max {
    animation: 0.25s ease alternate forwards receive-page-back, 0.5s ease alternate forwards max-page;

    @keyframes max-page {
        0% {
            width: 50px;
            height: 50px;
        }

        50% {
            width: 50px;
            height: 50px;
        }

        100% {
            width: 64%;
            height: 70%;
        }
    }

    @keyframes receive-page-back {
        0% {
            right: 300px;
            bottom: 60px;
            transform: translate(50%, 50%);
        }

        100% {
            right: 50%;
            bottom: 50%;
            transform: translate(50%, 50%);
        }
    }

    .page-all-content {
        @include showContent();
    }
}

.page-mini {
    animation: 1s ease alternate forwards mini-page, 2s ease alternate forwards receive-page;

    @keyframes mini-page {
        0% {
            width: 64%;
            height: 70%;
        }

        50% {
            width: 64%;
            height: 70%;
        }

        100% {
            width: 50px;
            height: 50px;
        }
    }

    @keyframes receive-page {
        0% {
            right: 50%;
            bottom: 50%;
            transform: translate(50%, 50%);
        }

        50% {
            right: 50%;
            bottom: 50%;
            transform: translate(50%, 50%);
        }

        100% {
            right: 300px;
            bottom: 60px;
            transform: translate(50%, 50%);
        }
    }

    .page-all-content {
        @include closeContent();
    }
}

.page-show {
    animation: 0.5s ease alternate forwards show-page;

    @keyframes show-page {
        0% {
            width: 0;
            height: 0;
            border-radius: 100%;
        }

        100% {
            width: 64%;
            height: 70%;
            border-radius: 0%;
        }
    }

    .page-all-content {
        @include showContent();
    }
}

.page-none {
    animation: 1s ease alternate forwards none-page;

    @keyframes none-page {
        0% {
            width: 64%;
            height: 70%;
            border-radius: 0%;
        }

        50% {
            width: 64%;
            height: 70%;
            border-radius: 0%;
        }

        100% {
            width: 0;
            height: 0;
            border-radius: 100%;
        }
    }

    .page-all-content {
        @include closeContent();
    }
}

.page-frame {
    position: fixed;
    right: 50%;
    bottom: 50%;
    transform: translate(50%, 50%);
    width: 64%;
    height: 70%;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(142, 142, 142, 0.2) 0px 6px 15px 0px;
    -webkit-box-shadow: rgba(142, 142, 142, 0.2) 0px 6px 15px 0px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    .mask-open {
        animation: 1s ease alternate forwards show-mask;

        @keyframes show-mask {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }

    .mask-out {
        animation: 1s ease alternate forwards close-mask;

        @keyframes close-mask {
            0% {
                opacity: 1;
            }

            100% {
                opacity: 0;
            }
        }
    }

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        color: white;
        background: black;
        opacity: 0;
        cursor: pointer;
    }

    .page-all-content {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .page-intro {
            display: flex;
            // justify-content: end;
            padding: 10px 10px 10px 10px;
            background: white;
            border: 2px solid rgb(180, 180, 180);

            @mixin buttonInIntro {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20px;
                height: 20px;
                font-size: 18px;
                font-weight: 600;
                color: rgb(115, 115, 115);
                border: 2px rgb(124, 124, 124) solid;
                cursor: pointer;
            }

            .back {
                @include buttonInIntro();
                border: 0;
            }

            .page-name {
                flex: 1;
                @include buttonInIntro();
                width: max-content;
                border: 0;
            }

            .mini {
                @include buttonInIntro();
                margin-right: 10px;
            }

            .over {
                @include buttonInIntro();
            }
        }

        .content {
            flex: 1;
            border: 2px rgb(180, 180, 180) solid;
            border-top: 0px;
        }
    }
}
</style>