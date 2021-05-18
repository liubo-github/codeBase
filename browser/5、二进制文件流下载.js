// 参考文档： https://developer.mozilla.org/zh-CN/docs/Web/API/URL

/**
 *
 * @param {*} apiUrl
 * @param {*} fileName ex：xxxx.png
 * @param {*} fileType ex：image/png
 */
function downloadFile(apiUrl, fileName, fileType) {
    axios({
        method: 'post',
        url: apiUrl,
        responseType: 'blob'
    }).then(res => {
        const data = res.data

        // 为 Blob 对象创建临时 URL 对象
        const url = URL.createObjectURL(data)

        // responseType: 'arraybuffer'
        // const url = window.URL.createObjectURL(
        //     new Blob([data], { type: fileType })
        // )

        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // 释放不再使用的 URL 对象
        URL.revokeObjectURL()
    })
}