
angular.module('ARLearn').controller('SingleChoiceController', function ($scope, ActionService,ResponseService, $window) {


    $scope.select = function(id) {
        $scope.selection = id;
    }

    $scope.submit = function() {
        ActionService.createAction($scope.runId, "answer_"+$scope.selection, $scope.item.id, $scope.item.type);
        ResponseService.createResponse({
            "type": "org.celstec.arlearn2.beans.run.Response",
            "runId": $scope.runId,
            "generalItemId": $scope.item.id,
            "responseValue": "{\"isCorrect\":true,\"answer\":\""+$scope.selection+"\"}",
        });
        $window.history.back();
    }

});
