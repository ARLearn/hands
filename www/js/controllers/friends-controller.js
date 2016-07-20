angular.module('ARLearn').controller('FriendsController', function ($scope, Contacts, $gravatar, $uibModal) {

    //$scope.games = {games: []};
    $scope.friends = [];
    $scope.pending = [];
    function loadContacts(resumptionToken) {
        if (resumptionToken) {
            Contacts.resumeGetContacts({date: 0, resumptionToken:resumptionToken}).$promise.then(
                function (data) {
                    for (var i = 0; i < data.accountList.length; i++) {
                        data.accountList[i].gravatarUrl = $gravatar.generate(data.accountList[i].email);

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
                        data.accountList[i].gravatarUrl = $gravatar.generate(data.accountList[i].email);

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
    
    function loadInvitations() {
        Contacts.pendingInvitations().$promise.then(
            function(data){
                $scope.pending = [];
                for(var i=0;i<data.accountList.length;i++){
                    data.accountList[i].gravatarUrl = $gravatar.generate(data.accountList[i].email);
                    $scope.pending.push(data.accountList[i]);
                }
            }
        );
    };
    loadInvitations();
    
    
    $scope.openRun = function(friend){
        console.log(friend.accountType +' '+friend.localId);
    }

    $scope.invite = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/friends/inviteFriend.html',
            controller: 'ModalInviteFriendCtrl'
          
        });

        modalInstance.result.then(function (invitation) {
            Contacts.addContact(invitation)
        }, function () {
            
        });
    }
    
    $scope.revokeInvitation = function(invitation) {
        Contacts.revokeInvitation({id:invitation.localId}).$promise.then(
            function(data){
                loadInvitations();
            }
        );
    }

    $scope.removeContact = function(friend) {
        console.log(friend)
        Contacts.removeContact({accountType:friend.accountType, localId:friend.localId}).$promise.then(
            function(data){
                loadContacts();
            }
        );

    }
});


angular.module('ARLearn').controller("ModalInviteFriendCtrl", function ($scope, $uibModalInstance) {
    $scope.inv = {};
    $scope.send = function () {
        console.log($scope.inv);
        $uibModalInstance.close($scope.inv);
        // for (var i = 0; i< $scope.selection.friends.length; i++){
        //     var friend = $scope.selection.friends[i];
        //     GameService.addGameContributor(friend.accountType+ ':'+ friend.localId,$scope.gameId, 3).$promise.then(
        //         function(data) {
        //             $uibModalInstance.close();
        //         }
        //     );
        //
        // }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});