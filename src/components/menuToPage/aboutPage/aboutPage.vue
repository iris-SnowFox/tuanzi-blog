<template>
    <div class="about-page-frame">
        <div class="intro-avatar-and-name">
            <div class="avatar"><img src="https://i.postimg.cc/QdgwGyDd/logo.png" alt="头像"></div>
            <div class="name">一只普通程序团子</div>
        </div>
        
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about-page-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 0 10px;
    cursor: default;

    .intro-avatar-and-name {
        display: flex;
        align-items: center;

        .avatar {
            position: relative;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: end;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: white;

            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                transition: 1s ease;

                &:hover {
                    width: 60px;
                    height: 60px;
                }
            }

            &::before {
                z-index: -1;
                position: absolute;
                top: -2px;
                left: -2px;
                content: "";
                width: 54px;
                height: 54px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 50%;
            }
        }

        .name {
            font-size: 16px;
            font-weight: 600;
        }
    }
}
</style>