
angular.module('ARLearn').controller('ScanTagController', function ($scope, ActionService, $window) {


    $scope.submit = function() {
        ActionService.createAction($scope.runId, "answer_"+$scope.selection, $scope.item.id, $scope.item.type);
        $window.history.back();
    }

    $scope.onSuccess = function(data) {
        $scope.data = data;
    };
    $scope.onError = function(error) {
        $scope.error = error;
    };
    $scope.onVideoError = function(error) {
        $scope.error = error;
    };
});
