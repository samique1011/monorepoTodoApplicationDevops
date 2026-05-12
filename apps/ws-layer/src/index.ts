import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port : 5001});

wss.on('connection' , (socket) => {
    socket.send("Connected to the ws server")
})