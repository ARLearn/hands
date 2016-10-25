angular.module('ARLearn').controller('DataCollectionController', function ($scope, $uibModal, ResponseService) {


    $scope.takePicture = function(){
        console.log("taking a picture");
    };

    $scope.collectText = function(){
        $uibModal.open({
            templateUrl:'/templates/modals/play/writeText.html',
            controller: 'TextDataCollectionController',
            scope: $scope

        }).result.then(
            function (result) {
                jsonresult = {text:result};
                ResponseService.createResponse({
                    "type": "org.celstec.arlearn2.beans.run.Response",
                    "runId": $scope.runId,
                    "generalItemId": $scope.item.id,
                    "responseValue": JSON.stringify(jsonresult)
                });

            },
            function () {
                console.log("cancel");

            }
        );
    };

    $scope.responses = ResponseService.getResponsesByRunId($scope.runId);



    $scope.getResponseString= function(response) {
        var json = JSON.parse(response.responseValue);
        if (json.answer) return json.answer;
        if (json.text) return json.text;
        if (json.videoUrl) return "watch video";
        if (json.imageUrl) return "watch picture";
        if (json.audioUrl) return "watch audio"
    };

});

angular.module('ARLearn').controller('TextDataCollectionController', function ($scope,$uibModalInstance) {
    $scope.text = ""
    $scope.ok = function () {
        $uibModalInstance.close($scope.text);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});
