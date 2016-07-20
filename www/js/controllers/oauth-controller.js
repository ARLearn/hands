angular.module('ARLearn').controller('OauthController', function( $scope, $routeParams, Session, $location) {
    $scope.token = $routeParams.token;
    $scope.type = $routeParams.type;
    $scope.expires = $routeParams.expires;
    Session.setAccessToken($scope.token);
    var pathAfterLogin = Session.retrievePathAfterLogin();
    if (pathAfterLogin) {
        $location.path(pathAfterLogin);
    } else {
        $location.path('/home');
    }

    
});
