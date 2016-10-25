angular.module('ARLearn').controller("ModalNewGameCtrl", function ($scope, $uibModalInstance) {
    $scope.game = {
        "type": "org.celstec.arlearn2.beans.game.Game",
        "config": {"type": "org.celstec.arlearn2.beans.game.Config", "mapAvailable": false},
        "title": "",
        "description": ""
    };
    $scope.ok = function () {
        $uibModalInstance.close($scope.game);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});

angular.module('ARLearn').controller("ModalNewGameMessageCtrl", function ($scope, $uibModalInstance, type, gameId) {
    $scope.type = type;
    $scope.message = {
        "type": type,
        "gameId": gameId,
        "name": "",
        "richText": ""
    };

    if (type == 'org.celstec.arlearn2.beans.generalItem.VideoObject') {
        $scope.message.videoFeed = "";
    }
    if (type == 'org.celstec.arlearn2.beans.generalItem.AudioObject') {
        $scope.message.audioFeed = "";
    }
    $scope.ok = function () {
        $uibModalInstance.close($scope.message);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});