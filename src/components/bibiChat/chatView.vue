<template>
    <div class="chat-view" v-if="isShowChat">
        <div class="title-and-go-back">
            <div class="left-frame">{{ props.name }}</div>
            <div class="right-frame">
                <div class="control-icon-list">
                    <power theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" />
                </div>
                <div class="more">
                    <more theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" />
                </div>
            </div>
        </div>
        <div class="chat-home">
            <ul v-for="list in chatData" :key="list.id">
                <li class="my-words" v-if="list.id === 0">
                    <div class="left-content">
                        <div class="name">{{ list.name }}</div>
                        <div class="words">
                            <div class="content">{{ list.content }}</div>
                            <div class="xiao-jiao"></div>
                        </div>
                    </div>
                    <img :src="list.avatar" alt="头像">
                </li>
                <li class="others-words" v-else>
                    <img :src="list.avatar" alt="头像">
                    <div class="right-content">
                        <div class="name">{{ list.name }}</div>
                        <div class="words">
                            <div class="xiao-jiao"></div>
                            <div class="content">{{ list.content }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chat-input">
            <div class="chat-use-icon-list">
                <div class="emoji">
                    <ConfoundedFace theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" />
                    <dropDownOfEmoji></dropDownOfEmoji>
                </div>
                <Pic theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" />
                <Switch theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" @click="changeEnterMean" />
            </div>
            <div class="input-frame">
                <div class="input" contenteditable="true" ref="textInput" @focus="inInput" @blur="outInput"></div>
            </div>
            <div class="chat-go">
                <div class="button-go" @click="shootWords">shoot</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import {
    Power,
    More,
    ConfoundedFace,
    Pic,
    Switch,
} from "@icon-park/vue-next";
import dropDownOfEmoji from "@/components/dropDown/dropDownOfEmoji.vue"
const props = defineProps({
    isShowChat: Boolean,
    name: String,
});
const textInput = ref(null); // textInput dom
const chatData = ref([
    { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2023:12:25 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" }
]); // 聊天数据
const isShowChat = computed(() => { return props.isShowChat }); // 是否显示聊天界面
const isEnterGo = ref(true); // 是否enter键为发送信息

// 输入内容检测
function isAllowGo() {
    let isGo = true;
    if (textInput.value.innerHTML === "") {
        isGo = false;
    }
    return isGo;
}
// 发送信息
function shootWords() {
    // console.log(textInput.value.innerHTML);
    if (isAllowGo()) {
        const data = { id: 0, name: "我", content: textInput.value.innerHTML, goTime: "2023:12:25 19:23", avatar: "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/e4dde71190ef76c6de93dc2f9d16fdfaaf516774.jpg" };
        chatData.value = [...chatData.value, data];
        textInput.value.innerHTML = null;
    }
}
// enter键触发方法
function focusKeydown(event) {
    console.log("到了");
    if (event.keyCode === 13) {
        // 不允许换行
        event.cancelBubble = true;
        event.preventDefault();
        event.stopPropagation();
        // 发送
        shootWords();
    }
}
// 正在发送
function inInput() {
    if (isEnterGo.value) {
        textInput.value.addEventListener("keydown", focusKeydown)
    }
}
// 暂时移出发送
function outInput() {
    if (isEnterGo.value) {
        textInput.value.removeEventListener("keydown", focusKeydown);
    }
}

//切换enter判断
function changeEnterMean() {
    isEnterGo.value = !isEnterGo.value;
}

</script>

<style lang="scss" scoped>
.chat-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    .title-and-go-back {
        margin-left: -5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: calc(100% + 5px);
        height: 60px;
        background: #ffffff6b;

        .left-frame {
            margin-left: 20px;
            font-size: 20px;
            font-weight: 600;
        }

        .right-frame {
            margin-right: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 80%;
        }
    }

    .chat-home {
        margin-right: 6px;
        overflow-y: scroll;
        width: calc(100% - 6px);
        height: calc(100% - 180px);

        ul {
            padding-top: 6px;
            width: 100%;

            li {
                margin-bottom: 10px;
                display: flex;
                width: 100%;

                img {
                    margin-top: 4px;
                    width: 46x;
                    height: 46px;
                }
            }

            .my-words {
                display: flex;
                justify-content: end;

                .left-content {
                    margin-right: 6px;

                    .name {
                        display: flex;
                        justify-content: end;
                        font-size: 14px;
                        color: rgb(92, 92, 92);
                    }

                    .words {
                        margin-top: 4px;
                        display: flex;

                        .xiao-jiao {
                            width: 6px;
                            background: white;
                            -webkit-clip-path: polygon(0 70%, 0% 30%, 100% 50%);
                        }

                        .content {
                            padding: 10px;
                            border-radius: 4px;
                            background: white;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }

            .others-words {
                .right-content {
                    margin-left: 6px;

                    .name {
                        font-size: 14px;
                        color: rgb(92, 92, 92);
                    }

                    .words {
                        margin-top: 4px;
                        display: flex;

                        .xiao-jiao {
                            width: 6px;
                            background: white;
                            -webkit-clip-path: polygon(0 50%, 100% 30%, 100% 70%);
                        }

                        .content {
                            padding: 10px;
                            border-radius: 4px;
                            background: white;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }

    .chat-input {
        margin-left: -5px;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(100% + 5px);
        height: 120px;
        background: #ffffff8c;

        .chat-use-icon-list {
            margin-bottom: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, 20px);
            grid-gap: 10px;

            .emoji {
                position: relative;
            }
        }

        .input-frame {
            position: relative;
            margin-right: 10px;
            width: calc(100% - 10px);
            height: 100%;

            .input {
                overflow-y: scroll;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 100%;
                font-size: 16px;
                font-weight: 600;
                white-space: pre-wrap;
                word-break: keep-all;
                outline: none;
            }
        }

        .chat-go {
            display: flex;
            justify-content: end;

            .button-go {
                margin-top: 10px;
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                user-select: none;
                width: 80px;
                height: 34px;
                background: rgba(0, 0, 0, 0.086);
                border-radius: 10px;
                font-size: 16px;

                &:hover {
                    background: rgba(0, 0, 0, 0.128);
                }
            }
        }
    }
}
</style>