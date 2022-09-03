const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const awss = WSServer.getWss()
const PORT = process.env.PORT || 3007

app.ws('/', (ws, res) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
        console.log(msg)
    })
})

app.listen(PORT, () => console.log(`running on port ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    awss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}