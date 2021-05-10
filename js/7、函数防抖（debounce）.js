function debounce(fn, interval) {
    let timer
    let gapTime = interval || 200 //间隔时间，如果interval不传，则默认200ms
    return function() {
        clearTimeout(timer)
        let context = this
        let args = arguments // 此处获取的arguments，才是防抖函数fn的arguments
        timer = setTimeout(function() {
            //setTimeout回调函数中获取的 arguments 并非fn的arguments
            fn.call(context, ...args)
        }, gapTime)
    }
}