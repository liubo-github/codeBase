function transformTree(list, options = {}) {
    let { keyField = 'id', parentField = 'pid', childField = 'child' } = options
    let record = {} //id为key，保存当前id下的子节点
    let tree = []

    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        let id = item[keyField]

        // 如果id 存在于record中，说明当前节点有子节点
        if (id in record) {
            item[childField] = record[id]
        }
        // 否则没有子节点，默认该节点的子节点为空
        else {
            record[id] = []

            // 关键：将record[id]的引用地址赋值给item[childField]，push子节点到record[id]中，item[childField]随之改变
            item[childField] = record[id]
        }

        // 当前节点的pid是否存在，并且大于0
        if (item[parentField] && item[parentField] > 0) {
            let parentId = item[parentField]

            // 将当前节点保存到父节点的数组中
            if (parentId in record) {
                record[parentId].push(item)
            } else {
                record[parentId] = []
                record[parentId].push(item)
            }
        }
        // 否则表示该节点为根节点
        else {
            tree.push(item)
        }
    }

    return tree
}