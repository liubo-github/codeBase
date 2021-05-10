function hidePhone(phone = '') {
    if (/^1[3|4|5|6|7|8|9]\d{9}$/g.test(phone)) {
        phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return phone
}