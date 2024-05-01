<template>
    <background></background>
    <fontRain :data="dataList"></fontRain>
    <cat @click-neco="getClickMessage" @is-open-menu="getOpenMenuMessage" :message="catAteMessage"></cat>
    <key @is-ate="getAteMessage"></key>
    <blogMenu @openPageMessage="getPageMessage" :message="menuMessage"></blogMenu>
    <menuToPage @close-message="getCloseMessage" :pageMessage="pageMessage"></menuToPage>
    <bibiChat :isOpen="isBibiChatOpen" @bibiChatNowClosed="bibiChatNowClosed"></bibiChat>
    <div class="to-docs" @click="goToDocs">介绍文档</div>

    <!-- <header>
    </header> -->
    <!-- <main>
        <div class="home-main-frame">
        </div>
    </main> -->
    <!-- <aside>
    </aside> -->
    <!-- <footer>
        <div class="home-footer-frame">
        </div>
    </footer> -->
</template>

<script setup>
import background from '@/components/backGround/background.vue';
import fontRain from '@/components/fontRain/fontRain.vue';
import cat from '@/components/blogPet/cat.vue';
import key from '@/components/blogPet/key.vue';
import bibiChat from '@/components/bibiChat/bibiChat.vue';
import blogMenu from '@/components/blogMenu/blogMenu.vue';
import menuToPage from '@/components/menuToPage/menuToPage.vue';
import { useMessage } from '@/utils/message.jsx';
import { ref, watch } from 'vue';
import { useMessageState } from '@/stores/message.js';

const dataList = ref([ // 字数据
    "あなたは十分やった",
    "生きて",
    "もう十分です",
    "すべてはあなたのせいではありません",
    "ご健康をお祈り",
    "無事に帰ってきますね",
    "ありがとう",
    "君が安らかでありますように",
    "お誕生日おめでとうございます",
    "ご成功をお祈りしております",
    "お大事になさってください",
    "ご利益がありますように",
    "末永くお幸せにしてください",
    "ご迅速なご回復をお祈りしています",
    "ご健康でいられますように"
]);
const isBibiChatOpen = ref(false); // 是否打开聊天室
const catAteMessage = ref(""); // 猫咪是否吃到糖
const menuMessage = ref(""); // 是否打开菜单
const pageMessage = ref(""); // 菜单点击事件消息
const useMessagePinia = useMessageState(); // 获取pinia中存储的项目开启信息

// 监听pinia状态获取打开项目消息
watch(() => useMessagePinia.openProjectMessage, (newVal, oldVal) => {
    if (newVal !== "") {
        console.log(newVal + " open");
        switch (newVal) {
            case "bibiChat":
                isBibiChatOpen.value = !isBibiChatOpen.value;
                break;
        }
        useMessagePinia.openProjectMessage = "";
    }
});

// 获取cat的点击事件传值
function getClickMessage(value) {
    // isBibiChatOpen.value = value;
}

// 获取糖果被吃的消息
function getAteMessage(value) {
    catAteMessage.value = value;
}

// 获取菜单开启消息
function getOpenMenuMessage(value) {
    menuMessage.value = value;
}

// 获取菜单点击事件消息
function getPageMessage(value) {
    pageMessage.value = value;
}

// 获取菜单关闭消息
function getCloseMessage(value) {
    pageMessage.value = value;
}

// 聊天室已关闭更新控制键
function bibiChatNowClosed() {
    // isBibiChatOpen.value = false;
}

// 前往文档
function goToDocs() {
    location.replace("http://localhost:5500/");
}
</script>

<style lang="scss" scoped>
header {
    width: 100%;
    border: 4px solid black;
}

main {
    width: 100%;
    border: 4px solid rgb(196, 192, 192);
}

aside {}

footer {
    width: 100%;
    border: 4px solid black;
}

.to-docs {
    position: fixed;
    top: 10px;
    right: 20px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    color: black;
    transition: all 0.5s ease;
    &:hover {
        color: rgb(126, 28, 48);
    }
}
</style>