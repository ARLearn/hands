angular.module('ARLearn').controller('CookieController', function( $scope, Session) {
   $scope.cookie={};

    $scope.submitCookie =  function() {
        Session.setAccessToken($scope.cookie.value);
    }
});
