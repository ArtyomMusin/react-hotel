class UseOutsideClick {
    constructor() {
        if (UseOutsideClick.exist) {
            return UseOutsideClick.instance
        }
        UseOutsideClick.instance = this
        UseOutsideClick.exist = true
        this.subscribers = {}
        this.cycle()
    }

    subscribe(id, callback) {
        this.subscribers[id] = callback
    }

    unsubscribe(id) {
        delete this.subscribers[id]
    }

    cycle() {
        document.addEventListener('click', (e) => {
            for (const subscriber in this.subscribers) {
                this.subscribers[subscriber](e)
            }
        })
    }
}

const useOutsideClick = new UseOutsideClick()
export default useOutsideClick
