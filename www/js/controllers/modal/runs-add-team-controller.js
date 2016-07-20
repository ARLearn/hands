angular.module('ARLearn').controller("ModalAddTeamCtrl", function ($scope, $uibModalInstance, PlayerService) {
    $scope.team = {name:""};
    $scope.ok = function () {
        PlayerService.createTeam( $scope.runId, $scope.team.name).then(
            function(data){
                console.log('return from server '+data);
                $scope.teams.push(data);
                $scope.teams.name = "";
                $uibModalInstance.close();
            }
        );

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});