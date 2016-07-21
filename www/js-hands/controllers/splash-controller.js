angular.module('ARLearn').controller('HomeController', function ($scope, Session) {
    $scope.isLoggedIn = function () {
        if (Session.getAccessToken() ) return true;
        return false;
    };

    $scope.nextLink = function(){
        if ($scope.isLoggedIn()) {
            return "#/mainmenu"
        } else {
            return "#/login"
        }
    }
});