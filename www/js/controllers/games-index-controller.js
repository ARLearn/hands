angular.module('ARLearn').controller('GamesIndexController', function ($scope, $sce, Game, GameService, ChannelService, config, $uibModal) {
    $scope.showNoAccess = false;
    $scope.show = false;

    //$scope.games = {games: []};
    $scope.games = {};
    //$scope.games.games = [];

    $scope.disableGameLoading = false;

    //$scope.loadMoreGames = function () {
    //
    //
    //    $scope.disableGameLoading = true;
    //        Game.resume({resumptionToken: $scope.games.resumptionToken})
    //            .$promise.then(function (data) {
    //            if (data.error) {
    //                $scope.showNoAccess = true;
    //            } else {
    //                $scope.show = true;
    //
    //                $scope.games.games = $scope.games.games.concat(data.games);
    //                for (i = 0; i < data.games.length; i++) {
    //                    //GameService.storeInCache(data.games[i]);
    //                    data.games[i].description = $sce.trustAsHtml(data.games[i].description);
    //
    //                }
    //                //$scope.games = GameService.getGames();
    //                $scope.games.resumptionToken = data.resumptionToken;
    //                $scope.games.serverTime = data.serverTime;
    //
    //                if (data.resumptionToken) {
    //                    $scope.disableGameLoading = false
    //                    $scope.loadMoreGames();
    //                } else {
    //                    $scope.disableGameLoading = true
    //                }
    //
    //            }
    //
    //        });
    //
    //};

    function loadGames() {
        GameService.resumeLoadingGames().then(function (data) {
            if (data.error) {
                $scope.showNoAccess = true;
            } else {
                $scope.show = true;
                if (data.resumptionToken) {
                    loadGames();
                }
            }
        });
    };
    loadGames();

    $scope.games = GameService.getGames();

    $scope.getGame = function (id) {
        return GameService.getGameFromCache(id);
    };

    $scope.thumbnailUrl = function (gameId) {
        return config.server + '/game/' + gameId + '/gameThumbnail';
    }

    //$scope.newGame = function () {
    //
    //};

    $scope.newGame = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/newGame.html',
            controller: 'ModalNewGameCtrl',
            size: size,
            resolve: {
                game: function () {
                    return $scope.game;
                }
            }
        });

        modalInstance.result.then(function (game) {
            GameService.newGame(game).then(function (data) {
                $scope.games.games.push(data);
            });
        }, function () {
            //user dismissed
        });
    };

    ChannelService.register('org.celstec.arlearn2.beans.game.Game', function (notification) {
        GameService.refreshGame(notification.gameId).then(function (data) {
            console.log('refresh complete');
        });
    });
});