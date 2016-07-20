angular.module('ARLearn').controller("ModalAddPlayerCtrl", function ($scope, $uibModalInstance, Contacts, PlayerService, AccountService) {

    $scope.selection = {};
    $scope.selection.friends= [];

    $scope.newPlayerTransform = function (newTag) {
        var item = {
            name: newTag,
            email: newTag.toLowerCase()
        };

        return item;
    };

    $scope.friends = [];

    AccountService.myDetails().then(function(me){
        $scope.friends.push(me);

    });

    Contacts.getContacts({date:0}).$promise.then(
        function(data){
            for(var i=0;i<data.accountList.length;i++){
                $scope.friends.push(data.accountList[i]);
            }

            for (var i= 0; i<$scope.players.length;i++){
                var deleteIndex = -1;
                for(var j=$scope.friends.length-1;j>=0;j--){

                    if ($scope.friends[j].localId == $scope.players[i].localId) {
                       deleteIndex = j;
                    }
                }
                if (deleteIndex != -1) {
                    $scope.friends.splice(deleteIndex, 1);
                }
            }
        }
    );


    function loadContacts(resumptionToken) {
        if (resumptionToken) {
            Contacts.resumeGetContacts({date: 0, resumptionToken:resumptionToken}).$promise.then(
                function (data) {
                    for (var i = 0; i < data.accountList.length; i++) {
                        // data.accountList[i].gravatarUrl = $gravatar.generate(data.accountList[i].email);

                        $scope.friends.push(data.accountList[i]);
                    }
                    for (var i= 0; i<$scope.players.length;i++){
                        var deleteIndex = -1;
                        for(var j=$scope.friends.length-1;j>=0;j--){

                            if ($scope.friends[j].localId == $scope.players[i].localId) {
                                deleteIndex = j;
                            }
                        }
                        if (deleteIndex != -1) {
                            $scope.friends.splice(deleteIndex, 1);
                        }
                    }
                    if (data.resumptionToken) {
                        loadContacts(data.resumptionToken)
                    }
                }
            );
        } else {

            Contacts.getContacts({date: 0}).$promise.then(
                function (data) {

                    for (var i = 0; i < data.accountList.length; i++) {
                        // data.accountList[i].gravatarUrl = $gravatar.generate(data.accountList[i].email);
                        $scope.friends.push(data.accountList[i]);
                    }
                    for (var i= 0; i<$scope.players.length;i++){
                        var deleteIndex = -1;
                        for(var j=$scope.friends.length-1;j>=0;j--){

                            if ($scope.friends[j].localId == $scope.players[i].localId) {
                                deleteIndex = j;
                            }
                        }
                        if (deleteIndex != -1) {
                            $scope.friends.splice(deleteIndex, 1);
                        }
                    }
                    if (data.resumptionToken) {
                        loadContacts(data.resumptionToken)
                    }
                }
            );
        }


    };
    loadContacts();

    $scope.ok = function () {
        for (var i = 0; i< $scope.selection.friends.length; i++){
            var friend = $scope.selection.friends[i];
            PlayerService.addPlayer($scope.runId,friend.accountType,friend.localId);
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});