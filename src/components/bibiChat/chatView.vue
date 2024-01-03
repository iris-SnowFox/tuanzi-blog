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
                <div class="go-time" v-if="list.overTime != undefined">{{ list.overTime }}</div>
                <li class="my-words" v-if="list.id === 0">
                    <div class="just-img" v-if="list.img != undefined">
                        <div class="left-content">
                            <div class="name">{{ list.name }}</div>
                            <div class="img">
                                <img :src="list.img" alt="" class="enter-img-in-chat">
                            </div>
                        </div>
                        <img :src="list.avatar" alt="头像" class="avatar">
                    </div>
                    <div class="just-words" v-if="list.content != undefined">
                        <div class="left-content">
                            <div class="name">{{ list.name }}</div>
                            <div class="words">
                                <div class="content">{{ list.content }}</div>
                                <div class="xiao-jiao"></div>
                            </div>
                        </div>
                        <img :src="list.avatar" alt="头像" class="avatar">
                    </div>
                </li>
                <li class="others-words" v-else>
                    <div class="just-img" v-if="list.img != undefined">
                        <img :src="list.avatar" alt="头像" class="avatar">
                        <div class="right-content">
                            <div class="name">{{ list.name }}</div>
                            <div class="img">
                                <img :src="list.img" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="just-words" v-if="list.content != undefined">
                        <img :src="list.avatar" alt="头像" class="avatar">
                        <div class="right-content">
                            <div class="name">{{ list.name }}</div>
                            <div class="words">
                                <div class="xiao-jiao"></div>
                                <div class="content">{{ list.content }}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chat-input">
            <div class="chat-use-icon-list">
                <div class="emoji">
                    <ConfoundedFace theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" @click="openOrCloseEmojiList"
                        @mousedown="delFocusMissing" />
                    <dropDownOfEmoji v-model:isShow="isShowEmojiList" :emoji="emoji" @addEmojiToInput="addEmojiToInput">
                    </dropDownOfEmoji>
                </div>
                <div class="get-img">
                    <Pic theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" for="upload" @click="useInputToGetImg" />
                    <input type="file" class="file-get" ref="imgInput" @change="inputImg">
                </div>
                <Switch theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" @click="changeEnterMean" />
            </div>
            <div class="input-frame">
                <div class="input" contenteditable="true" ref="textInput" @focus="inInput" @blur="outInput">

                </div>
            </div>
            <div class="chat-go">
                <div class="button-go" @click="shootWords">shoot</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
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
const imgInput = ref(null); // imgInput dom
const chatData = ref([
    { id: 1, name: "牢大", content: "孩子们，不要怕", goTime: "2023:12:25 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2023:12:25 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2023:12:25 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 1, name: "牢大", content: "孩子们，我回来了,孩子们，我回来了,孩子们，我回来了,孩子们，我回来了", goTime: "2024:1:1 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2024:1:2 18:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 1, name: "牢大", content: "孩子们，这不是我", goTime: "2024:1:2 19:11", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" }
]); // 聊天数据
const emoji = ref([
    "😃", "😄", "😁", "😅", "🤣", "😂", "🙂", "🙃", "😇", "🥰", "😍", "😘", "😗", "😋", "🤪", "🤑", "🤭", "🤔", "😒", "😏", "🤥", "😴", "😪", "🤤", "🥵", "🤢", "😵", "😲", "😳", "😮", "😰", "😓", "😭", "😱", "🥱", "😤", "❤", "💔", "💢", "👉", "👈", "🖕", "🤞", "👌", "🤏", "✌", "👊", "🤜", "🤛", "👍", "👎", "💪", "👀", "👂", "👅", "👄", "🙇‍♂️", "🙇‍♀️", "🙅‍♂️", "🙅‍♀️", "🙋‍♂️", "🙋‍♀️", "🤷‍♂️", "🤷‍♀️", "🌹", "🥀", "🌷", "🌸", "🍺", "🍻", "🥂", "🎂", "🍭", "🎂", "🧧", "🎁", "🧨", "🎆", "🚘", "🚔", "🚖", "🚑", "🚌", "🚇", "🚉", "🚆", "🏎", "🏍", "🚲", "🛹", "🦽", "🏳", "🏁", "🏴‍☠️", "🇨🇳", "🐒", "🐷", "🐹", "🐇", "🦔", "🦦", "🦥", "🐣", "🦅", "🦆", "🐢", "🐉", "🐬", "🐡", "🦈", "🐌", "🦋"
]); // emoji数据
const time = ref(0); //定时器
const isShowChat = computed(() => { return props.isShowChat }); // 是否显示聊天界面
const isShowEmojiList = ref(false); // 是否打开emoji列表
const isEnterGo = ref(true); // 是否enter键为发送信息
const isLoseFocus = ref(true); // 是否丢失焦点
const isNowRepeatTime = ref(false); // 是否处于重复时间状态
const repeatTimeTime = ref(0); // 重复次数

onMounted(() => {
    // 模糊时间
    function chooseTimeShow() {
        const nowDate = new Date();
        const nowTime = nowDate.getTime(); // 分
        const nowNian = nowDate.getFullYear(); // 年
        const nowYue = nowDate.getMonth(); // 月
        const nowRi = nowDate.getDate(); // 日
        const nowDay = nowDate.getDay(); // 星期
        for (let i = 0; i < chatData.value.length; i++) {
            // console.log(chatData.value[i]);
            // 拆解time，转为date
            let kakoTime = 0;
            if (i != 0) {
                const [nianYueRi, fenMiao] = chatData.value[i - (repeatTimeTime.value + 1)].goTime.split(" ");
                const [nian, yue, ri] = nianYueRi.split(":");
                const [fen, miao] = fenMiao.split(":");
                const kakoDate = new Date(nian, yue - 1, ri, fen, miao);
                kakoTime = kakoDate.getTime(); // 上一个时间戳
            }
            const [nianYueRi, fenMiao] = chatData.value[i].goTime.split(" ");
            const [nian, yue, ri] = nianYueRi.split(":");
            const [fen, miao] = fenMiao.split(":");
            const lastDate = new Date(nian, yue - 1, ri, fen, miao);
            const lastTime = lastDate.getTime(); // 时间戳
            const lastNian = lastDate.getFullYear(); // 年
            const lastYue = lastDate.getMonth(); // 年
            const lastDay = lastDate.getDay() // 年
            // 判断是否处于重复状态
            if (kakoTime != 0 && lastTime - kakoTime <= 50000) {
                isNowRepeatTime.value = true;
                repeatTimeTime.value += 1;
                continue;
            } else {
                repeatTimeTime.value = 0;
                isNowRepeatTime.value = false;
            }
            // 判断是否为刚刚发送
            if (nowTime - lastTime <= 50000) {
                chatData.value[i].overTime = "刚刚";
                continue;
            }
            // 判断是否不同年
            if (nowNian != lastNian) {
                chatData.value[i].overTime = nian + "年" + yue + "月" + ri + "日" + " " + fen + ":" + miao;
                continue;
            }
            // 判断是否不同月
            if (nowYue != lastYue) {
                chatData.value[i].overTime = yue + "月" + ri + "日" + " " + fen + ":" + miao;
                continue;
            }
            // 判断是否同日期或为昨天
            if (Number(ri) === nowRi) {
                chatData.value[i].overTime = fen + ":" + miao;
                // console.log(chatData.value[i]);
                continue;
            } else if (Number(ri) === nowRi - 1) {
                chatData.value[i].overTime = "昨天 " + fen + ":" + miao;
                continue;
            }
            // 判断是否处于同周
            if (nowRi - Number(ri) <= 6 && nowDay != 0 && nowDay != 1) {
                switch (ri) {
                    case "0":
                        chatData.value[i].overTime = "星期天 " + fen + ":" + miao;
                        break;
                    case "1":
                        chatData.value[i].overTime = "星期一 " + fen + ":" + miao;
                        break;
                    case "2":
                        chatData.value[i].overTime = "星期二 " + fen + ":" + miao;
                        break;
                    case "3":
                        chatData.value[i].overTime = "星期三 " + fen + ":" + miao;
                        break;
                    case "4":
                        chatData.value[i].overTime = "星期四 " + fen + ":" + miao;
                        break;
                }
                continue;
            } else {
                chatData.value[i].overTime = ri + "日 " + fen + ":" + miao;
                continue;
            }
        }
    }
    chooseTimeShow();
    time.value = setInterval(chooseTimeShow, 5000)
})

watch(isShowChat, function goToEnd(value) {
    if (value) {
        nextTick(() => {
            let chatDiv = document.querySelector(".chat-home");
            chatDiv.scrollTop = chatDiv.scrollHeight;
        })
    }
})

watch(chatData, () => {
    setTimeout(() => {
        let chatDiv = document.querySelector(".chat-home");
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }, 500)
})

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
        let time = new Date();
        let month = time.getMonth() + 1;
        if (month > 12) {
            month = 1;
        }
        let nowTime = time.getFullYear() + ":" + month + ":" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes();
        // console.log(nowTime);
        const img = document.querySelector(".input").querySelector("img");
        let data = { id: 0, name: "我", goTime: nowTime, avatar: "https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/e4dde71190ef76c6de93dc2f9d16fdfaaf516774.jpg" };
        if (img) {
            if (textInput.value.textContent === "") {
                data.img = img.src;
            } else {
                data.content = textInput.value.textContent;
                data.img = img.src;
            }
        } else {
            data.content = textInput.value.textContent;
        }
        chatData.value = [...chatData.value, data];
        textInput.value.innerHTML = null;
    }
}
// enter键触发方法
function focusKeydown(event) {
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
    isLoseFocus.value = false;
    if (isEnterGo.value) {
        textInput.value.addEventListener("keydown", focusKeydown)
    }
}
// 暂时移出发送
function outInput() {
    // console.log("失焦");
    isLoseFocus.value = true;
    if (isEnterGo.value) {
        textInput.value.removeEventListener("keydown", focusKeydown);
    }
}

// 切换enter判断
function changeEnterMean() {
    isEnterGo.value = !isEnterGo.value;
}

// 打开/关闭表情列表
function openOrCloseEmojiList() {
    isShowEmojiList.value = !isShowEmojiList.value;
}
// 保持焦点
function delFocusMissing(event) {
    event.preventDefault(); // 取消mousedown默认动作
}
// 添加emoji到输入框中
function addEmojiToInput(emoji) {
    if (isLoseFocus.value) {
        // 判断是否失焦
        textInput.value.focus();
        let selection = getSelection();
        selection.selectAllChildren(textInput.value); // range 选择内容下所有子内容
        selection.collapseToEnd(); // 光标移至最后
    }
    let range = getSelection().getRangeAt(0); // 获取目前光标
    let span = document.createElement('span');
    span.innerHTML = emoji;
    range.insertNode(span);
    range.setStartAfter(span); // 将光标移动到节点之后
    range.collapse(true); // 合并光标位置
}
// 添加img到输入框中
function addImgToInput(img) {
    textInput.value.focus();
    let selection = getSelection();
    let range = selection.getRangeAt(0); // 获取目前光标
    range.insertNode(img);
    range.setStartAfter(img); // 将光标移动到节点之后
    range.collapse(true); // 合并光标位置
}

// 触发input获取图片file
function useInputToGetImg() {
    imgInput.value.click();
}
// 上传图片
function inputImg() {
    const img = document.createElement("img");
    img.style.maxWidth = "60px";
    img.style.maxHeight = "60px";
    let fileData = imgInput.value.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(fileData); // 异步读取文件内容，结果用data:url的字符串形式表示
    reader.onload = function (e) {
        // console.log(imgInInput.value);
        img.src = this.result; // 赋值给img标签让它显示出来 
        addImgToInput(img);
        imgInput.value.value = "";
    }
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

        .go-time {
            width: 100%;
            text-align: center;
            color: rgb(255, 255, 255);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
            font-size: 14px;
            font-weight: 600;
        }

        ul {
            padding-top: 6px;
            width: 100%;

            li {
                display: flex;
                width: 100%;

                .avatar {
                    margin-top: 4px;
                    width: 46x;
                    height: 46px;
                }
            }

            .enter-img-in-chat {
                max-width: 100px;
                max-height: 100px;
            }

            .my-words {
                display: flex;
                flex-direction: column;
                width: 100%;

                .just-img {
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: end;
                    width: 100%;
                }

                .just-words {
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: end;
                    width: 100%;
                }

                .left-content {
                    margin-right: 6px;
                    max-width: 50%;
                    white-space: normal;
                    word-break: break-all;

                    .name {
                        display: flex;
                        justify-content: end;
                        font-size: 14px;
                        color: rgb(92, 92, 92);
                    }

                    .img {
                        margin-top: 4px;
                        display: flex;
                        justify-content: end;
                        width: 100%;
                    }

                    .words {
                        margin-top: 4px;
                        display: flex;
                        width: 100%;

                        .xiao-jiao {
                            width: 6px;
                            background: white;
                            clip-path: polygon(-4% 70%, -4% 30%, 100% 50%);
                        }

                        .content {
                            padding: 10px;
                            width: 100%;
                            border-radius: 4px;
                            background: white;
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }
            }

            .others-words {
                .just-img {
                    margin-bottom: 10px;
                    display: flex;
                    width: 100%;
                }

                .just-words {
                    margin-bottom: 10px;
                    display: flex;
                    width: 100%;
                }

                .right-content {
                    margin-left: 6px;
                    max-width: 50%;
                    white-space: normal;
                    word-break: break-all;

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
                            clip-path: polygon(0% 50%, 104% 30%, 104% 70%);
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

            .get-img {
                .file-get {
                    display: none;
                }
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