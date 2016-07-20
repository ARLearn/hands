angular.module('ARLearn').controller('NetworkController', function( $scope, $routeParams, Session, $http) {

    $scope.data = { to: {}, from:{}, path : "/rest/"};

    $scope.get = function(){

        $scope.data.from = {loading:{}};
        $http({
            method: 'GET',
            url: $scope.data.path
        }).then(function successCallback(response) {
            console.log(response);
            $scope.data.from = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

});
