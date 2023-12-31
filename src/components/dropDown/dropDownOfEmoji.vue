<!-- 表情下拉框组件 -->
<template>
    <div class="dropDown-frame" v-if="isShow">
        <div class="content">
            <ul>
                <li v-for="(list, index) in emoji" :key="index" @click="addEmojiToInput(index)"
                    @mousedown="delFocusMissing">{{ list }}</li>
            </ul>
        </div>
        <div class="san-jiao"></div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
/*
    必传
        isShow  是否打开
        emoji  表情列表
 */
const props = defineProps({
    isShow: Boolean,
    emoji: Array,
});
const emit = defineEmits(['update:isShow', 'addEmojiToInput']);
const isShow = computed(() => { return props.isShow }); // 是否打开
const emoji = computed(() => { return props.emoji }); // 表情列表

// 添加emoji
function addEmojiToInput(index) {
    // 提醒关闭面板
    emit('update:isShow', false);
    emit('addEmojiToInput', emoji.value[index]);
}
// 保持焦点
function delFocusMissing(event) {
    event.preventDefault(); // 取消mousedown默认动作
}
</script>

<style lang="scss" scoped>
.dropDown-frame {
    position: absolute;
    left: -115px;
    bottom: 24px;

    .content {
        width: 250px;
        height: 250px;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        overflow-y: scroll;

        ul {
            padding: 10px;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
            grid-gap: 10px;

            li {
                user-select: none;
                cursor: pointer;
                font-size: 18px;
            }
        }
    }

    .san-jiao {
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        -webkit-clip-path: polygon(40% 0%, 50% 100%, 60% 0%);
    }
}
</style>