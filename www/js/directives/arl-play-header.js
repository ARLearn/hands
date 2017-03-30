angular.module('ARLearn').directive('arlPlayHeader', function() {
    return  {
        restrict: 'E',
        controller: ['$scope', '$window', function ARLPlayHeaderController($scope, $window) {
            $scope.backClick = function() {
                $window.history.back();

            };

        }],
        controllerAs: "header",
        scope: {
            title: '@'
        },
        templateUrl: 'templates/play/directives/main-header.html'
    };
});