angular.module('ARLearn').controller('RunChatThreadController', function ($scope, $window, $interval, $routeParams, ChatService, AccountService, Player, $gravatar, $rootScope, ChannelApi, $http) {
    var players = [];
    $http.defaults.headers.common['Authorization'] = 'GoogleLogin auth='+$routeParams.auth;

    ChatService.getThreads($routeParams.runId).then(function(threads){
        console.log(threads);
        for (i = 0; i < threads.length; i++) {
            if (threads[i].name == $routeParams.name ){
                $scope.threadId = threads[i].threadId;
                console.log($scope.threadId);

                Player.getPlayersByRunId({id: $routeParams.runId}).$promise.then(
                    function (data) {
                        if (data.error) {

                        } else {
                            for (i = 0; i < data.users.length; i++) {
                                if (data.users[i].deleted) {
                                } else {
                                    data.users[i].gravatarUrl = $gravatar.generate(data.users[i].email);
                                    players.push(data.users[i]);

                                }
                            }


                        }
                        ChatService.loadRecentMessagesThread($routeParams.runId, $scope.threadId).then(function (messages) {
                            $scope.messages = messages;
                            for (i = 0; i < players.length; i++) {
                                for (j = 0; j < messages.length; j++) {
                                    if (players[i].accountType == messages[j].senderProviderId && players[i].localId == messages[j].senderId) {
                                        messages[j].sender = players[i].name;
                                        messages[j].gravatarUrl = players[i].gravatarUrl;
                                        messages[j].isMe = (players[i].localId == $scope.me.localId);
                                    }
                                }
                            }

                            $interval(function() {
                                //var elem = $('.direct-chat-messages')[0];
                                //elem.scrollTop = elem.scrollHeight;
                                $('body')[0].scrollTop= 100000
                            }, 500, true);



                            //    .on('shown.bs.modal', function () {
                            //    var elem = document.getElementById('reverse_scroll');
                            //    elem.scrollTop = elem.scrollHeight;
                            //});

                        });

                    }
                );

            }
        }
    });





    var messageIds = {};

    function addLocalMessage(message) {

        for (i = 0; i < players.length; i++) {
            if (players[i].accountType == message.senderProviderId && players[i].localId == message.senderId) {
                message.sender = players[i].name;
                message.gravatarUrl = players[i].gravatarUrl;
                message.isMe = (players[i].localId == $scope.me.localId);
            }
        }

        if (!messageIds[message.messageId]) {
            messageIds[message.messageId] = true;
            var scroll = false;
            var elem = $('.direct-chat-messages')[0];
            if (elem.scrollHeight - elem.scrollTop == elem.clientHeight){
                var scroll = true;

            }
            $scope.messages.push(message);

            //if (scroll) {
            //    elem.scrollTop = elem.scrollHeight;
            //
            //}
            $interval(function() {
                //var elem = $('.direct-chat-messages')[0];
                //elem.scrollTop = elem.scrollHeight;
                $('body')[0].scrollTop= 100000
            }, 100, true);

        }

    }


    AccountService.myDetails().then(function (me) {
        //$scope.runTitle = data.title;

        //$scope.runId = data.runId;
        $scope.me = me;
        me.gravatarUrl = $gravatar.generate(me.email);


        players.push(me);
    });



    $scope.sendMessage = function (body) {
        $scope.newMessage = "";
        var message = {
            "type": "org.celstec.arlearn2.beans.run.Message",
            "runId": $routeParams.runId,
            "deleted": false,
            "threadId": $scope.threadId,
            "subject": "Reply",
            "body": body
        };

        ChatService.sendMessage(message).then(function (serverMessage) {
            addLocalMessage(serverMessage);
            //var elem = $('body')[0];
            //elem.scrollTop = elem.scrollHeight;
            //$('body')[0].scrollTop= 100000
            $interval(function() {
                //var elem = $('.direct-chat-messages')[0];
                //elem.scrollTop = elem.scrollHeight;
                $('body')[0].scrollTop= 100000
            }, 100, true);
        });
    };



    var SocketHandler = function () {
        this.messageCallback = function () {
        };

        this.onMessage = function (callback) {
            var theCallback = function (message) {
                callback(JSON.parse(message.data));
            }

            if (this.channelSocket == undefined) {
                this.messageCallback = theCallback;
            } else {
                this.channelSocket.onmessage = theCallback;
            }
        }

        var context = this;
        this.socketCreationCallback = function (channelData) {
            var channel = new goog.appengine.Channel(channelData.token);
            context.channelId = channelData.channelId;
            var socket = channel.open();
            socket.onerror = function () {
                console.log("Channel error");
            };
            socket.onclose = function () {
                console.log("Channel closed, reopening");
                //We reopen the channel
                context.messageCallback = context.channelSocket.onmessage;
                context.channelSocket = undefined;
                $.getJSON("chats/channel", context.socketCreationCallback);
            };
            context.channelSocket = socket;
            console.log("Channel info received");
            console.log(channelData.channelId);
            context.channelSocket.onmessage = context.messageCallback;
        };

        //$http({url: "/rest/channelAPI/token", method: 'GET'}).success(this.socketCreationCallback);
        ChannelApi.token().$promise.then(
            this.socketCreationCallback
        );
        //$.getJSON("/rest/channelAPI/token", this.socketCreationCallback);
    }

    var callBackFunctions = {};
    var socket = new SocketHandler();
    socket.onMessage(function (data) {
        $rootScope.$apply(function () {
            if (callBackFunctions[data.type]) callBackFunctions[data.type](data);

        });

    });



    callBackFunctions['org.celstec.arlearn2.beans.notification.MessageNotification'] =  function (notification) {

        if ($routeParams.runId == notification.runId && $scope.threadId == notification.threadId) {
            var messageFromNotificationServer = {
                "type": "org.celstec.arlearn2.beans.run.Message",
                "runId": $routeParams.runId,
                "deleted": false,
                "subject": "Reply",
                "messageId": notification.messageId,
                "body": notification.alert
            };
            addLocalMessage(messageFromNotificationServer);
            ChatService.getMessage(notification.messageId).then(function (messageFromServer) {
                console.log(messageFromServer);
                addLocalMessage(messageFromServer);

                messageFromNotificationServer.sender = messageFromServer.sender;
                messageFromNotificationServer.gravatarUrl = messageFromServer.gravatarUrl;
                messageFromNotificationServer.isMe = messageFromServer.isMe;
                messageFromNotificationServer.date = messageFromServer.date;
            });
        }
    };


});