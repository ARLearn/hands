angular.module('ARLearn').controller('RunItemsController', function ($scope, $routeParams, RunService, GeneralItemService) {

    RunService.getRunById($routeParams.runId).then(function (data) {
        $scope.runTitle = data.title;
        $scope.runId = data.runId;
        GeneralItemService.loadItems(data.gameId).then(function (data) {

            GeneralItemService.visibleItems($routeParams.runId).then(function (data) {

                $scope.visibilities = data.generalItemsVisibility;
            });
        });

        $scope.getItem = function (itemId) {
            return GeneralItemService.getItemFromCache(itemId);
        }
    })
});


angular.module('ARLearn').controller('RunItemController', function ($scope, $routeParams, $sce, GeneralItemService) {
    $scope.runId = $routeParams.runId;
    $scope.item =GeneralItemService.getItemFromCache($routeParams.itemId);
    $scope.richText = $sce.trustAsHtml($scope.item.richText);
    console.log($scope.item);
});