**a.com 页面：**

```
<iframe onload="loaded" src="http://b.com" frameborder="0"></iframe>
<script>
// 必须在页面加载完成后才能使用postMessage通信
function loaded(e) {
    let childWindow = e.path[0].contentWindow
    childWindow.postMessage({ msg: 'a.com to b.com' }, 'http://b.com')
}

window.addEventListener("message", (event) => {
        let {
            origin,
            data,
            source  //消息来源窗口对象的引用
        } = event;
        if (origin !== "http://b.com") return;
        console.log(data); // { msg: 'b.com to a.com' }
    });
</script>
```

**b.com 页面：**

```
<script>
    window.addEventListener("message", (event) => {
        let {
            origin,
            data,
            source
        } = event;
        if (origin !== "http://a.com") return;
        console.log(data); // { msg: 'a.com to b.com' }
    });

     window.parent.postMessage({msg: 'b.com to a.com'}, '*');
</script>
```
