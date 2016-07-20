
angular.module('ARLearn').directive('arlSidebar', function() {
    return  {
        restrict: 'E',

        templateUrl: '/templates/pages/sidebar.html',
        controller: 'SidebarController'
    };
});
