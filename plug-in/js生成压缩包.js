// 作者没有给文档，api和参数需要查看源码，不过参照示例demo也能满足常见的需求了
// 源码地址：https://github.com/Stuk/jszip
import JSZip from 'jszip'
import saveAs from 'jszip/vendor/FileSaver'

let zip = new JSZip()

let fileName = 'xxxx.txt'
let fileContent = 'hello world!'
let options = {}

zip.file(fileName, fileContent, options)

zip.generateAsync({ type: 'blob' }).then(function(content) {
    // see FileSaver.js
    saveAs(content, 'xxxx.zip') // 压缩包后缀名或可设为 .rar
})

// fileContent 参数类型
// 查阅源代码得知参数类型可为：string, array, uint8array, arraybuffer.
// https://github.com/Stuk/jszip/blob/master/lib/utils.js
//  exports.getTypeOf = function(input) {
//     if (typeof input === "string") {
//         return "string";
//     }
//     if (Object.prototype.toString.call(input) === "[object Array]") {
//         return "array";
//     }
//     if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
//         return "nodebuffer";
//     }
//     if (support.uint8array && input instanceof Uint8Array) {
//         return "uint8array";
//     }
//     if (support.arraybuffer && input instanceof ArrayBuffer) {
//         return "arraybuffer";
//     }
// };

// options 参数说明
// https://github.com/Stuk/jszip/blob/master/lib/defaults.js

// 默认参数：
// exports.base64 = false;
// exports.binary = false;
// exports.dir = false;
// exports.createFolders = true;
// exports.date = null;
// exports.compression = null;
// exports.compressionOptions = null;
// exports.comment = null;
// exports.unixPermissions = null;
// exports.dosPermissions = null;

// https://github.com/Stuk/jszip/blob/master/lib/load.js
// options = utils.extend(options || {}, {
// 	base64: false,
// 	checkCRC32: false,
// 	optimizedBinaryString: false,
// 	createFolders: false,
// 	decodeFileName: utf8.utf8decode
// });