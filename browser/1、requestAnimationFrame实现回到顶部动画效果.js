// 文档参考： https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
function scrollToTop() {
    let scrollTop = document.documentElement.scrollTop

    // 不使用 requestAnimationFrame 的情况下，会立即回到顶部，没有动画缓冲效果
    requestAnimationFrame(() => {
        if (scrollTop > 0) {
            let top = 0

            // 每次向上滚动 200px
            if (scrollTop > 200) {
                top = scrollTop - 200
            }
            window.scrollTo(0, top)
            scrollToTop()
        }
    })
}