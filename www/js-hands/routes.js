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
            .when('/courses', {
                templateUrl: 'templates-hands/games.html'

            })
            .when('/play/googleplus', {
                templateUrl: 'templates/play/login/googlepluslogin.html',
                controller: 'LoginGooglePlusController'
            })
            .when('/play/runs/game/:gameId', {
                templateUrl: 'templates/play/runs/runsForGame.html',
                controller: 'PlayRunsController'
            })
            .when('/play/run/:runId/messages', {
                templateUrl: 'templates/play/messages/index-list.html',
                controller: 'RunItemsController'
            })

            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.Tutorial/:itemId', {
                templateUrl: 'templates/play/messages/tutorial.html',
                controller: 'GeneralItemController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.NarratorItem/:itemId', {
                templateUrl: 'templates/play/messages/narrator.html',
                controller: 'GeneralItemController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.SingleChoiceTest/:itemId', {
                templateUrl: 'templates-play/messages/singlechoice.html',
                controller: 'SingleChoiceController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest/:itemId', {
                templateUrl: 'templates/play/messages/multiplechoice.html',
                controller: 'MultipleChoiceController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.AudioObject/:itemId', {
                templateUrl: 'templates/play/messages/audioobject.html',
                controller: 'AudioObjectController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.VideoObject/:itemId', {
                templateUrl: 'templates/play/messages/videoobject.html',
                controller: 'VideoObjectController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.ScanTag/:itemId', {
                templateUrl: 'templates/play/messages/qrscanner.html',
                controller: 'ScanTagController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.SingleChoiceImageTest/:itemId', {
                templateUrl: 'templates-play/messages/singlechoiceimage.html',
                controller: 'MultipleChoiceController'
            })
            .when('/play/run/:runId/game/:gameId/message-org.celstec.arlearn2.beans.generalItem.MultipleChoiceImageTest/:itemId', {
                templateUrl: 'templates/play/messages/multiplechoiceimage.html',
                controller: 'MultipleChoiceController'
            })

            .when('/arcadelist', {
                templateUrl: 'templates-hands/arcade-list.html'

            })
            .when('/login', {
                templateUrl: 'templates-hands/login.html',
                controller: 'PhoneGapLoginController'

            })
            .when('/play/run/:runId/game/:gameId/message/:itemId', {
                templateUrl: '/templates/play/run/message.html',
                controller: 'RunItemController'
            })

            .when('/oauth/:token/:type/:expires', {
                templateUrl: '/templates/oauth.html',
                controller: 'OauthController'
            })

            .otherwise({redirectTo: '/splash'});

        //var h5m = (typeof html5Mode !== 'undefined') ? html5Mode : true;
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });


    }]);
