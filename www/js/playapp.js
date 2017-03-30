// angular.module('ARLearn', ['ngRoute',  'ngResource', 'infinite-scroll',
//     'angular-cache', 'pascalprecht.translate',   'ui.bootstrap',
//      'Gravatar', 'uiGmapgoogle-maps', 'qrScanner'])
angular.module('ARLearn', ['ngRoute',  'ngResource',
    'angular-cache', 'pascalprecht.translate',
    'Gravatar','webcam', 'bcQrReader'])
    .config(function ($translateProvider) {
//'textAngular','ngSanitize','ui.select',

    $translateProvider.useStaticFilesLoader({
        files: [{
            prefix: 'i18n/',
            suffix: '.json'
        }]
    });
        // $translateProvider.useSanitizeValueStrategy('sanitize');

    $translateProvider
        .preferredLanguage('en');
})
    .run(function ($http) {
    if (localStorage)
        $http.defaults.headers.common['Authorization'] = 'GoogleLogin auth='+localStorage.getItem('accessToken');

})
    .filter('orderByField', function() {
        return function(items, field, reverse) {
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (a[field] > b[field] ? 1 : -1);
            });
            if(reverse) filtered.reverse();
            return filtered;
        };
    })
// .filter('propsFilter', function() {
//     return function(items, props) {
//         var out = [];
//
//         if (angular.isArray(items)) {
//             items.forEach(function(item) {
//                 var itemMatches = false;
//
//                 var keys = Object.keys(props);
//                 for (var i = 0; i < keys.length; i++) {
//                     var prop = keys[i];
//                     var text = props[prop].toLowerCase();
//                     if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
//                         itemMatches = true;
//                         break;
//                     }
//                 }
//
//                 if (itemMatches) {
//                     out.push(item);
//                 }
//             });
//         } else {
//             // Let the output be the input untouched
//             out = items;
//         }
//
//         return out;
//     };
//
// })
    .config(function($gravatarProvider){
    $gravatarProvider.setSize(100);
}).controller('mainCtrl', function($rootScope) {
    $rootScope.currentMap = '';

});

angular.module('ARLearn').controller('headController', function($scope, Session) {
    $scope.styleIndex = 0;
    $scope.changeTheme = function(index) {
        $scope.styleIndex=index;

    };
    $scope.isAuthenticated = function() {
        if (Session.getAccessToken()) {
            return true;
        } else {
            return false;
        }
    }
    $scope.cordova = true;
});
