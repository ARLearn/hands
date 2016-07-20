angular.module('ARLearn', ['ngRoute',  'ngResource',
    'angular-cache', 'pascalprecht.translate', 'ngSanitize',
 'Gravatar']);
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