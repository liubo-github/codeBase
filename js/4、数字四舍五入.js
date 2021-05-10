/**
 *
 * @param {Number} num
 * @param {Number} decimalNum 保留小数位数
 * @returns {Number}
 * @description 对数字进行四舍五入
 */
function roundNumber(num = 0, decimalNum = 0) {
    let multiplier = Math.pow(10, decimalNum)
    if (decimalNum === 0) {
        return Math.round(num)
    } else {
        return Math.round(num * multiplier) / multiplier
    }
}