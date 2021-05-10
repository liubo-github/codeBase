/**
 *
 * @param {number} num
 * @description 格式化数字为千分位 ex：99999 -> 99,999
 * @returns {string}
 */
function formatNumToKb(num) {
    if (isNaN(parseFloat(num)) || num <= 999) return String(num)
    let integer = parseInt(num / (10 * 10 * 10))

    // *100先化成整数再除以100化成小数，只保证精确到小数点后两位
    let decimal = num * 100 - integer * (10 * 10 * 10) * 100
    decimal /= 100
    if (decimal <= 99 && decimal > 9) {
        decimal = '0' + decimal
    } else if (decimal <= 9 && decimal > 0) {
        decimal = '00' + decimal
    } else if (decimal === 0) {
        decimal = '000'
    }
    if (integer <= 999) {
        return integer + ',' + decimal
    } else {
        return formatNumToKb(integer) + ',' + decimal
    }
}