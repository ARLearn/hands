angular.module('ARLearn')
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider
            .when('/splash', {
                templateUrl: 'templates-hands/splash.html',
                controller: 'HomeController'

            })
            .when('/mainmenu', {
                templateUrl: 'templates-hands/mainmenu.html'

            })
            .when('/login', {
                templateUrl: 'templates-hands/login.html',

                controller: 'PhoneGapLoginController'

            })

            .otherwise({redirectTo: '/splash'});

        //var h5m = (typeof html5Mode !== 'undefined') ? html5Mode : true;
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });


    }]);
