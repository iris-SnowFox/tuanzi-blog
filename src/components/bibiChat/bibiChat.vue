<!-- 聊天室组件 -->
<template>
    <div class="bibi-chat-frame">
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
                    <li v-for="(list, index) in chatListData" :key="list.id" v-show="!isSearching" @click="goToChat(index)">
                        <img :src="list.avatar" alt="头像">
                        <div class="content">
                            <div class="top-content">
                                <div class="name">{{ list.name }}</div>
                                <div class="time">{{ list.lastChatTime }}</div>
                            </div>
                            <div class="bottom-content">{{ list.lastChatData }}</div>
                        </div>
                    </li>
                    <li v-for="(list, index) in searchChatListData" :key="list.id" v-show="isSearching"
                        @click="goToChat(index)">
                        <img :src="list.avatar" alt="头像">
                        <div class="content">
                            <div class="top-content">
                                <div class="name">{{ list.name }}</div>
                                <div class="time">{{ list.lastChatTime }}</div>
                            </div>
                            <div class="bottom-content">{{ list.lastChatData }}</div>
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
            <chatView :isShowChat="isShowChat" :name="chatBro"></chatView>
        </div>
    </div>
</template>

<script setup>
import resize from "@/components/resize/resize.vue"
import chatView from "./chatView.vue";
import { ref } from "vue"
import {
    Communication,
    Search,
    AddThree,
} from "@icon-park/vue-next";

const charList = ref(null); // charList dom
const searchInput = ref(null); // searchInput dom
const leftWidth = ref("200px"); // 聊天列表宽度
const whatList = ref("chatList"); // 列表切换
const chatListData = ref([ // 聊天列表数据
    { id: 1, name: "牢大", lastChatData: "孩子们，我回来了", lastChatTime: "2023:12:25 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.cc73380011599a3ea359c5dbba559d28?rik=tb%2fyu09bRHjEhg&riu=http%3a%2f%2fsource.shop.busionline.com%2f2023-06-10_6484303597478.jpg&ehk=hDPMedrhYgLNPe9M%2bDMnJCyfCzPTdHPZJjGm8xdBcrc%3d&risl=&pid=ImgRaw&r=0" },
    { id: 2, name: "丁真", lastChatData: "雪豹闭嘴", lastChatTime: "2023:12:25 15:23", avatar: "https://x0.ifengimg.com/ucms/2020_49/341F29F5E7EADA81222DE30CE8D313807AB1AA9C_w600_h630.jpg" },
    { id: 3, name: "范小勤", lastChatData: "阿里，阿里巴巴", lastChatTime: "2023:12:21 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e66e868694dd76aa03fa4973380d1f28?rik=Z44alJXCr8YU3Q&riu=http%3a%2f%2fwww.daheyuqing.com%2fupload%2fueditor%2fphp%2fupload%2fimage%2f20210302%2f1614649000143504.jpg&ehk=oiF0e4ncelAGXa4upHU0S1nacBLElUPklWfixUwcC3w%3d&risl=&pid=ImgRaw&r=0" },
    { id: 4, name: "捷豹", lastChatData: "啾啾啾，小飞棍来咯~", lastChatTime: "2023:12:22 19:23", avatar: "https://n.sinaimg.cn/sports/crawl/103/w852h851/20200214/054b-ipmxpvz7173053.jpg" },
    { id: 5, name: "战鹰", lastChatData: "啾啾啾，小飞棍来咯~", lastChatTime: "2023:12:21 19:23", avatar: "https://www.cioinsight.com.cn/uploads/images/20230201/20230201132116_96864.png" },
    { id: 6, name: "菜就多练", lastChatData: "菜，就多练", lastChatTime: "2023:12:20 19:23", avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.yvgKNKAb2ZO35olZ_c5W0wE1FK?rs=1&pid=ImgDetMain" },
    { id: 7, name: "勇次郎", lastChatData: "终于可以。好好地。玩了！", lastChatTime: "2023:11:22 19:23", avatar: "https://img-nos.yiyouliao.com/alph/52f9bd33d003614e587a1c82fefd8720.png?yiyouliao_channel=msn_image" },
    { id: 8, name: "坤坤", lastChatData: "全民制作人们大家好", lastChatTime: "2021:12:22 19:23", avatar: "https://ts1.cn.mm.bing.net/th/id/R-C.e4fe1a1677f72143432de42d44e85f9f?rik=QNhDoEtIS2Ve3A&riu=http%3a%2f%2finews.gtimg.com%2fnewsapp_match%2f0%2f15103659616%2f0&ehk=gvcKqCFPB5ADv7JtilqqKL%2b1U87peA41C0HCNdeflKc%3d&risl=&pid=ImgRaw&r=0" },
]);
const searchChatListData = ref([]); // 搜索聊天列表数据
const isSearching = ref(false); // 是否正在搜索
const isShowChat = ref(false); // 是否显示聊天界面
const chatBro = ref(""); // 聊天对象名

// 聊天列表模糊时间
function changeToFuzzyTime() {
    chatListData.value.forEach(element => {
        const nowDate = new Date();
        const dateArray = element.lastChatTime.split(" ");
        // 获取年月日
        const year = dateArray[0].split(":")[0];
        const month = dateArray[0].split(":")[1];
        const day = dateArray[0].split(":")[2];
        if (day != nowDate.getDate()) {
            element.lastChatTime = year + "/" + month + "/" + day;
            return;
        } else {
            element.lastChatTime = dateArray[1];
            return;
        }
    });
}
changeToFuzzyTime();

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
        chatListData.value.forEach(element => {
            if (element.name.includes(searchInput.value.value)) {
                searchArray = [...searchArray, element];
            }
        })
        searchChatListData.value = [...searchArray];
    } else {
        isSearching.value = false;
        searchChatListData.value = [];
    }
}
// 开启聊天界面
function goToChat(index) {
    isShowChat.value = true;
    if (isSearching.value === true) {
        chatBro.value = searchChatListData.value[index].name;
    } else {
        chatBro.value = chatListData.value[index].name;
    }
}
</script>

<style lang="scss" scoped>
.bibi-chat-frame {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 800px;
    height: 450px;
    background: linear-gradient(rgba(255, 103, 146, 0.5), rgba(255, 255, 255, 0.8));
    border-radius: 20px 20px 20px 20px;
    backdrop-filter: blur(2px);
    overflow: hidden;

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
                height: calc(100% - 40px);
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

                    &:last-child {
                        margin-bottom: 10px;
                    }

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
                            width: calc(100% - 40px);
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            word-break: break-all;
                            color: rgb(150, 150, 150);
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