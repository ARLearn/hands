angular.module('ARLearn').directive('arlHome', function() {
    return  {
        restrict: 'E',

        templateUrl: 'templates/pages/home.html'
    };
});


angular.module('ARLearn').directive('arlBanner', function() {
    return  {
        restrict: 'E',

        templateUrl: 'templates/pages/banner.html'
    };
});