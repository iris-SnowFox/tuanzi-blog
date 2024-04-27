<template>
    <div class="all-page-frame">
        <div class="tec-page-frame" v-if="isShowTecPage">
            <ul class="tec-page-content">
                <li v-for="list in tecPageData" :key="list.id" @click="toProjectPage(list.id)">
                    <img :src=list.img alt="项目图">
                    <div class="project-name single-omit">{{ list.name }}</div>
                </li>
            </ul>
        </div>
        <projectPage :openMessage="isOpenProjectPage" :backMessage="lastBackMessage" @backToBeforePage="backToBeforePage"
            @getMiniMessage="getMiniMessage">
        </projectPage>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import projectPage from "./projectPage/projectPage.vue";

const props = defineProps({
    backMessage: Boolean
});
const emit = defineEmits(["getMiniMessage"]);

// 页面数据
const tecPageData = ref([
    { id: 0, name: "小项目", img: "https://i.postimg.cc/jjQF61Sf/tuanzi-laugh.png" },
    { id: 1, name: "练手合集", img: "https://i.postimg.cc/jjQF61Sf/tuanzi-laugh.png" },
    { id: 2, name: "技术档案", img: "https://i.postimg.cc/jjQF61Sf/tuanzi-laugh.png" },
])

const isShowTecPage = ref(true); // 初始页开启
const isOpenProjectPage = ref(false); // 小项目板块开启
const backMessage = computed(() => { return props.backMessage; }); // 返回消息
const lastBackMessage = ref(false); // 返回消息（下一个）

watch(backMessage, () => {
    if (!isShowTecPage.value) {
        lastBackMessage.value = !lastBackMessage.value;
    }
})

// 返回
function backToBeforePage() {
    isShowTecPage.value = true;
    isOpenProjectPage.value = false;
}

// 前往项目分类页
function toProjectPage(id) {
    isShowTecPage.value = false;
    switch (id) {
        case 0:
            isOpenProjectPage.value = true;
            break;
        case 1:
            isShowTecPage.value = true;
            break;
        case 2:
            isShowTecPage.value = true;
            break;
    }
}

// 获取最小化消息
function getMiniMessage() {
    emit("getMiniMessage");
}
</script>

<style lang="scss" scoped>
.all-page-frame {
    padding: 20px 20px 0 20px;

    .tec-page-frame {
        .tec-page-content {
            display: grid;
            grid-template-columns: repeat(auto-fill, 110px);
            justify-content: space-between;
            column-gap: 10px;
            row-gap: 20px;

            li {
                width: 108px;

                &:hover {
                    img {
                        border: 4px solid rgba(0, 0, 0, 0.5);
                    }

                    .project-name {
                        color: black;
                    }
                }

                img {
                    width: 100px;
                    height: 100px;
                    min-width: 100px;
                    min-height: 100px;
                    border: 4px solid rgb(160, 160, 160, 0.8);
                    cursor: pointer;
                    transition: border 0.5s ease;
                }

                .project-name {
                    width: 100%;
                    max-width: 108px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 600;
                    color: rgb(116, 116, 116);
                    cursor: pointer;
                    transition: color 0.5s ease;
                }
            }
        }
    }
}
</style>