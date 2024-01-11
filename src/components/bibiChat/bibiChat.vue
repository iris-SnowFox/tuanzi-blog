<!-- 聊天室组件 -->
<template>
    <div class="neco" ref="necoButtom" @click="bibiChatOpen">
        <div class="face-and-eyes"></div>
        <div class="eyebrow-l"></div>
        <div class="eyebrow-r"></div>
        <div class="ears"></div>
        <div class="mouse"></div>
    </div>
    <div class="bibi-chat-frame" ref="bibiChatFrame">
        <div class="left-siderbar-frame">
            <img src="@/assets/images/avatar/default.png" alt="头像">
            <communication theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                strokeLinejoin="bevel" class="icon-same-style" @click="goToChatList" />
        </div>
        <div class="center-list-frame" ref="charList">
            <div class="chat-list-frame">
                <div class="top-of-list">
                    <div class="search">
                        <input type="text" placeholder="搜索" @input="searchInChatList" ref="searchInput">
                        <search theme="multi-color" size="16" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                            strokeLinejoin="bevel" class="search-icon" v-if="whatList === 'chatList'" />
                    </div>
                    <div class="add-chat">
                        <add-three theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                            strokeLinejoin="bevel" class="icon-same-style" />
                    </div>
                </div>
                <ul class="chat-list">
                    <li v-for="(list, index) in chatDataList" :key="list[0].id" v-show="!isSearching"
                        @click="goToChat(index)" ref="liNoSearch">
                        <img :src="list[0].avatar" alt="头像">
                        <div class="content">
                            <div class="top-content">
                                <div class="name">{{ list[0].name }}</div>
                                <div class="time">{{ lastChatTime[index] }}</div>
                            </div>
                            <div class="bottom-content">
                                <div class="just-content">{{ list[list.length - 1].content }}</div>
                                <div class="no-read-icon" v-if="!list[0].isSee"></div>
                            </div>
                        </div>
                    </li>
                    <li v-for="(list) in searchChatListData" :key="list.id" v-show="isSearching"
                        @click="goToChatAndCloseSearch(list.id)">
                        <img :src="list.avatar" alt="头像">
                        <div class="content">
                            <div class="top-content">
                                <div class="name">{{ list.name }}</div>
                                <div class="time">{{ lastChatTime[list.trueIndex] }}</div>
                            </div>
                            <div class="bottom-content">
                                <div class="just-content">{{ list.content }}</div>
                                <div class="no-read-icon" v-if="!list.isSee"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <resize :leftWidth="leftWidth" :maxWidth="'450'" :minWidth="'200'" @update:leftWidth="getLeftWidth"
            :backgroundColorOfResize="'rgb(131, 131, 131, 0.5)'" :paddingColor="'rgba(255, 196, 169, 0.5)'"
            :backgroundClickColorOfResize="'rgb(131, 131, 131, 0.8)'">
        </resize>
        <div class="right-frame">
            <chatView :isShowChat="isShowChat" :name="chatBro" :id="chooseId" @getNewChatData="getNewData" @isRead="isRead"
                @bibiChatClose="bibiChatClose">
            </chatView>
        </div>
    </div>
</template>

<script setup>
import resize from "@/components/resize/resize.vue"
import chatView from "./chatView.vue";
import { nextTick, ref } from "vue"
import {
    Communication,
    Search,
    AddThree,
} from "@icon-park/vue-next";

const necoButtom = ref(null); // necoButtom dom
const bibiChatFrame = ref(null); // bibiChatFrame dom
const charList = ref(null); // charList dom
const searchInput = ref(null); // searchInput dom
const liNoSearch = ref(null); // liNoSearch dom
const leftWidth = ref("200px"); // 聊天列表宽度
const whatList = ref("chatList"); // 列表切换
const searchChatListData = ref([]); // 搜索聊天列表数据
const isSearching = ref(false); // 是否正在搜索
const isShowChat = ref(false); // 是否显示聊天界面
const chatBro = ref(""); // 聊天对象名
const lastIndex = ref(-1); // 记录上一次点击的下标
const lastChatTime = ref([]); // 上次聊天时间列表
const chooseId = ref(0); // 点击用户的id
const nowChatOpenIndex = ref(-1); // 本次开启聊天框下标记录
const chatDataList = ref([ // 所有聊天数据
    [
        { id: 1, name: "牢大", isSee: false, avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，不要怕", goTime: "2023:12:25 19:23:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2023:12:25 19:23:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2024:1:1 19:14:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，我回来了,孩子们，我回来了,孩子们，我回来了,孩子们，我回来了", goTime: "2024:1:1 19:24:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，我回来了", goTime: "2024:1:2 18:23:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 1, name: "牢大", content: "孩子们，这不是我", goTime: "2024:1:4 14:11:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" }
    ], [
        { id: 2, name: "丁真", isSee: true, avatar: "https://x0.ifengimg.com/ucms/2020_49/341F29F5E7EADA81222DE30CE8D313807AB1AA9C_w600_h630.jpg" },
        { id: 2, name: "丁真", content: "我测你", goTime: "2023:12:25 19:23:15", avatar: "https://x0.ifengimg.com/ucms/2020_49/341F29F5E7EADA81222DE30CE8D313807AB1AA9C_w600_h630.jpg" },
        { id: 2, name: "丁真", content: "雪豹闭嘴", goTime: "2023:12:25 19:23:15", avatar: "https://x0.ifengimg.com/ucms/2020_49/341F29F5E7EADA81222DE30CE8D313807AB1AA9C_w600_h630.jpg" },
        { id: 2, name: "丁真", content: "妈妈省的", goTime: "2024:1:1 19:14:15", avatar: "https://x0.ifengimg.com/ucms/2020_49/341F29F5E7EADA81222DE30CE8D313807AB1AA9C_w600_h630.jpg" },
    ], [
        { id: 3, name: "范小勤", isSee: true, avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e66e868694dd76aa03fa4973380d1f28?rik=Z44alJXCr8YU3Q&riu=http%3a%2f%2fwww.daheyuqing.com%2fupload%2fueditor%2fphp%2fupload%2fimage%2f20210302%2f1614649000143504.jpg&ehk=oiF0e4ncelAGXa4upHU0S1nacBLElUPklWfixUwcC3w%3d&risl=&pid=ImgRaw&r=0" },
        { id: 3, name: "范小勤", content: "阿里，阿里巴巴", goTime: "2023:12:25 19:23:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e66e868694dd76aa03fa4973380d1f28?rik=Z44alJXCr8YU3Q&riu=http%3a%2f%2fwww.daheyuqing.com%2fupload%2fueditor%2fphp%2fupload%2fimage%2f20210302%2f1614649000143504.jpg&ehk=oiF0e4ncelAGXa4upHU0S1nacBLElUPklWfixUwcC3w%3d&risl=&pid=ImgRaw&r=0" },
    ], [
        { id: 4, name: "战鹰", isSee: true, avatar: "https://www.cioinsight.com.cn/uploads/images/20230201/20230201132116_96864.png" },
        { id: 4, name: "战鹰", content: "啾啾啾，小飞棍来咯~", goTime: "2023:12:25 19:23:15", avatar: "https://www.cioinsight.com.cn/uploads/images/20230201/20230201132116_96864.png" },
    ], [
        { id: 5, name: "菜就多练", isSee: true, avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.yvgKNKAb2ZO35olZ_c5W0wE1FK?rs=1&pid=ImgDetMain" },
        { id: 5, name: "菜就多练", content: "菜，就多练", goTime: "2023:12:25 19:23:15", avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.yvgKNKAb2ZO35olZ_c5W0wE1FK?rs=1&pid=ImgDetMain" },
    ], [
        { id: 6, name: "勇次郎", isSee: true, avatar: "https://img-nos.yiyouliao.com/alph/52f9bd33d003614e587a1c82fefd8720.png?yiyouliao_channel=msn_image" },
        { id: 6, name: "勇次郎", content: "终于可以。好好地。玩了！", goTime: "2023:12:25 19:23:15", avatar: "https://img-nos.yiyouliao.com/alph/52f9bd33d003614e587a1c82fefd8720.png?yiyouliao_channel=msn_image" },
    ], [
        { id: 7, name: "坤坤", isSee: true, avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e4fe1a1677f72143432de42d44e85f9f?rik=QNhDoEtIS2Ve3A&riu=http%3a%2f%2finews.gtimg.com%2fnewsapp_match%2f0%2f15103659616%2f0&ehk=gvcKqCFPB5ADv7JtilqqKL%2b1U87peA41C0HCNdeflKc%3d&risl=&pid=ImgRaw&r=0" },
        { id: 7, name: "坤坤", content: "全民制作人们大家好", goTime: "2023:12:25 19:23:15", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e4fe1a1677f72143432de42d44e85f9f?rik=QNhDoEtIS2Ve3A&riu=http%3a%2f%2finews.gtimg.com%2fnewsapp_match%2f0%2f15103659616%2f0&ehk=gvcKqCFPB5ADv7JtilqqKL%2b1U87peA41C0HCNdeflKc%3d&risl=&pid=ImgRaw&r=0" },
    ]
])

// 聊天列表模糊时间
function changeToFuzzyTime() {
    lastChatTime.value = [];
    chatDataList.value.forEach(item => {
        let element = item[item.length - 1];
        const nowDate = new Date();
        const dateArray = element.goTime.split(" ");
        // 获取年月日
        const year = dateArray[0].split(":")[0];
        const month = dateArray[0].split(":")[1];
        const day = dateArray[0].split(":")[2];
        const shi = dateArray[1].split(":")[0];
        const fen = dateArray[1].split(":")[1];
        if (day != nowDate.getDate()) {
            lastChatTime.value = [...lastChatTime.value, year + "/" + month + "/" + day];
            return;
        } else {
            lastChatTime.value = [...lastChatTime.value, shi + ":" + fen];
            return;
        }
    });
}
changeToFuzzyTime(lastChatTime.value);

// 获取最新聊天列表宽度
function getLeftWidth(newWidth) {
    leftWidth.value = newWidth + "px";
}
// 切换至聊天列表
function goToChatList() {
    whatList.value = "chatList";
}
// 搜索聊天列表
function searchInChatList() {
    if (searchInput.value.value != "") {
        isSearching.value = true;
        let searchArray = [];
        let i = 0;
        chatDataList.value.forEach(item => {
            let element = item[0];
            if (element.name.includes(searchInput.value.value)) {
                let arrayList = { id: element.id, name: element.name, isSee: item[0].isSee, content: item[item.length - 1].content, trueIndex: i, avatar: element.avatar };
                searchArray = [...searchArray, arrayList];
            }
            i++;
        })
        searchChatListData.value = [...searchArray];
        // console.log(searchChatListData.value);
    } else {
        isSearching.value = false;
        searchChatListData.value = [];
    }
}

function changeBackgroundColor(index) {
    // 清除上次点击触发的背景色
    if (lastIndex.value != -1) {
        liNoSearch.value[lastIndex.value].style.backgroundColor = null;
    }
    lastIndex.value = index; // 记录本次下标
    liNoSearch.value[index].style.backgroundColor = "rgba(255, 255, 255, 0.4)"; // 上色
}

// 开启聊天界面
function goToChat(index) {
    if (localStorage.getItem("chatData")) {
        localStorage.removeItem("chatData");
    }
    changeBackgroundColor(index);
    isShowChat.value = false;
    nowChatOpenIndex.value = index;
    nextTick(() => {
        localStorage.setItem("chatData", JSON.stringify(chatDataList.value[index])); // 存储数据
        isShowChat.value = true; // 打开聊天窗口
        chatBro.value = chatDataList.value[index][0].name;
        chooseId.value = chatDataList.value[index][0].id;
    })
}

// 开启聊天界面(搜索中版)
function goToChatAndCloseSearch(index) {
    if (localStorage.getItem("chatData")) {
        localStorage.removeItem("chatData");
    }
    let trueIndex = -1;
    for (let i = 0; i < chatDataList.value.length; i++) {
        if (chatDataList.value[i][0].id === index) {
            trueIndex = i;
            break;
        }
    }
    isSearching.value = false; // 关闭搜索
    changeBackgroundColor(trueIndex);
    isShowChat.value = false;
    nowChatOpenIndex.value = trueIndex;
    nextTick(() => {
        localStorage.setItem("chatData", JSON.stringify(chatDataList.value[trueIndex])); // 存储数据
        isShowChat.value = true; // 打开聊天窗口
        chatBro.value = chatDataList.value[trueIndex][0].name;
        chooseId.value = chatDataList.value[trueIndex][0].id;
    })
}

// 获取最新数据
function getNewData(data) {
    chatDataList.value[nowChatOpenIndex.value].push(data);
    changeToFuzzyTime();
}

// 切换已读
function isRead(value) {
    chatDataList.value[nowChatOpenIndex.value][0].isSee = value;
}

// 关闭聊天室
function bibiChatClose() {
    bibiChatFrame.value.style.top = "80%";
    setTimeout(() => {
        bibiChatFrame.value.style.left = "90%";
        bibiChatFrame.value.style.top = "90%";
    }, 400);
    setTimeout(() => {
        bibiChatFrame.value.style.width = "0px";
        bibiChatFrame.value.style.height = "0px";
    }, 500);
}
function bibiChatOpen() {
    bibiChatFrame.value.style.width = "400px";
    bibiChatFrame.value.style.height = "200px";
    bibiChatFrame.value.style.left = "60%";
    setTimeout(() => {
        bibiChatFrame.value.style.left = "50%";
        bibiChatFrame.value.style.top = "50%";
    }, 400);
    setTimeout(() => {
        bibiChatFrame.value.style.width = "800px";
        bibiChatFrame.value.style.height = "450px";
    }, 500);
}
</script>

<style lang="scss" scoped>
.neco {
    position: fixed;
    top: 88%;
    left: 90%;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 120px;

    .face-and-eyes {
        width: 100%;
        height: 100%;
        background: #000;
        border-radius: 49% 51% 49% 51% / 62% 57% 43% 38%;
        border: 4px solid black;

        @mixin doubleEyes {
            position: absolute;
            content: '';
            width: 28px;
            height: 28px;
            background: #620f21;
            background: radial-gradient(circle at 10px 8px, #fff 4px, transparent 5px),
                radial-gradient(circle at 6px 16px, #fff 2px, transparent 3px) rgb(82, 0, 34) no-repeat;

            box-shadow: 0 0 0 6px #ffefef;
            border-radius: 50%;
        }

        &::before {
            @include doubleEyes();
            left: 30px;
            top: 32px;
        }

        &::after {
            @include doubleEyes();
            right: 36px;
            top: 36px;
        }
    }

    @mixin eyebrowFrame {
        position: absolute;
        width: 18px;
        height: 4px;
        border-radius: 100%;
        border: 2px solid #fff;
        border-width: 2px 0 0 0;
    }

    .eyebrow-l {
        @include eyebrowFrame();
        left: 44px;
        top: 12px;
        transform: rotate(40deg);

        &::before {
            @include eyebrowFrame();
            content: '';
            left: 2px;
            top: -6px;
            transform: rotate(16deg);
        }

        &::after {
            @include eyebrowFrame();
            content: '';
            left: -2px;
            top: 4px;
            transform: rotate(-20deg);
        }
    }

    .eyebrow-r {
        @include eyebrowFrame();
        right: 52px;
        top: 14px;
        transform: rotate(-36deg);

        &::before {
            @include eyebrowFrame();
            content: '';
            left: -2px;
            top: -7px;
            transform: rotate(-14deg);
        }

        &::after {
            @include eyebrowFrame();
            content: '';
            left: 2px;
            top: 4px;
            transform: rotate(20deg);
        }
    }

    .ears {
        &::before {
            z-index: -1;
            position: absolute;
            top: -22px;
            left: -20px;
            content: '';
            width: 50px;
            height: 50px;
            border-radius: 74% 26% 43% 57% / 100% 100% 0% 0%;
            background-color: #5a2f2f;
            transform: rotate(-40deg);
            border: 4px solid #000;
            border-width: 5px 18px 0 10px;
            box-shadow: inset 10px -2px 0 #905050,
                inset 30px -2px 0 #784343;
        }

        &::after {
            z-index: -1;
            position: absolute;
            top: -20px;
            right: -32px;
            content: '';
            width: 58px;
            height: 54px;
            border-radius: 26% 74% 43% 57% / 100% 100% 0% 0%;
            background-color: #5a2f2f;
            transform: rotate(40deg);
            border: 4px solid #000;
            border-width: 5px 10px 0 18px;
            box-shadow: inset -10px -2px 0 #905050,
                inset -30px -2px 0 #784343;
        }
    }

    .mouse {
        position: absolute;
        top: 66px;
        left: 40px;
        width: 60px;
        height: 40px;
        background: rgb(166, 44, 77);
        border-radius: 46% 54% 50% 50% / 34% 30% 70% 66%;
        overflow: hidden;

        &::before {
            content: "";
            position: absolute;
            top: 24px;
            width: 60px;
            height: 24px;
            background: rgb(185, 103, 125);
            border-radius: 47% 53% 50% 50% / 71% 71% 29% 29%;
        }

        &::after {
            content: "";
            position: absolute;
            top: -2px;
            left: 42px;
            border-top: 14px solid #ebebeb;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            transform: rotate(12deg);
        }
    }
}

.bibi-chat-frame {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 800px;
    height: 450px;
    background: linear-gradient(rgba(255, 103, 146, 0.5), rgba(255, 255, 255, 0.8));
    box-shadow:
        0px 0px 2.2px rgba(0, 0, 0, 0.081),
        0px 0px 5.3px rgba(0, 0, 0, 0.051),
        0px 0px 10px rgba(0, 0, 0, 0.027),
        0px 0px 17.9px rgba(0, 0, 0, 0.04),
        0px 0px 33.4px rgba(0, 0, 0, 0.127),
        0px 0px 80px rgba(0, 0, 0, 0.4);
    border-radius: 20px 20px 20px 20px;
    backdrop-filter: blur(2px);
    overflow: hidden;
    transition: all 1.6s ease;

    .left-siderbar-frame {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        box-sizing: border-box;
        width: 80px;
        height: 100%;
        background: linear-gradient(to right, rgba(169, 246, 255, 0.5), rgba(169, 209, 255, 0.5));
        border-right: 2px solid rgb(131, 131, 131, 0.5);
        border-radius: 20px 0 0 20px;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 30px;
        }
    }

    .center-list-frame {
        min-width: 200px;
        width: v-bind(leftWidth);
        height: 100%;
        background: linear-gradient(to right, rgba(169, 209, 255, 0.5), rgba(255, 196, 169, 0.5));

        .chat-list-frame {
            margin-top: 10px;
            height: calc(100% - 10px);

            .top-of-list {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                height: 50px;

                .search {
                    position: relative;
                    flex: 1;

                    margin: {
                        left: 10px;
                        right: 10px;
                    }

                    width: 100%;
                    height: 34px;
                    border-radius: 10px;
                    background: linear-gradient(to right, rgba(170, 169, 255, 0.8), rgba(254, 169, 255, 0.8));

                    input {
                        position: absolute;
                        top: 50%;
                        left: 34px;
                        transform: translateY(-50%);
                        width: calc(100% - 40px);
                        height: 100%;
                        background: none;

                        &:focus::-webkit-input-placeholder {
                            color: transparent;
                        }
                    }

                    .search-icon {
                        position: absolute;
                        top: 50%;
                        left: 12px;
                        transform: translateY(-50%);
                    }
                }
            }

            .chat-list {
                width: 100%;
                height: calc(100% - 50px);
                overflow-y: scroll;
                overflow-x: hidden;

                li {
                    margin: {
                        left: 5px;
                    }

                    padding: {
                        left: 10px;
                        right: 10px;
                        top: 10px;
                        bottom: 10px;
                    }

                    display: flex;
                    justify-content: space-between;
                    width: calc(100% - 20px);
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(255, 255, 255, 0.4);
                    }

                    img {
                        min-width: 44px;
                        max-width: 44px;
                        height: 44px;
                        border: 2px solid black;
                    }

                    .content {
                        flex: 1;
                        margin-left: 10px;
                        overflow: hidden;
                        // white-space: nowrap;

                        .top-content {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 10px;

                            .name {
                                flex: 1;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                word-break: break-all;
                                font-size: 16px;
                                font-weight: bold;
                            }

                            .time {
                                color: rgb(150, 150, 150);
                            }
                        }

                        .bottom-content {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            width: 100%;

                            .just-content {
                                width: calc(100% - 40px);
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;
                                word-break: break-all;
                                color: rgb(150, 150, 150);
                            }

                            .no-read-icon {
                                width: 8px;
                                height: 8px;
                                background: rgb(96, 6, 116);
                                opacity: 0.4;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }
        }
    }

    .right-frame {
        flex: 1;
        height: 100%;
        background: linear-gradient(to right, rgba(255, 196, 169, 0.5), rgba(255, 255, 255, 0.8));
        border-radius: 0 20px 20px 0;
    }
}
</style>