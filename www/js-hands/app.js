angular.module('ARLearn', ['ngRoute',  'ngResource',
    'angular-cache', 'pascalprecht.translate', 'ngSanitize',
 'Gravatar','qrScanner'])
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
;
//    .config(function ($translateProvider) {
//
//
//    $translateProvider.useStaticFilesLoader({
//        files: [{
//            prefix: '/i18n/',
//            suffix: '.json'
//        }]
//    });
//
//    $translateProvider
//        .preferredLanguage('en');
//})
//    .run(function ($http) {
//    $http.defaults.headers.common['Authorization'] = 'GoogleLogin auth='+localStorage.getItem('accessToken');
//
//})

angular.module('ARLearn').controller('headController', function($scope) {
    $scope.styleIndex = 7;
    $scope.changeTheme = function(index) {
        $scope.styleIndex=index;

    };
});