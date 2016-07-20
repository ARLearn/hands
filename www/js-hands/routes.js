angular.module('ARLearn')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/splash', {
                templateUrl: '/templates-hands/splash.html'

            })
            .when('/login', {
                templateUrl: '/templates-hands/login.html'

            })

            .otherwise({redirectTo: '/splash'});

    }]);
