angular.module('ARLearn').controller('GamesMessageEditController', function($rootScope, $scope, $sce, $q, $routeParams, $location, $uibModal, Game, GameService,ChannelService, GeneralItemService,$window) {

    $rootScope.currentMap = 'messageEdit';
    //$scope.$on('$viewContentLoaded', function () {
    //    var mapHeight = 300; // or any other calculated value
    //    $("#message-edit-map .angular-google-map-container").height(mapHeight);
    //});
    $scope.sort = $location.path().indexOf("sort") != -1;

    GameService.getGameById($routeParams.gameId).then(function(data){
        if (data.error) {
            $scope.showNoAccess = true;
        } else {
            $scope.show = true;
        }
        $scope.game = data;
        $scope.gameId = data.gameId;
    });

    $scope.item = GeneralItemService.getItemFromCache($routeParams.itemId);
    $scope.itemId = $routeParams.itemId;
    currentItemid = $routeParams.itemId;
    currentGameId = $routeParams.gameId;

    GameService.getGameAssets($routeParams.gameId).then(function(data){
        $scope.assets = data;
    });


    $scope.uploadModal = function (key) {
        if (key) {
            $scope.key = key;
        } else {
            delete $scope.key;
        }
        $uibModal.open({
            templateUrl: '/templates/modals/game/uploadGameAsset.html',
            controller: 'ModalGameMessageUploadCtrl',
            scope: $scope
        }).result.then(
            function () {
                GameService.getGameAssets($routeParams.gameId).then(function(data){
                    $scope.assets = data;
                });
            },
            function () {

            }
        );
    };

    $scope.removeFile = function(asset) {
        console.log(asset);
        GeneralItemService.deleteFilePath($routeParams.gameId, asset.path).then(
            function (data) {
                GameService.getGameAssets($routeParams.gameId).then(function(data){
                    $scope.assets = data;
                });

            }
        );
    }

    $scope.map = { center: { }, zoom: 10 };
    if ($scope.item.lat) {
        $scope.map.center.latitude = $scope.item.lat;
    } else {
        $scope.map.center.latitude = 50;
    }
    if ($scope.item.lng) {
        $scope.map.center.longitude = $scope.item.lng;
    }else {
        $scope.map.center.longitude = 6;
    }

    $scope.coords = {
        latitude:$scope.item.lat,
        longitude: $scope.item.lng
    };
    if (!$scope.coords.latitude) $scope.coords.latitude = 50;
    if (!$scope.coords.longitude) $scope.coords.longitude = 6;


    $scope.options ={ draggable: true };

    $scope.events = {
        dragend: function (marker, eventName, args) {

            $scope.item.lat = marker.getPosition().lat();
            $scope.item.lng = marker.getPosition().lng();

        }
    };

    ChannelService.register('org.celstec.arlearn2.beans.notification.GeneralItemModification', function (notification) {
        if (notification.gameId == $scope.gameId){
            GeneralItemService.refreshItem($scope.gameId, notification.itemId).then(function(data){
                $scope.item = data;
            });
        }

    });
    
    $scope.save = function(){
        GeneralItemService.saveItem($scope.item).then(function(data){
            $scope.item = data;
            $window.history.back();
        });
    };

    $scope.cancel = function(){
        $window.history.back();
        $scope.showMap =false;
    };
    $scope.positionMe = {}
    if ($scope.item.lat && $scope.item.lng) {
        $scope.positionMe.value = true;
    }
    else {
        $rootScope.currentMap = 'none';
    }
    $scope.positionOnMap = function(value) {
        if ($scope.positionMe.value) {
            //true
            if ($scope.lat)  {
                $scope.item.lat =$scope.lat;
                $scope.coords.latitude = $scope.lat;
            }
            if ($scope.lng)  {
                $scope.item.lng =$scope.lng;
                $scope.coords.longitude = $scope.lng;
            }


            if ((!$scope.item.lat || !$scope.item.lng) && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    $scope.$apply(function(){

                        $scope.item.lat = position.coords.latitude;
                        $scope.item.lng = position.coords.longitude;
                        $scope.coords.latitude = $scope.item.lat;
                        $scope.coords.longitude = $scope.item.lng;
                        $scope.map.center.latitude = position.coords.latitude;
                        $scope.map.center.longitude = position.coords.longitude;
                        $rootScope.currentMap = 'messageEdit';

                    });
                });
            } else {
                $rootScope.currentMap = 'messageEdit';
                $scope.item.lat =50.877924300000004;
                $scope.item.lng =5.9581691;
            }

        } else {
            $scope.lat = $scope.item.lat;
            $scope.lng = $scope.item.lng;
            delete $scope.item.lat;
            delete $scope.item.lng;
        }

    };
});



angular.module('ARLearn').controller("ModalDialogController", function ($scope, $uibModalInstance, GameService) {
    GameService.getGameAssets(currentGameId).then(function(data){
        $scope.assets = data;
    });
    $scope.setActive = function(path){
        $scope.active = path;
    }
    $scope.ok = function () {


        $uibModalInstance.close('/game/'+currentGameId+$scope.active);
    };

    $scope.itemId = currentItemid;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}).config(function ($provide) {

    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', '$uibModal', function (taRegisterTool, taOptions, $uibModal) {
        taRegisterTool('colourBlue', {
            buttontext: "Insert from asset library",
            iconclass: "fa fa-image",

            action: function (deferred,restoreSelection) {
                var thatLink = this;
                // var sel = rangy.getSelection();
                $uibModal.open({
                    templateUrl:'/templates/pages/modal/selectPicture.html',
                    controller: 'ModalDialogController'
                }).result.then(
                    function (result) {
                         restoreSelection();
                        //thatLink.$editor().wrapSelection('insertImage', result, false);
                        document.execCommand('insertImage', true, result);

                        deferred.resolve();
                    },
                    function () {
                        deferred.resolve();
                    }
                );
                return false;
            }
        });
        taOptions.toolbar[1].push('colourBlue');
        return taOptions;
    }]);
});

var currentItemid = 0;
var currentGameId = 0;