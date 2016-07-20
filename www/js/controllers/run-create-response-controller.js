angular.module('ARLearn').controller('RunCreateResponseController', function ($scope, $routeParams, RunService, ResponseService) {

    RunService.getRunById($routeParams.runId).then(function (data) {
        $scope.runTitle = data.title;
        $scope.runId = data.runId;

    });

    $scope.response =  {
        "type": "org.celstec.arlearn2.beans.run.Response",
        "timestamp": 1369985631821,
        "runId": $routeParams.runId,
        "deleted": false,
        "generalItemId": 2284002,
        "userEmail": "",
        "responseValue": "{\"answer\":\"5\",\"isCorrect\":true}",
    }

    $scope.submit = function() {
        ResponseService.createResponse($scope.response);
    }

});

