// 节流包

// 初中版
export function throttle(fn, delay = 1000) {
    let throttled = false
    return function () {
        if (!throttled) {
            throttled = true;
            fn.apply(this, arguments);
            setTimeout(() => {
                throttled = false;
            }, delay)
        }
    }
}

// 幼儿园版
// export function throttle(fn, delay = 1000) {
//     let timeStart = 0; // 起始时间
//     return function () {
//         let timeEnd = new Date(); // 终点时间
//         if (timeEnd - timeStart > delay) {
//             fn.apply(this, arguments);
//             timeStart = timeEnd; // 重置起始时间
//         }
//     }
// }