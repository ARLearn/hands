angular.module('ARLearn').directive('arlNoAccess', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            title: "=",
            description: "=",
            id: "=",
            icon: "="

        },
        templateUrl: '/templates/directives/no-access.html'
        
    };
}]);

angular.module('ARLearn').directive('arlPageNotFound', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            title: "=",
            description: "=",
            id: "=",
            icon: "="

        },
        templateUrl: '/templates/directives/page-not-found.html'
       
    };
}]);