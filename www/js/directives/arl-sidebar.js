
angular.module('ARLearn').directive('arlSidebar', function() {
    return  {
        restrict: 'E',

        templateUrl: '/templates/directives/sidebar.html',
        controller: 'SidebarController'
    };
});

angular.module('ARLearn').directive('arlSidebarDocumentation', function() {
    return  {
        restrict: 'E',
        link: link,
        templateUrl: '/templates/documentation/sidebar.html',


    };

    function link($scope, $element, $attrs) {
        $.AdminLTE.tree('.sidebar')
    }

});
