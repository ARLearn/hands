angular.module('ARLearn').controller('CookieController', function( $scope, Session) {
   $scope.cookie={};

    $scope.submitCookie =  function() {
        console.log($scope.cookie.value);
        Session.setAccessToken($scope.cookie.value);
    }
});
