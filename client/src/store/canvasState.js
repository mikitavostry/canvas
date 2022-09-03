import { makeAutoObservable } from 'mobx'

class CanvasState {

    canvas = null
    socket = null
    sessionId = null
    undoList = []
    redoList = []
    username = ''
    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }
    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(sessionid) {
        this.sessionId = sessionid
    }

    setUserName(username) {
        this.username = username
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() {
        let ctx = this.canvas.getContext('2d')
        if (this.undoList) {
            let dataURL = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    redo() {
        let ctx = this.canvas.getContext('2d')
        if (this.redoList) {
            let dataURL = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataURL
            img.onload = () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            }
        } else {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }
}

export default new CanvasState()