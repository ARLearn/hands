angular.module('ARLearn').controller("ModalAddContribCtrl", function ($scope, $uibModalInstance, Contacts, GameService) {

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

    // Contacts.getContacts({date:0}).$promise.then(
    //     function(data){
    //         for(var i=0;i<data.accountList.length;i++){
    //             $scope.friends.push(data.accountList[i]);
    //         }
    //     }
    // );


    function loadContacts(resumptionToken) {
        if (resumptionToken) {
            Contacts.resumeGetContacts({date: 0, resumptionToken:resumptionToken}).$promise.then(
                function (data) {
                    for (var i = 0; i < data.accountList.length; i++) {
                        $scope.friends.push(data.accountList[i]);
                    }
                    if (data.resumptionToken) {
                        loadContacts(data.resumptionToken)
                    }
                }
            );
        } else {
            Contacts.getContacts({date: 0}).$promise.then(
                function (data) {
                    $scope.friends = [];
                    for (var i = 0; i < data.accountList.length; i++) {
                        $scope.friends.push(data.accountList[i]);
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
            GameService.addGameContributor(friend.accountType+ ':'+ friend.localId,$scope.gameId, 3).$promise.then(
                function(data) {
                    $uibModalInstance.close();
                }
            );

        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});