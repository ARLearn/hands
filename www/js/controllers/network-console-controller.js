angular.module('ARLearn').controller('NetworkController', function( $scope, $routeParams, Session, $http) {

    $scope.data = { to: {}, from:{}, path : "/rest/"};

    $scope.get = function(){

        $scope.data.from = {loading:{}};
        $http({
            method: 'GET',
            url: $scope.data.path
        }).then(function successCallback(response) {

            $scope.data.from = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

    $scope.post = function(postdata) {

        $http({
            method: 'POST',
            url: $scope.data.path,
            data: $scope.data.to
        }).then(function successCallback(response) {

            $scope.data.from = response.data;

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };

});
