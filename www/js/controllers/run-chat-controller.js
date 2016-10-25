angular.module('ARLearn').controller('RunChatController', function ($scope, $window, $interval, $routeParams, ChatService, AccountService, Player, $gravatar, ChannelService) {


    var players = [];
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
            ChatService.loadRecentMessages($routeParams.runId).then(function (messages) {
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
                    var elem = $('.direct-chat-messages')[0];
                    elem.scrollTop = elem.scrollHeight;
                }, 500, true);



                //    .on('shown.bs.modal', function () {
                //    var elem = document.getElementById('reverse_scroll');
                //    elem.scrollTop = elem.scrollHeight;
                //});

            });

        }
    );


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

            if (scroll) {
                elem.scrollTop = elem.scrollHeight;

            }

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
            "subject": "Reply",
            "body": body
        };

        ChatService.sendMessage(message).then(function (serverMessage) {
            addLocalMessage(serverMessage);
            var elem = $('.direct-chat-messages')[0];
            elem.scrollTop = elem.scrollHeight;
        });
    }

    ChannelService.register('org.celstec.arlearn2.beans.notification.MessageNotification', function (notification) {

        if ($routeParams.runId == notification.runId) {
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
    });


});