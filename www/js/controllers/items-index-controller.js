angular.module('ARLearn').controller('RunItemsController', function ($scope, $routeParams, RunService, GeneralItemService) {

    $scope.runId = $routeParams.runId;
    $scope.visibleItems = GeneralItemService.getVisibleItems($routeParams.runId);
    RunService.getRunById($routeParams.runId).then(function (data) {
        $scope.runTitle = data.title;
        $scope.runId = data.runId;
        $scope.gameId = data.gameId;
        GeneralItemService.loadItems(data.gameId).then(function (data) {

            GeneralItemService.visibleItems($routeParams.runId).then(function (data) {

                $scope.visibilities = data.generalItemsVisibility;
                console.log(data);
            });
        });

        $scope.getItem = function (itemId) {
            return GeneralItemService.getItemFromCache(itemId);
        }
    })
});


angular.module('ARLearn').controller('RunItemController', function ($scope, $routeParams, $sce, GeneralItemService, $compile, ActionService, GameService) {

    $scope.runId = $routeParams.runId;

    GeneralItemService.getItemById($routeParams.gameId, $routeParams.itemId).then(function(data){
        $scope.item = data;
        ActionService.createAction($scope.runId, "read", $scope.item.id, $scope.item.type);
        $scope.richText = $sce.trustAsHtml($scope.item.richText);
    });

    GameService.getGameById($routeParams.gameId).then(function(game){
        $scope.changeTheme(game.theme);
    });


    //$("#head").append( $compile("<link rel='stylesheet' href='/css/themes/1.css' />")($scope) );


});