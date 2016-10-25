angular.module('ARLearn').controller("ModalAddThreadCtrl", function ($scope, $uibModalInstance, ChatService) {
    $scope.thread = {name:""};
    $scope.ok = function () {
        ChatService.createThread( $scope.runId, $scope.thread.name).then(
            function(data){

                $scope.threads.push(data);
                $scope.thread.name = "";
                $uibModalInstance.close();
            }
        );

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});