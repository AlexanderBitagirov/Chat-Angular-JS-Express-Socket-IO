function chatController($scope, AppService, $compile) {
    let socket = io.connect();
    let viewSendMess = angular.element(document.getElementById("messages"))
    let chats = new Map()
    $scope.user = AppService.get("Auth")

    // Получаем подключенные сокеты

    socket.emit("login", {
        user: $scope.user
    })
    socket.on("login", function (data) {
        $scope.onlineUser = data
        $scope.$apply();
    })

    // получаем id юзера

    $scope.receiveIdUser = (id, name) => {
        AppService.save("place", name)
        $scope.userID = id
        $scope.toSend = name

        let data = {
            from: $scope.user,
            to: $scope.toSend,
            toID: $scope.userID
        }




        socket.emit("create chat", data)

        if (chats.has($scope.chatId)) {
            let mess = chats.get($scope.chatId)
            $scope.usersMessages = mess.message
            console.log( $scope.usersMessages)
            mess.message.forEach(element => {
                if (element.userName === $scope.user) {
                    angular.element(
                        viewSendMess.append(
                            $compile(
                                `<div flex='' layout='row' class='out' layout-align='end start'> 
                                  ${element.text} 
                            </div>`
                            )($scope)
                        )
                    );
                } else {
                    angular.element(
                        viewSendMess.append(
                            $compile(
                                `<div flex='' layout='row' class='income' layout-align='start start'><b> 
                                          ${element.userName} 
                                          </b><br> 
                                          ${element.text} 
                                          </div>`
                            )($scope)
                        )
                    );
                }
            });

        } else {
            console.log("Сообщений пока нет")
        }


    }

    socket.on("create chat", function (data) {
        $scope.chatId = data.id

        if (!chats.has(data.id)) {
            chats.set(data.id, data)
        }

    })

    // Отправляем сообщение конкретному юзеру

    $scope.sendMessage = (text) => {

        $scope.text = text
        let data = {
            id: $scope.userID,
            chatId: $scope.chatId,
            from: $scope.user,
            text: $scope.text
        }
        socket.emit("send message", data)

        // рендерим исходящее сообщение

        angular.element(
            viewSendMess.append(
                $compile(
                    `<div flex='' layout='row' class='out' layout-align='end start'> 
                      ${text} 
                </div>`
                )($scope)
            )
        );


    }



    socket.on("send message", function (data, mess) {
        if (chats.has(data.id)) {
            let chatWithUser = chats.get(data.id)
            chatWithUser.message.push(mess)
        } else {
            chats.set(data.id, data)
        }

        // рендерим входящее сообщение
        if ($scope.user !== mess.userName) {
            angular.element(
                viewSendMess.append(
                    $compile(
                        `<div flex='' layout='row' class='income' layout-align='start start'><b> 
                                  ${mess.userName} 
                                  </b><br> 
                                  ${mess.text} 
                                  </div>`
                    )($scope)
                )
            );
        }
    })
}


angular.module("MyApp").component("chat", {
    controller: chatController,
    templateUrl: "./components/chat/chat.html"
});