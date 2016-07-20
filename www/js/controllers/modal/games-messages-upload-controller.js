angular.module('ARLearn').controller("ModalGameMessageUploadCtrl", function ($scope, $uibModalInstance, GeneralItemService, $http) {

    $scope.uploadUrl = "";
    $scope.data = { key: ""};
    if ($scope.key) {
        $scope.data.key =$scope.key;
    }
    $scope.up = function () {
        GeneralItemService.pictureUploadUrl($scope.gameId, $scope.itemId, $scope.data.key).$promise.then(
            function (data) {
                $scope.uploadUrl = data.uploadUrl;

                $http({
                    method: 'POST',
                    url: $scope.uploadUrl,
                    headers: {'Content-Type': undefined},
                    data: {
                        file: $scope.files.item(0),
                    },
                    transformRequest: function (data) {
                        var formData = new FormData();
                        angular.forEach(data, function (value, key) {
                            formData.append(key, value);
                        });
                        return formData;
                    }
                }).success(function (data) {
                    $uibModalInstance.close();
                }).error(function (data) {
                    $uibModalInstance.dismiss();
                });
            }
        );
    };
    $scope.files =[];
    $scope.setFile = function (element) {
        $scope.$apply(function ($scope) {
            $scope.files = element.files;
            $scope.data.key = $scope.data.key || element.files.item(0).name;
        });
    };

    $scope.ok = function () {


    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});