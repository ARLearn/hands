angular.module('ARLearn').directive('arlHeader', function() {
    return  {
        restrict: 'E',
        controller: 'HeaderController',
        controllerAs: "header",
        templateUrl: '/templates/directives/header.html'
    };
});

angular.module('ARLearn').directive('arlHeaderUnAuth', function() {
    return  {
        restrict: 'E',
        controller: 'HeaderController',
        controllerAs: "header",
        templateUrl: '/templates/directives/header-unauth.html'
    };
});
