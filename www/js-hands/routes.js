angular.module('ARLearn')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/splash', {
                templateUrl: '/templates-hands/splash.html'

            })

            .otherwise({redirectTo: '/splash'});

    }]);
