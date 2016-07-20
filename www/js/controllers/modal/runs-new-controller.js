angular.module('ARLearn').controller("ModalNewRunCtrl", function ($scope, $uibModalInstance) {
    $scope.run = {
        "type": "org.celstec.arlearn2.beans.run.Run",
        "deleted": false,
        "gameId": $scope.game.gameId,
        "title": ""
    };
    $scope.ok = function () {
        $uibModalInstance.close($scope.run);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
})