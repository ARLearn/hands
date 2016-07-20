angular.module('ARLearn').controller("ModalShowResponseCtrl", function ($scope, $uibModalInstance) {

    if ($scope.response.audioUrl) {
        $scope.audio = {
            "mp3" : $scope.response.audioUrl
        }
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
})