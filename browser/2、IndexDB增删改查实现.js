// 入门教程：https://www.ruanyifeng.com/blog/2018/07/indexeddb.html
// MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API
const DB_NAME = 'test'

class IndexDB {
    constructor() {
        this.tableName = ''
        this.db = null
    }

    // 连接及创建数据库
    connect(tableName, callback, options) {
        if (!tableName) {
            throw new Error('表名不能为空')
        }
        this.tableName = tableName
        return new Promise((resolve, reject) => {
            // 打开数据库
            const dbRequest = indexedDB.open(DB_NAME)

            // 打开数据库出错
            dbRequest.onerror = e => {
                reject()
            }

            // 打开数据库成功
            dbRequest.onsuccess = e => {
                this.db = dbRequest.result
                resolve(this.db)
            }

            // 数据库不存在则会新建数据库，该函数可以监听到
            // 新建表
            dbRequest.onupgradeneeded = e => {
                this.db = e.target.result

                if (!options) {
                    // keyPath: key 设置主键
                    // autoIncrement: true，自动生成主键
                    options = {
                        keyPath: 'id',
                        autoIncrement: true
                    }
                }

                let objectStore

                // 如果该对象仓库不存在则新建对象仓库（表）
                // objectStoreNames是DOMStringList类型：参考文档 https://developer.mozilla.org/zh-CN/docs/Web/API/DOMStringList
                if (!this.db.objectStoreNames.contains(this.tableName)) {
                    objectStore = this.db.createObjectStore(this.tableName, options)

                    // 回调函数，传入对象仓库实例
                    if (callback) {
                        callback(objectStore)

                        // 创建索引 索引名 索引属性
                        // objectStore.createIndex('userId', 'userId', {
                        //     unique: true
                        // })
                    }
                }
            }
        })
    }

    // 创建事务 transactionType：事务类型
    createTransaction(tableNameList, transactionType) {
        // 写入数据需要新建一个事务。 新建时必须指定表格名称和操作模式（ "只读"或 "读写"）。
        // 新建事务以后， 通过IDBTransaction.objectStore(name) 方法， 拿到 IDBObjectStore 对象

        // "readonly"：允许读取数据， 不改变。
        // "readwrite"： 允许读取和写入现有数据存储， 数据被改变。
        // "versionchange"：
        // 允许执行任何操作， 包括删除和创建对象存储和索引。
        // 此模式是用于开始使用IDBDatabase 的 setVersion() 方法更新版本号事务。 这种模式的事务无法与其它事务并发运行。
        // 这种模式下的事务被称为“ 升级事务”。
        return this.db.transaction(tableNameList, transactionType)
    }

    // 新增数据
    add(data) {
        // 写入操作是一个异步操作， 通过监听连接对象的success事件和error事件， 了解是否写入成功。
        let transaction = this.createTransaction([this.tableName], 'readwrite')
        let request = transaction.objectStore(this.tableName).add(data)

        return new Promise((resolve, reject) => {
            request.onerror = e => {
                reject()
            }

            request.onsuccess = e => {
                let {
                    target: { result }
                } = e
                resolve(result)
            }
        })
    }

    // 查找数据
    read(id) {
        let transaction = this.createTransaction([this.tableName], 'readonly')
        let request = transaction.objectStore(this.tableName).get(id)
        return new Promise((resolve, reject) => {
            request.onerror = e => {
                reject()
            }

            request.onsuccess = e => {
                let {
                    target: { result }
                } = e
                resolve(result)
            }
        })
    }

    // 使用索引查找数据
    /**
     *
     * @param {} indexName 索引名
     * @param {} indexValue 索引值
     */
    readIndex(indexName, indexValue) {
        let transaction = this.createTransaction([this.tableName], 'readonly')
        let request = transaction.objectStore(this.tableName).index(indexName).get(indexValue)

        return new Promise((resolve, reject) => {
            request.onerror = e => {
                reject()
            }
            request.onsuccess = e => {
                let {
                    target: { result }
                } = e
                resolve(result)
            }
        })
    }

    // 更新数据
    update(data) {
        let transaction = this.createTransaction([this.tableName], 'readwrite')
        let request = transaction.objectStore(this.tableName).put(data)
        return new Promise((resolve, reject) => {
            request.onsuccess = e => {
                let {
                    target: { result }
                } = e
                resolve(result)
            }

            request.onerror = e => {
                reject()
            }
        })
    }

    // 删除数据
    delete(id) {
        let transaction = this.createTransaction([this.tableName], 'readwrite')
        var request = transaction.objectStore(this.tableName).delete(id)
        return new Promise((resolve, reject) => {
            request.onsuccess = e => {
                resolve()
            }
            request.onerror = e => {
                reject()
            }
        })
    }
}