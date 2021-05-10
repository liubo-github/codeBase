function randomStr(length) {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'
    let randomStr = ''
    for (let i = 0; i < length; i++) {
        randomStr += str.charAt(Math.floor(Math.random() * str.length))
    }
    return randomStr
}