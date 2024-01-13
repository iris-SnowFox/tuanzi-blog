<template>
    <div class="candy" draggable="true">
        <div class="tape"></div>
        <div class="body"></div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.candy {
    position: fixed;
    top: 10%;
    left: 10%;
    transform: translate(-50%, -50%);

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