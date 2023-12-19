<template>
    <div class="music-frame" ref="musicBall" @mouseenter="allOfMusicBall" @mouseleave="halfOfMusicBall">
        <div class="music-img-canva" @click="showControlFrame">
            <img :src="audioImg" onerror="errorImgFunction()" alt="音乐" ref="image" draggable="false">
            <canvas :style="`opacity: ${props.opacity};`"></canvas>
        </div>
        <div class="audio-box" ref="audioBox">
            <div class="audio-icon-list">
                <!-- 播放方式 -->
                <play-cycle theme="multi-color" size="18" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="playWayList[playWayFlag] === 'playCycle'"
                    @click="goToNextPlayWay" />
                <loop-once theme="multi-color" size="18" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="playWayList[playWayFlag] === 'loopOnce'"
                    @click="goToNextPlayWay" />
                <play-once theme="multi-color" size="18" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="playWayList[playWayFlag] === 'playOnce'"
                    @click="goToNextPlayWay" />
                <shuffle-one theme="multi-color" size="18" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="playWayList[playWayFlag] === 'shuffle'"
                    @click="goToNextPlayWaySpecial" />

                <!-- 播放及切换 -->
                <div class="playMusicBox">
                    <go-start theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style icon-special-hover-style" @click="goToLast" />
                    <pause theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" v-if="isGo" class="icon-same-style icon-special-hover-style"
                        @click="audioPlayStop" />
                    <play-one theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" v-else class="icon-same-style icon-special-hover-style"
                        @click="audioPlayGo" />
                    <go-end theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style icon-special-hover-style" @click="goToNext" />
                </div>

                <!-- 声音 -->
                <div class="sound-frame" ref="soundFrame" @mouseleave="hoverSoundOff">
                    <volume-small theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" v-show="isSoundOn" @click="changeSoundOn"
                        @mouseenter="hoverSound" />
                    <volume-mute theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                        strokeLinejoin="bevel" class="icon-same-style" v-show="!isSoundOn" @click="changeSoundOn"
                        @mouseenter="hoverSound" />
                    <div class="sound-change" ref="soundChangeDiv" @mousedown="dragSoundTo" @click="clickSoundTo">
                        <div class="sound-now" ref="soundNowDiv"></div>
                    </div>
                </div>

                <!-- 音乐列表 -->
                <music-list theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="!isSoundChangeOn" @click="musicListOnOrOff" />

                <!-- 分享 -->
                <share-one theme="multi-color" size="20" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                    strokeLinejoin="bevel" class="icon-same-style" v-show="!isSoundChangeOn" @click="getHTMLUrl" />
            </div>

            <div class="progress-bar" ref="progressBar" @mousedown="dragAudioProgress" @click="setAudioProgress">
                <div class="progress" ref="progress"></div>
            </div>
            <audio ref="audio">
                <source :src="audioSrc" type="audio/mpeg">
            </audio>
        </div>
        <div class="music-list-frame" ref="musicListControl">
            <div class="music-list" v-for="(list, index) in musicNowList" :key="index">
                <div class="list-box now-go-music" v-if="list.src === audioSrc" @mouseenter="mouseInOneMusic(index)"
                    @mouseleave="mouseOutOneMusic(index)">
                    <div class="music-img-box" @click="audioPlayOrStop()">
                        <div class="black-hover" v-show="list.isBlackHoverOn"></div>
                        <play-one theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                            strokeLinejoin="bevel" class="out-img" v-if="!isGo" v-show="list.isBlackHoverOn" />
                        <pause theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                            strokeLinejoin="bevel" v-else class="out-img" v-show="list.isBlackHoverOn" />
                        <img :src="list.img" alt="音乐" draggable="false">
                    </div>
                    <div class="music-name">{{ list.name }}</div>
                </div>
                <div class="list-box" v-else @mouseenter="mouseInOneMusic(index)" @mouseleave="mouseOutOneMusic(index)">
                    <div class="music-img-box" @click="audioPlayTo(index)">
                        <div class="black-hover" v-show="list.isBlackHoverOn"></div>
                        <play-one theme="multi-color" size="30" :fill="['#2a2a2a', '#ffebef', '#2a2a2a', '#ffffff']"
                            strokeLinejoin="bevel" class="out-img" v-show="list.isBlackHoverOn" />
                        <img :src="list.img" alt="音乐" draggable="false">
                    </div>
                    <div class="music-name">{{ list.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useMessage } from '@/utils/message.jsx';
import {
    PlayCycle,
    LoopOnce,
    PlayOnce,
    ShuffleOne,
    GoStart,
    PlayOne,
    Pause,
    GoEnd,
    VolumeSmall,
    VolumeMute,
    MusicList,
    ShareOne,
} from "@icon-park/vue-next";

/*
    必传:
        audioSource 音频所需资源 / Array
            必传:
                src 链接
                img 图片链接
                name 音乐名
            可选:
                musicColor 频谱颜色
    可选:
        opacity 透明度
 */
const props = defineProps({
    audioSource: Array,
    opacity: Number,
});

const musicBall = ref(null); // musicBall dom
const audioBox = ref(null); // audioBox dom
const image = ref(null); // img dom
const audio = ref(null); // audio dom
const progressBar = ref(null); // progressBar dom
const progress = ref(null); // progress dom
const soundFrame = ref(null); // soundFrame dom
const soundChangeDiv = ref(null); // soundChange dom
const soundNowDiv = ref(null); // soundNowDiv dom
const musicListControl = ref(null); // musicList dom
const musicNowList = computed(() => props.audioSource); // music列表
const audioIndex = ref(0); // audio 下标
const audioSrc = computed(() => props.audioSource[audioIndex.value].src); // audio 路径
const audioImg = computed(() => props.audioSource[audioIndex.value].img); // audio 图
const musicColor = ref('#f1939c'); // 频谱颜色
const cvs = ref({}); // canvas
const ctx = ref({}); // canvas type
let isInit = false; // 是否初始化
let dataArray, analyser; // 音频数据数组 / 分析器
const playWayFlag = ref(0); // 当前播放方式标识符
const playWayList = ref(["playCycle", "loopOnce", "playOnce", "shuffle"]); // 播放方式存放列表
const isAudioControlOn = ref(false); // 音频控制面板是否开启
const isGo = ref(false); // 是否播放标识符
const isSoundOn = ref(true); // 声音是否开启
const isSoundChangeOn = ref(false); // 音量控制条是否开启
const isMusicListOn = ref(false); // 音乐列表是否开启
const isMusicListLoad = ref(false); // 音乐列表是否加载
const firstOffsetX = ref(0); // 鼠标点击初始位置（相对组件）
const mouseOffsetX = ref(0); // 鼠标位移至位置（相对组件）

watch(audioIndex, () => {
    if (props.audioSource[audioIndex.value].musicColor) {
        musicColor.value = props.audioSource[audioIndex.value].musicColor;
    } else {
        musicColor.value = '#f1939c';
    }
})

onMounted(() => {
    if (props.audioSource[audioIndex.value].musicColor) {
        musicColor.value = props.audioSource[audioIndex.value].musicColor;
    }
    // 添加为音乐列表数组添加黑幕控制属性
    musicNowList.value.forEach(element => {
        element = { ...element, isBlackHoverOn: false };
    })

    audio.value.addEventListener('play', onPlay);
    audio.value.addEventListener('pause', onPause);
    audio.value.addEventListener('ended', onEnded);
    audio.value.addEventListener('timeupdate', updateProgressBar);

    cvs.value = document.querySelector('canvas');
    ctx.value = cvs.value.getContext('2d');
    initCvs();
    draw();
})

// 音频播放开始
function onPlay() {
    isGo.value = true;
    console.log('播放开始~');
    image.value.classList.remove('paused');
    image.value.classList.add('img-rotate');
    // 判断是否需要初始化
    if (isInit) {
        return;
    }
    const audioSource = document.querySelector('audio'); // 重新初始化audio DOM
    // 初始化
    const audCtx = new AudioContext(); // 创建音频上下文 audio API
    const source = audCtx.createMediaElementSource(audioSource); // 创建音频源节点
    analyser = audCtx.createAnalyser(); // 创建分析器节点
    analyser.fftSize = 512; // 傅里叶变换长度设置
    dataArray = new Uint8Array(analyser.frequencyBinCount);// 数组接收分析器节点分析数据
    source.connect(analyser); // 链接视频源和分析器
    analyser.connect(audCtx.destination); // 链接分析器和音频上下文终点
    isInit = true; // 初始化完成
};

// 音频进度更新
function updateProgressBar() {
    const progressNow = (audio.value.currentTime / audio.value.duration) * 100; // 计算百分比进度
    progress.value.style.width = progressNow + '%'; // 加%
}

// 音频播放停止
function onPause() {
    isGo.value = false;
    console.log('播放停止');
    image.value.classList.add('paused');
};

// 音频播放结束
function onEnded() {
    isGo.value = false;
    console.log('播放结束');
    cancelAnimationFrame(draw);
    if (playWayList.value[playWayFlag.value] === "playCycle") {
        // 持续循环播放
        audioIndex.value += 1;
        if (audioIndex.value >= props.audioSource.length) {
            audioIndex.value = 0;
            audio.value.load(); // 加载新音频
            audio.value.play(); // 音频,启动!
        } else {
            console.log(`Playing ${audioSrc.value}`);
            audio.value.load(); // 加载新音频
            audio.value.play(); // 音频,启动!
        }
    } else if (playWayList.value[playWayFlag.value] === "loopOnce") {
        // 循环播放一次
        audioIndex.value += 1;
        if (audioIndex.value >= props.audioSource.length) {
            audioIndex.value = 0;
            audio.value.pause(); // 音频,关闭!
        } else {
            console.log(`Playing ${audioSrc.value}`);
            audio.value.load(); // 加载新音频
            audio.value.play(); // 音频,启动!
        }
    } else if (playWayList.value[playWayFlag.value] === "playOnce") {
        // 单曲循环
        console.log(`Playing ${audioSrc.value}`);
        audio.value.play(); // 音频,启动!
    } else {
        // 随机播放
        audioIndex.value = Math.floor(Math.random() * props.audioSource.length);
        console.log(`Playing ${audioSrc.value}`);
        audio.value.load(); // 加载新音频
        audio.value.play(); // 音频,启动!
    }
};

// 初始化canvas尺寸
function initCvs() {
    cvs.value.width = window.innerWidth * devicePixelRatio;
    cvs.value.height = (window.innerHeight / 2) * devicePixelRatio;
}

// canvas画布
function draw() {
    requestAnimationFrame(draw); // 画布更新
    const { width, height } = cvs.value; // 获取画布宽高
    ctx.value.clearRect(0, 0, width, height); // 清空画布
    if (!isInit) { // 是否初始化
        return;
    }
    analyser.getByteFrequencyData(dataArray); // 获取音频数据并保存在数据数组中
    const len = dataArray.length / 2.5; // 数组长度缩2.5，减少无音频部分
    const barWidth = width / len / 2; // 计算每个音频条宽度
    ctx.value.fillStyle = musicColor.value; // 音频条颜色
    for (let i = 0; i < len; i++) {
        const data = dataArray[i]; // 获取当条数据 <256
        const barHeight = data / 255 * height; // 计算该频谱条高度
        const x1 = i * barWidth + width / 2; // 计算该频谱条起始点x轴坐标（右边）
        const x2 = width / 2 - (i + 1) * barWidth; // 计算该频谱条起始点x轴坐标（左边）
        const y = height - barHeight; // 计算该频谱条起始点y轴坐标
        ctx.value.fillRect(x1, y, barWidth - 2, barHeight); // 画右边
        ctx.value.fillRect(x2, y, barWidth - 2, barHeight); // 画左边
    }
}

function allOfMusicBall() {
    // 展开音乐球
    musicBall.value.style.left = "10px";
}
function halfOfMusicBall() {
    // 遮掩音乐球
    if (!isAudioControlOn.value) {
        musicBall.value.style.left = "-35px";
    }
}
function showControlFrame() {
    // 打开/关闭控制面板
    isAudioControlOn.value = !isAudioControlOn.value;
    if (isAudioControlOn.value === true) {
        audioBox.value.style.width = "250px";
        audioBox.value.style.boxShadow = "0 0 2px rgb(25, 25, 25)";
        musicListControl.value.style.width = "220px";
    } else {
        if (isMusicListLoad.value === true) {
            musicListOnOrOff();
            nextTick(() => {
                setTimeout(function () {
                    musicListControl.value.style.width = "0px";
                }, 500);
                setTimeout(function () {
                    audioBox.value.style.boxShadow = "0 0 0px rgb(25, 25, 25)";
                    audioBox.value.style.width = "0px";
                }, 800);
            })
        } else {
            musicListControl.value.style.width = "0px";
            setTimeout(function () {
                audioBox.value.style.boxShadow = "0 0 0px rgb(25, 25, 25)";
                audioBox.value.style.width = "0px";
            }, 300);
        }
    }
}

function goToNextPlayWay() {
    // 切换播放方式
    playWayFlag.value += 1;
}
function goToNextPlayWaySpecial() {
    // 最后一个切换
    playWayFlag.value = 0;
}
async function audioPlayGo() {
    // 开始播放
    await audio.value.play(); // 音频,启动!
}
async function audioPlayOrStop() {
    // 音频启动与暂停
    if (isGo.value === false) {
        await audio.value.play(); // 音频,启动!
    } else {
        await audio.value.pause(); // 音频,暂停!
    }
}
async function audioPlayTo(index) {
    // 切换播放
    audioIndex.value = index;
    await audio.value.load();
    await audio.value.play();
}
async function audioPlayStop() {
    // 暂停播放
    await audio.value.pause(); // 暂停音频
}
async function goToLast() {
    // 播放上一个
    if (audioIndex.value != 0) {
        audioIndex.value -= 1;
    } else {
        audioIndex.value = props.audioSource.length - 1;
    }
    await audio.value.load();
    await audio.value.play();
}
async function goToNext() {
    // 播放下一个
    if (audioIndex.value != props.audioSource.length - 1) {
        audioIndex.value += 1;
    } else {
        audioIndex.value = 0;
    }
    await audio.value.load();
    await audio.value.play();
}
function musicListOnOrOff() {
    //开启/关闭音乐列表
    isMusicListOn.value = !isMusicListOn.value;
    if (isMusicListOn.value === true) {
        isMusicListLoad.value = true;
        nextTick(() => {
            musicListControl.value.style.top = "70px";
            musicListControl.value.style.maxHeight = "178px";
        })
    } else {
        musicListControl.value.style.maxHeight = "0px";
        musicListControl.value.style.top = "60px";
        nextTick(() => {
            isMusicListLoad.value = false;
        })
    }
}
function mouseInOneMusic(index) {
    // 移入开启黑幕
    musicNowList.value[index].isBlackHoverOn = true;
}
function mouseOutOneMusic(index) {
    // 移入关闭黑幕
    musicNowList.value[index].isBlackHoverOn = false;
}

function changeSoundOn() {
    // 声音关闭与否
    isSoundOn.value = !isSoundOn.value;
    audio.value.muted = !isSoundOn.value;
}
function hoverSound() {
    // 声音改变器开启
    isSoundChangeOn.value = true;
    soundChangeDiv.value.style.width = '50px';
    soundFrame.value.style.height = '100%';
    soundFrame.value.style.width = '78.8px';
    soundNowDiv.value.style.width = audio.value.volume * 100 + '%';
}
function dragSoundTo(event) {
    // 点击调整音量
    firstOffsetX.value = event.offsetX; // 拖动初始位置
    soundChangeDiv.value.addEventListener("mousemove", clickMouseMoveOfSound);
    document.addEventListener("mouseup", dragSoundUp);
}
// 监听音量控件的拖动
function clickMouseMoveOfSound(event) {
    mouseOffsetX.value = event.offsetX;
    if (mouseOffsetX.value > 100) {
        mouseOffsetX.value = 100;
    } else if (mouseOffsetX.value < 0) {
        mouseOffsetX.value = 0;
    }
    const soundBarWidth = soundChangeDiv.value.clientWidth; // 声音条宽度
    const newVolume = (mouseOffsetX.value / soundBarWidth); // 进度调整百分比
    audio.value.volume = newVolume; // 赋值当前声音
    soundNowDiv.value.style.width = audio.value.volume * 100 + '%'; // 调整展示
}
// 结束调整音量
function dragSoundUp() {
    soundChangeDiv.value.removeEventListener('mousemove', clickMouseMoveOfSound);
    document.removeEventListener('mouseup', dragSoundUp);
}
function clickSoundTo(event) {
    mouseOffsetX.value = event.offsetX;
    const soundBarWidth = soundChangeDiv.value.clientWidth; // 声音条宽度
    const newVolume = (mouseOffsetX.value / soundBarWidth); // 进度调整百分比
    audio.value.volume = newVolume; // 赋值当前声音
    soundNowDiv.value.style.width = audio.value.volume * 100 + '%'; // 调整展示
}
function hoverSoundOff() {
    // 声音改变器关闭
    soundChangeDiv.value.removeEventListener('mousemove', clickMouseMoveOfSound);
    document.removeEventListener('mouseup', dragSoundUp);
    soundChangeDiv.value.style.width = '0px';
    soundNowDiv.value.style.width = '0%';
    soundFrame.value.style.width = '20px';
    soundFrame.value.style.height = 'auto';
    isSoundChangeOn.value = false;
}

function setAudioProgress(event) {
    // 设置音频进度
    mouseOffsetX.value = event.offsetX; // 拖动位置
    const progressBarWidth = progressBar.value.clientWidth; // 总进度宽度
    const progressPercentage = (mouseOffsetX.value / progressBarWidth); // 进度调整百分比
    const newTime = progressPercentage * audio.value.duration; // 计算真实时间位置
    audio.value.currentTime = newTime; // 赋给当前时间
}
function dragAudioProgress() {
    // 拖动调整音频进度
    progressBar.value.addEventListener("mousemove", clickMouseMoveOfProgress);
    document.addEventListener("mouseup", dragProgressUp);
}
function clickMouseMoveOfProgress(event) {
    // 拖动调整进度条
    mouseOffsetX.value = event.offsetX; // 拖动位置
    const progressBarWidth = progressBar.value.clientWidth; // 总进度宽度
    const progressPercentage = (mouseOffsetX.value / progressBarWidth); // 进度调整百分比
    const newTime = progressPercentage * audio.value.duration; // 计算真实时间位置
    audio.value.currentTime = newTime; // 赋给当前时间
}
function dragProgressUp() {
    // 结束拖动进度条
    progressBar.value.removeEventListener('mousemove', clickMouseMoveOfProgress);
    document.removeEventListener('mouseup', dragProgressUp);
}

async function getHTMLUrl() {
    // 获取url
    const url = window.location.href;
    try {
        await navigator.clipboard.writeText(url);
        useMessage("success", "复制成功");
    } catch (error) {
        useMessage("error", error);
    }
}
</script>

<style lang="scss" scoped>
$main-border: 5px solid #2a2a2a;

.music-frame {
    z-index: 99;
    position: fixed;
    top: 40%;
    left: -35px;
    transform: translate(0, -50%);
    transition: left 0.5s ease;

    .music-img-canva {
        z-index: 99;
        position: relative;
        cursor: pointer;
        width: 60px;
        height: 60px;
        border: $main-border;
        border-radius: 50%;
        box-shadow: 0 0 4px black;
        overflow: hidden;

        img {
            user-select: none;
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
        }

        canvas {
            position: absolute;
            left: 0px;
            bottom: 0px;
            width: 60px;
            height: 40px;
            border-radius: 50%;
        }

        .img-rotate {
            animation: rotate-img 10s linear infinite forwards;

            &.paused {
                animation-play-state: paused;
            }
        }

        @keyframes rotate-img {
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .audio-box {
        z-index: 98;
        position: absolute;
        top: 0;
        left: 35px;
        display: flex;
        flex-direction: column;
        width: 0px;
        height: 60px;
        background-color: white;
        border: $main-border;
        border-left: 0px;
        border-radius: 0 24px 24px 0;
        overflow: hidden;
        transition: all 0.4s ease;

        .audio-icon-list {
            padding-left: 35px;
            flex: 9;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 215px;
            overflow: hidden;

            .icon-same-style {
                cursor: pointer;
                border-radius: 50%;
            }

            .playMusicBox {
                .icon-special-hover-style {
                    &:hover {
                        background: #ffebef;
                    }
                }
            }

            .sound-frame {
                display: flex;
                align-items: center;

                .sound-change {
                    cursor: pointer;
                    width: 0px;
                    height: 5px;
                    border-radius: 24px;
                    background: #656565;
                    transition: all 0.5s ease;

                    .sound-now {
                        width: 0px;
                        height: 100%;
                        border-radius: 24px;
                        background: #c5c5c5;
                    }
                }
            }
        }

        .progress-bar {
            flex: 1;
            margin-left: 20px;
            cursor: pointer;
            width: calc(100% - 20px);
            height: 5px;

            .progress {
                width: 0;
                height: 100%;
                background: linear-gradient(to right, white, v-bind(musicColor));
                border-radius: 24px;
            }
        }
    }

    .music-list-frame {
        position: absolute;
        overflow-y: scroll;
        top: 60px;
        left: 30px;
        padding: 2px;
        width: 0px;
        max-height: 0px;
        border: $main-border;
        border-top: 0px;
        box-shadow: 0 0 2px rgb(55, 55, 55);
        transition: all 0.6s ease;

        .music-list {

            &:not(:last-child) {
                margin-bottom: 2px;
            }

            .list-box {
                display: flex;
                align-items: center;

                &:hover {
                    background: linear-gradient(to right, rgb(255, 209, 209), white);
                }

                .music-img-box {
                    position: relative;

                    .black-hover {
                        position: absolute;
                        cursor: pointer;
                        width: 54px;
                        height: 54px;
                        background: #2a2a2a20;
                    }

                    .out-img {
                        position: absolute;
                        cursor: pointer;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }

                    img {
                        user-select: none;
                        cursor: pointer;
                        width: 50px;
                        height: 50px;
                        border: 4px double rgb(116, 116, 116);
                    }
                }

                .music-name {
                    margin-left: 10px;
                    cursor: default;
                    max-width: 120px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    word-break: break-all;
                    white-space: nowrap;
                    font-size: 14px;
                    font-weight: 600;
                }
            }

            .now-go-music {
                background: linear-gradient(to right, rgb(255, 209, 209), white);

                .music-name {
                    color: #ff7676;
                }
            }
        }
    }
}
</style>