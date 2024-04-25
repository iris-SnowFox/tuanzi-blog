<template>
    <div class="pro-page-frame" v-if="isOpen">
        <ul class="pro-page-list">
            <li v-for="list in pageData" :key="list.id" @click="openProject(list.id)">
                <div class="id single-omit">{{ list.id + 1 }}</div>
                <div class="name single-omit">{{ list.name }}</div>
                <div class="content single-omit">{{ list.content }}</div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useMessageState } from '@/stores/message.js';

const props = defineProps({
    openMessage: Boolean,
    backMessage: Boolean
});
const emit = defineEmits(["backToBeforePage", "getMiniMessage"]);

const isOpen = computed(() => { return props.openMessage; }); // 页面打开状态
const backMessage = computed(() => { return props.backMessage; }); // 返回消息接收
const useMessagePinia = useMessageState(); // 获取pinia中存储的项目开启信息

// 页面数据
const pageData = ref([
    { id: 0, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 1, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 2, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 3, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 4, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 5, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 6, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 7, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 8, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 9, name: "聊天室", content: "仿wechat聊天界面" },
    { id: 10, name: "聊天室", content: "仿wechat聊天界面" },
])

// 返回消息监控
watch(backMessage, () => {
    if (isOpen.value) {
        emit("backToBeforePage");
    }
})

// 打开项目
function openProject(id) {
    emit("getMiniMessage");
    if (id === 0) {
        useMessagePinia.openProjectMessage = "bibiChat";
    }
}
</script>

<style lang="scss" scoped>
.pro-page-frame {
    .pro-page-list {
        li {
            display: flex;
            align-items: center;
            width: 100%;
            height: 24px;
            font-size: 14px;
            cursor: pointer;

            &:hover {
                background: rgba(0, 0, 0, 0.05);
            }

            .id {
                flex: 0.1;
            }

            .name {
                flex: 0.2;
            }

            .content {
                flex: 0.7;
            }
        }
    }
}
</style>