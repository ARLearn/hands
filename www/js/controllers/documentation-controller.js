angular.module('ARLearn').controller('DocumentationController', function( $scope, GeneralItemService) {

    $scope.gameId ;
    loaded = false;

    $scope.loadDocumentation = function(gameId) {
        if (!loaded) {
            loaded = true;
            console.log('here i am'+gameId);

            //GameService.getGameById(gameId).then(function (data) {
            //    if (data.error) {
            //        $scope.showNoAccess = true;
            //    } else {
            //        $scope.show = true;
            //    }
            //    $scope.game = data;
            //
            //    $scope.gameId = data.gameId;
            //});
            GeneralItemService.loadItems(gameId).then(function (data) {
                $scope.items = data;
                console.log($scope.items)
            });

        }

    }
});
