/**
 * @param fn 函数
 * @param delay 间隔时间
 * @param type 1：时间戳模式，时间段开始执行 2：定时器模式，时间段结束执行
 */
function throttle(fn, delay, type = 1) {
    let prev = 0
    return function() {
        let arg = arguments
        if (type === 1) {
            let now = Date.now()
            if (now - prev >= delay) {
                fn.apply(this, arg)
                prev = now
            }
        } else if (type === 2) {
            if (!fn.timer) {
                fn.timer = setTimeout(() => {
                    fn.apply(this, arg)
                    fn.timer = null
                }, delay)
            }
        }
    }
}