/**
 * @param fn 函数
 * @param delay 间隔时间
 * @param immdiate 是否立即执行
 */
function debounce(fn, delay, immediate = false) {
    return function() {
        let arg = arguments // 此处获取的arguments，才是防抖函数fn的arguments。setTimeout回调函数中获取的 arguments 并非fn的arguments
        clearTimeout(fn.timer)

        if (immediate) {
            let callNow = !fn.timer
            fn.timer = setTimeout(() => {
                fn.timer = null
            }, delay)
            if (callNow) fn.apply(this, arg)
        } else {
            fn.timer = setTimeout(() => {
                fn.apply(this, arg)
            }, delay)
        }
    }
}