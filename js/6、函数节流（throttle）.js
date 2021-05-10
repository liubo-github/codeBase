function throttle(fn, interval) {
    let enterTime = 0 //触发的时间
    let gapTime = interval || 300 //间隔时间，如果interval不传，则默认300ms
    return function() {
        let context = this
        let backTime = Date.now() //第一次函数return即触发的时间
        if (backTime - enterTime > gapTime) {
            fn.call(context, ...arguments)
            enterTime = backTime //赋值给第一次触发的时间，这样就保存了第二次触发的时间
        }
    }
}