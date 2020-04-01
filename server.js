const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const {
    uuid
} = require('uuidv4');


let usersOnline = [];
let chats = [];


app.use(express.static(__dirname + "/dist/"));


io.on("connection", function (socket) {
    socket.on("login", function (data) {
        let user = {
            id: socket.id,
            name: data.user
        }
        usersOnline.push(user)
        io.emit("login",
            usersOnline
        )
    })

    socket.on("create chat", function (data) {

        let chat;
        chats.forEach(e => {
            let userSearch = e.users.filter(u => u === data.from || data.to)


            if (userSearch.find(e => e === data.to) && userSearch.find(e => e === data.from)) {
                chat = e
            }
        })
        if (!chat) {
            chat = {
                id: uuid(),
                users: [data.from, data.to],
                message: []
            }
            chats.push(chat)
        }
        io.to(data.toID).to(socket.id).emit("create chat", chat);
        console.log("chats", chats)
    })

    socket.on("send message", function (data) {

        let message = {
            userName: data.from,
            text: data.text
        }

        chats.forEach(e => {
            if (e.id === data.chatId) {
                let a = e
                a.message.push(message)
                io.to(data.id).to(socket.id).emit("send message", a, message);
            }
        })

        console.log("chat", chats)
    })
})

http.listen(3000, function () {
    console.log("listening on *:3000");
});