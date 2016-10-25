angular.module('ARLearn').controller('FriendsAcceptInviteController', function ($scope, Contacts, $gravatar, $routeParams, $location, $window, Session) {

    $scope.invitationExpired = false;
    
    Contacts.getContactToken({token:$routeParams.invitationId}).$promise.then(
        function(data){
            if (data.error) {
                if (data.errorCode == 2) {
                    Session.storePathAfterLogin('friends/invitation/'+$routeParams.invitationId);
                    $location.path('login');

                } else {
                    $scope.invitationExpired = true;
                }

            } else {
                $scope.name = data.name;
            }
            
        }
    );

    $scope.accept = function(friend){
        Contacts.confirmAddContact({token:$routeParams.invitationId}).$promise.then(
            function(data){
                $location.path('/friends');

            }
        );

    };

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
});