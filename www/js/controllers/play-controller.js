angular.module('ARLearn').controller('PlayController', function ($scope, GameService) {

    $scope.myGames = GameService.getGamesParticipate();
});


angular.module('ARLearn').controller('PlayRunsController', function ($scope, $routeParams,RunService) {

    RunService.getRunsParticipateForGame($routeParams.gameId).then(function(data){
        console.log("runs"+data.runs)
        $scope.runs = data.runs
    });
});

angular.module('ARLearn').controller('PlayRunController', function ($scope, $routeParams,RunService) {


});