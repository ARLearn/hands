angular.module('ARLearn').controller('SidebarController', function ($scope, Session, AccountService, $gravatar,$routeParams,GameService) {


    $scope.showGame=false;

    if ($routeParams.gameId) {
        $scope.showGame=true;
        $scope.gameId=$routeParams.gameId;
        GameService.getGameById($routeParams.gameId).then(function(data){
            $scope.game = data;
            AccountService.myDetails().then(
                function(data){
                    $scope.myAccount = data;
                    loadAccessRules();
                }
            );

        });
    }
    $scope.name = "your name";

    if (Session.getAccessToken() ) {
        AccountService.myDetails().then(
            function(data){
                $scope.gravatarUrl = $gravatar.generate(data.email);
                $scope.name = data.name;
            }
        );
    }

    function loadAccessRules() {
        GameService.access($routeParams.gameId).then(function(data){
            $scope.access = data;
            for (var i = 0; i< data.length;i++) {
                if (data[i].account == $scope.myAccount.accountType+':'+$scope.myAccount.localId) {
                    //$scope.rights = accessRights(data[i]);
                    $scope.canEdit = data[i].accessRights ==1 ||data[i].accessRights ==2;
                    $scope.isOwner = data[i].accessRights ==1 ;

                }
            }
        });
    }


});