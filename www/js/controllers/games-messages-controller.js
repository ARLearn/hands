angular.module('ARLearn').controller('GamesMessagesController', function ($rootScope, $scope, $sce, $q, $location, $routeParams, Game, GameService, GeneralItemService, ChannelService, $uibModal) {

        GameService.getGameById($routeParams.gameId).then(function (data) {
            if (data.error) {
                $scope.showNoAccess = true;
            } else {
                $scope.show = true;
            }
            $scope.game = data;
            $scope.gameId = data.gameId;
        });
        $scope.sort = $location.path().indexOf("sort") != -1;
        $scope.sortReverse = false;


        GeneralItemService.loadItems($routeParams.gameId).then(function (data) {
            $scope.items = data;
        });

        $scope.removeMessage = function (item) {
            $scope.modalText = "Remove message?";
            $uibModal.open({
                templateUrl: '/templates/modals/confirm.html',
                controller: 'GamesMessageConfirmDeleteController',
                scope: $scope

            }).result.then(
                function (result) {
                    GeneralItemService.deleteItem(item);
                },
                function () {
                }
            );
        }

        $scope.addMessage = function (typeParam) {
            $uibModal.open({
                templateUrl: '/templates/modals/game/newMessage.html',
                controller: 'ModalNewGameMessageCtrl',
                resolve: {
                    type: function () {
                        return typeParam
                    },
                    gameId: function () {
                        return $scope.gameId
                    }
                }
            }).result.then(
                function (result) {

                    GeneralItemService.saveItem(result).then(function (data) {
                        console.log('ready');
                    });
                },
                function () {
                }
            );
        };

        $scope.setAppear = function (item) {
            $scope.dependsOn = item.dependsOn || {
                    "type": "org.celstec.arlearn2.beans.dependencies.ActionDependency",

                    "radius": 50,
                    "scope": 0
                };
            $uibModal.open({
                templateUrl: '/templates/modals/game/messagesAppear.html',
                controller: 'ModalMessagesAppearController',
                scope: $scope,
                size:'lg'

            }).result.then(
                function (result) {
                    item.dependsOn = $scope.dependsOn;
                    GeneralItemService.saveItem(item).then(function (data) {
                        //$scope.item = data;
                        //$window.history.back();
                    });
                },
                function () {
                }
            );
        };

        $scope.setProximityDependency = function (item) {
            $scope.dependsOn = item.dependsOn || {
                    "type": "org.celstec.arlearn2.beans.dependencies.ProximityDependency",
                    "radius": 400
                };
            $scope.item = item;
            $uibModal.open({
                templateUrl: '/templates/modals/game/proximityDependency.html',
                controller: 'ModalMessagesProximityAppearController',
                scope: $scope

            }).result.then(
                function (result) {

                    item.dependsOn = $scope.dependsOn;
                    GeneralItemService.saveItem(item).then(function (data) {
                        //$scope.item = data;
                        //$window.history.back();
                    });
                },
                function () {
                    $rootScope.currentMap = 'none';

                }
            );
        };

    $scope.removeDependency = function(item) {
        delete item.dependsOn;
        GeneralItemService.saveItem(item).then(function (data) {

        });

    }

        ChannelService.register('org.celstec.arlearn2.beans.notification.GeneralItemModification', function (notification) {
            if (notification.gameId == $scope.gameId) {
                GeneralItemService.refreshItem($scope.gameId, notification.itemId).then(function (data) {

                });
            }

        });

    })
    .filter('filterMessages', function () {
        return function (items, field, reverse) {
            var filtered = [];
            if (field) field = field.toLowerCase();
            angular.forEach(items, function (item) {
                if (!field
                    || item.name.toLowerCase().indexOf(field) > -1
                    || item.type.toLowerCase().indexOf(field) > -1) filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a['name'] > b['name'] ? 1 : -1);
                //return (a['sortKey'] > b['sortKey'] ? 1 : -1);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    })
    .filter('filterMessagesSort', function () {
        return function (items, field, reverse) {
            var filtered = [];
            if (field) field = field.toLowerCase();
            angular.forEach(items, function (item) {
                if (!field
                    || item.name.toLowerCase().indexOf(field) > -1
                    || item.type.toLowerCase().indexOf(field) > -1) filtered.push(item);
            });
            filtered.sort(function (a, b) {

                return (a['sortKey'] > b['sortKey'] ? 1 : -1);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    })
    .filter('filterSortKey', function () {
        return function (items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function (item) {
                if (!field
                    ) filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a['sortKey'] > b['sortKey'] ? 1 : -1);
            });
            if (reverse) filtered.reverse();
            return filtered;
        };
    });


angular.module('ARLearn').controller("GamesMessageConfirmDeleteController", function ($scope, $uibModalInstance) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
})
