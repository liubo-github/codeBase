class Event {
    events = {}
    on(event, fn) {
        if (typeof fn != 'function') {
            throw new Error('fn 必须是一个函数！')
        }

        this.events = this.events || {}
        this.events[event] = this.events[event] || []
        if (!this.events[event].includes(fn)) {
            this.events[event].push(fn)
        }
    }

    emit(event, ...params) {
        this.events = this.events || {}
        let eventHandlers = this.events[event]

        if (eventHandlers) {
            for (let i = 0, len = eventHandlers.length; i < len; i++) {
                eventHandlers[i](...params)
            }
        }
    }

    remove(event, fn) {
        this.events = this.events || {}

        // 该事件不存在
        let eventHandlers = this.events[event]
        if (!eventHandlers) return

        // 移除该事件的所有函数
        if (arguments.length === 1) {
            delete this.events[event]
            return
        }

        // 移除指定函数
        let i = eventHandlers.findIndex(eventHandler => eventHandler === fn)
        if (i > -1) {
            eventHandlers.splice(i, 1)
        }
        return
    }
}