function transformFlat(list, options = {}) {
    const { childField = 'child' } = options
    let flatList = []
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
            // 如果当前节点有子节点，则将子节点放到list中继续遍历
        if (childField in item) {
            if (item[childField].length > 0) {
                list = list.concat(item[childField])
            }
            delete item[childField]
        }
        flatList.push(item)
    }
    return flatList
}