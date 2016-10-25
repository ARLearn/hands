angular.module('ARLearn').directive('handsTopLine', function() {
    return  {
        restrict: 'E',
        templateUrl: 'templates-hands/directives/top-line.html'
    };
});

angular.module('ARLearn').directive('handsBottomLine', function() {
    return  {
        restrict: 'E',
        templateUrl: 'templates-hands/directives/bottom-line.html'
    };
});