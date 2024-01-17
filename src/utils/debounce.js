// 防抖包
export function debounce(fn, delay = 1000, loading = false) {
    let timer;
    return function () {
        // 是否立即执行
        if (loading) {
            loading = !loading;
            fn.apply(this, arguments);
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            // arguments 类数组（获取方法未设置后的全部参数）
            fn.apply(this, arguments); // this设置为fn节点
        }, delay);
    }
}