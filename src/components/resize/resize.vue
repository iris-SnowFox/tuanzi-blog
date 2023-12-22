<!-- 左右页面收缩中间线组件 -->
<template>
  <div class="resize" title="收缩栏" :style="allStyle" :key="updateNow"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// v-model绑定左侧宽度，右侧请设置为自适应布局+min-width限制
/*
  必传:
    leftWidth: 左侧盒子宽度
    maxWidth: 左侧盒子最大宽度
    minWidth: 左侧盒子最小宽度
  可选:
    minWidthOfResize: 本分割线最小宽度
    paddingOfLeftResize: 本分割线左内边距
    paddingOfRightResize: 本分割线右内边距
    paddingColor: 本分割线边距颜色
    backgroundColorOfResize: 本分割线颜色
    backgroundHoverColorOfResize: 本分割线选中后颜色
 */
const prop = defineProps([
  "leftWidth",
  "maxWidth",
  "minWidth",
  "minWidthOfResize",
  "paddingOfLeftResize",
  "paddingOfRightResize",
  "paddingColor",
  "backgroundColorOfResize",
  "backgroundClickColorOfResize",
]);
const emit = defineEmits(["update:leftWidth"]);

const startX = ref(0); // 初始位置
const minWidthResize = ref({ minWidth: "1px" }); // 本分割线最小宽度
const paddingLeft = ref({ paddingLeft: "5px" }); // 本分割线左内边距
const paddingRight = ref({ paddingRight: "5px" }); // 本分割线右内边距
const paddingColor = ref({ paddingColor: "5px" }); // 本分割线内边距色
const backgroundColor = ref("#fff"); // 本分割线颜色
const backgroundClickColor = ref({ backgroundColor: "#ffc0c0ff" }); // 本分割线选中后颜色
const bgColor = ref(""); // 分割线色
const allStyle = ref(null); // 所有样式整合
const width = ref(0); // 存储左侧盒子宽度
const resize = ref({}); // 用以获取resize DOM
const updateNow = ref(0); // 刷新键

// 获取到传入数据
function getAllPropsAndUseIt() {
  if (prop.minWidthOfResize != undefined)
    minWidthResize.value = { minWidth: prop.minWidthOfResize };
  if (prop.paddingOfLeftResize != undefined)
    paddingLeft.value = { paddingLeft: prop.paddingOfLeftResize };
  if (prop.paddingOfRightResize != undefined)
    paddingRight.value = { paddingRight: prop.paddingOfRightResize };
  if (prop.paddingColor != undefined)
    paddingColor.value = prop.paddingColor;
  if (prop.backgroundColorOfResize != undefined)
    backgroundColor.value = { backgroundColor: prop.backgroundColorOfResize };
  bgColor.value = backgroundColor.value;
  if (prop.backgroundClickColorOfResize != undefined)
    backgroundClickColor.value = {
      backgroundColor: prop.backgroundClickColorOfResize,
    };
  allStyle.value = {
    ...minWidthResize.value,
    ...paddingLeft.value,
    ...paddingRight.value,
    ...bgColor.value,
  };
  // console.log(allStyle.value);
}

onMounted(async () => {
  getAllPropsAndUseIt();
  // 监听鼠标按下事件
  resize.value = document.querySelector(".resize"); // 获取resize DOM
  // console.log("resize",document.querySelector(".resize"));
  if (resize.value != null) {
    resize.value.addEventListener("mousedown", (e) => {
      // console.log("mousedown", e);
      allStyle.value.backgroundColor =
        backgroundClickColor.value.backgroundColor; // 按下开启背景色
      width.value = prop.leftWidth; // 加载初始宽度
      startX.value = e.clientX; // 加载初始位置
      // 鼠标移动事件
      document.onmousemove = function (e) {
        //   console.log("onmousemove", e);
        let endX = e.clientX; // 加载到达位置
        // console.log(
        //   "leftWidth",
        //   parseInt(prop.leftWidth) + "+(endX",
        //   endX + "-startX",
        //   startX.value + ")"
        // );
        let changeW = parseInt(prop.leftWidth) + (endX - startX.value); // 计算最新宽度
        if (changeW < parseInt(prop.minWidth)) {
          // 对宽度改变进行限制
          changeW = prop.minWidth;
          width.value = changeW; // 限制后再赋值
        } else if (changeW > parseInt(prop.maxWidth)) {
          changeW = prop.maxWidth;
          width.value = changeW; // 限制后再赋值
        } else {
          width.value = changeW; // 直接赋值
          startX.value = e.clientX; // 加载初始位置
        }
        document.body.style.userSelect = "none"; // 限制周围文本可选防止鼠标选中
        //   console.log("width", width.value);
        emit("update:leftWidth", width.value); // 同步更新到父组件中
      };
      // 鼠标左键抬起事件
      document.onmouseup = function (e) {
        //   console.log("onmouseup", e);
        // 颜色恢复
        allStyle.value.backgroundColor = backgroundColor.value.backgroundColor;
        // 恢复可选
        document.body.style.userSelect = "auto";
        // 统一结束事件
        document.onmousemove = null;
        document.onmouseup = null;
      };
    });
  } else {
    // 重置DOM
    updateNow.value += 1;
  }
});
</script>

<style lang="scss" scoped>
/*拖拽区div样式*/
.resize {
  position: relative;
  cursor: ew-resize;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-clip: content-box;
  font-size: 32px;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: v-bind(paddingColor);
    z-index: -1;
  }
}
</style>