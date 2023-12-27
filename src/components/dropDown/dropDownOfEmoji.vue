<template>
    <div class="dropDown-frame">
        <div class="content">😃</div>
        <div class="san-jiao"></div>
    </div>
</template>

<script setup></script>

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
    }

    .san-jiao {
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        -webkit-clip-path: polygon(40% 0%, 50% 100%, 60% 0%);
    }
}
</style>