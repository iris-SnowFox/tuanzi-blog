<template>
    <fontRain :data="dataList"></fontRain>
    <bibiChat></bibiChat>
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
import fontRain from '@/components/fontRain/fontRain.vue';
import bibiChat from '@/components/bibiChat/bibiChat.vue';
import { useMessage } from '@/utils/message.jsx';
import { ref } from 'vue';
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

aside {
}

footer {
    width: 100%;
    border: 4px solid black;
}
</style>