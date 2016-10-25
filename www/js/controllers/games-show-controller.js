angular.module('ARLearn').controller('GamesShowController', function( $scope, $sce, $q, $routeParams, Game, GameService, RunService, ChannelService, Account, AccountService, $uibModal,$gravatar,$filter) {

    $scope.accounts = {};
    $scope.showNoAccess = false;
    $scope.show = false;
    $scope.rights = "";
    var $translate = $filter('translate');
    GameService.getGameById($routeParams.gameId).then(function(data){
        if (data.error) {
            $scope.showNoAccess = true;
        } else {
            $scope.show = true;
        }
        $scope.game = data;
        $scope.gameId = data.gameId;
        $scope.gameDescription = $sce.trustAsHtml(data.description);
    });

     function accessRights(accessStatement) {
        if (accessStatement.accessRights == 1) {
            return  $translate('arl.games.owner');
        }
        if (accessStatement.accessRights == 2) {
            return $translate('arl.games.editor');
        }
        if (accessStatement.accessRights == 3) {
            return $translate('arl.games.viewer');
        }
         return "";
    };

    AccountService.myDetails().then(
        function(data){
            $scope.myAccount = data;
            loadAccessRules();
        }
    );

    function loadAccessRules() {
        GameService.access($routeParams.gameId).then(function(data){
            $scope.access = data;
            for (var i = 0; i< data.length;i++) {
                Account.accountDetailsById({fullId:$scope.access[i].account}).$promise.then(
                    function(data) {
                        $scope.accounts[data.accountType+':'+data.localId] = data;
                        $scope.accounts[data.accountType+':'+data.localId].gravatar = $gravatar.generate(data.email);


                    }
                );
                if (data[i].account == $scope.myAccount.accountType+':'+$scope.myAccount.localId) {
                    $scope.rights = accessRights(data[i]);
                    $scope.canEdit = data[i].accessRights ==1 ||data[i].accessRights ==2;
                    $scope.isOwner = data[i].accessRights ==1 ;

                }
            }
        });
    }

    $scope.accessType = accessRights;


    $scope.accessTypeLabel = function(accessStatement) {
        if (accessStatement.accessRights == 1) {
            return "label-danger"
        }
        if (accessStatement.accessRights == 2) {
            return "label-primary"
        }
        if (accessStatement.accessRights == 3) {
            return "label-success"
        }
    };
    $scope.getAccountInfo = function(accessStatement) {
        var deferred = $q.defer();
        Account.accountDetailsById({fullId:accessStatement.account}).$promise.then(
            function(data) {
                return deferred.resolve(data);
            }
        );
        return deferred.promise;
    }

    $scope.runs = RunService.getOwnedRunsForGame($routeParams.gameId);
    //.then(function(data){
    //    $scope.runs = data.runAccess;
    //});


    $scope.newRun = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/newRun.html',
            controller: 'ModalNewRunCtrl',
            size: size,

            scope: $scope,
            resolve: {
                run: function () {
                    return $scope.run;
                }
            }
        });

        modalInstance.result.then(function (run) {
            console.log(run);

            //GameService.newGame(game);
            RunService.newRun(run);
            //todo user clicked save
        }, function () {
            //user dismissed
        });
    };
    $scope.map = { center: { latitude: 50.8761286, longitude: 10 }, zoom: 8 };

    $scope.addContributor = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/game/addGameContributor.html',
            controller: 'ModalAddContribCtrl',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function (data) {

            loadAccessRules();
        }, function () {
            //user dismissed
        });
    };

    $scope.changeContributionType= function(fullId, type) {
        GameService.addGameContributor(fullId, $scope.gameId, type).$promise.then(
            function(data) {
                loadAccessRules();
            }
        );

    }

    $scope.removeContributor = function(fullId) {
        GameService.removeContributor(fullId, $scope.gameId).$promise.then(
            function(data) {
                loadAccessRules();
            }
        );
    }

    ChannelService.register('org.celstec.arlearn2.beans.game.Game', function (notification) {
        if (notification.gameId == $scope.gameId){
            loadAccessRules();
        }

    });

});

