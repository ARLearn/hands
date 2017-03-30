angular.module('ARLearn').controller('PlayController', function ($scope, GameService) {

    GameService.loadGamesParticipate();
    $scope.myGames = GameService.getParticipateGames();
});


angular.module('ARLearn').controller('PlayRunsController', function ($scope, $routeParams,RunService, Session) {
    Session.setAccessToken("ya29.GlsWBM12yvfFqWXmGqH97KGEpBQ3hKCjCOY-Apvrx2E7bVcYYLc3QHD_LndboyneXEqzULUD0pvKa_c8oKBIbYsOriCGMytMxUBuvBaE1i5pKpBn-xyV4I2gzcj5");

    RunService.getRunsParticipateForGame($routeParams.gameId).then(function(data){
        console.log("runs"+data.runs)
        $scope.runs = data.runs
        if ($scope.runs[0] && $scope.runs[0].game) {
            $scope.changeTheme($scope.runs[0].game.theme);
        }
    });
});

angular.module('ARLearn').controller('PlayRunController', function ($scope, $routeParams,RunService) {


});

angular.module('ARLearn').controller('SettingsController', function ($scope, Session, $window) {
    console.log(Session.getAccessToken());

    $scope.loggedIn = function() {
        // if(Session.getAccessToken()){
        //     return true;
        // } else {
        //     return false;
        // }
        return Session.getAccessToken();
    }
;
    $scope.login = function() {
        console.log('about to login');
        var pathAfterLogin = Session.storePathAfterLogin('play.html#/play/settings');
    };

    $scope.logout= function() {
        console.log('about to logout');
        Session.reset();
        document.cookie =  'arlearn.AccessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        if ($scope.cordova){
            window.plugins.googleplus.disconnect(
                function (msg) {
                    $window.history.back();
                }
            );
        }
    }

});