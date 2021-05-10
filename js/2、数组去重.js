// 使用Set去重
function unique(arr) {
    return Array.from(new Set(arr))
}

// 键值反转去重
function unique(arr) {
    let map = {}
    let uniqueArr = []
    arr.forEach((v, i) => {
        if (!(v in map)) {
            map[v] = i
        }
    })

    for (let i of Object.keys(map)) {
        uniqueArr.push(arr[i])
    }
    return uniqueArr
}

// map去重
function unique(arr) {
    let map = new Map()
    let uniqueArr = []
    arr.forEach((v, i) => {
        if (map.has(v)) {
            map.set(v, true)
        } else {
            map.set(v, false)
            uniqueArr.push(v)
        }
    })

    return uniqueArr
}