// 参考文档：
// https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader

/**
 *
 * @param {String} dataurl
 * @returns {Blob}
 */
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

/**
 *
 * @param {Blob|File} blobOrFile
 * @param {Function} callback
 */
function blobToDataURL(blobOrFile, callback) {
    let fileReader = new FileReadr()
    fileReader.onload = function(e) {
        callback(e.target.result)
    }
    fileReader.readAsDataURL(blobOrFile)
}

/**
 *
 * @param {Blob} blob
 * @param {String} fileName ex：xxxx.png
 * @param {String} fileType ex：image/png
 * @returns {File}
 */
function blobToFile(blob, fileName, fileType) {
    return new window.File([blob], fileName, { type: fileType })
}