angular.module('ARLearn').controller('GamesEditController', function($rootScope, $scope, $sce, $q, $routeParams, Game, GameService, ChannelService, $log,$window) {
    $rootScope.currentMap = 'gameEdit';

    $scope.showMap = false;
    $scope.$watch("showMap", function(newValue, oldValue) {
       if (newValue) {
           $scope.game.lat = $scope.map.center.latitude;
           $scope.game.lng = $scope.map.center.longitude;

       } else {
           delete $scope.game.lat;
           delete $scope.game.lng;
       }
    });
    $scope.map = { center: { latitude: 50.8761286, longitude: 5.9583221 }, zoom: 10 };
    $scope.coords = {
        latitude:50.8761286,
            longitude: 5.9583221
    };
    $scope.options ={ draggable: true };
    $scope.events = {
        dragend: function (marker, eventName, args) {
            $log.log('marker dragend');
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();

            $scope.game.lat = marker.getPosition().lat();
            $scope.game.lng = marker.getPosition().lng();
        }
    };
    $scope.accounts = {};
    $scope.showNoAccess = false;
    $scope.show = false;
    GameService.getGameById($routeParams.gameId).then(function(data){
        if (data.error) {
            $scope.showNoAccess = true;
        } else {
            $scope.show = true;
        }
        $scope.game = data;
        // $scope.gameDescription = $sce.trustAsHtml(data.description);
        if (data.lat) {
            $scope.coords.latitude = data.lat;
            $scope.coords.longitude = data.lng;
            $scope.map.center.latitude = data.lat;
            $scope.map.center.longitude = data.lng;
            $scope.showMap = true;
        }
    });


    $scope.ok = function(){
        GameService.newGame($scope.game);
        $window.history.back();
    };

    $scope.cancel = function(){
        $window.history.back();
    };

    ChannelService.register('org.celstec.arlearn2.beans.game.Game', function (notification) {

        GameService.refreshGame(notification.gameId).then(function (data) {
            $scope.game = data;
        });
    });
});