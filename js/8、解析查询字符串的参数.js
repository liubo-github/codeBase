function parseQueryStr(queryStr = '') {
    if (queryStr === '') return
    let queryMap = {}
    queryStr.split('&').forEach(item => {
        let itemKeyVal = item.split('=')
        queryMap[itemKeyVal[0]] = itemKeyVal[1]
    })
    return queryMap
}