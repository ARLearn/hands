angular.module('ARLearn').directive('arlGameCard', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            title: "=",
            description: "=",
            id: "=",
            icon: "="

        },
        templateUrl: '/templates/directives/game-card.html',
        link: function(scope, element) {
            //scope.description = $sce.trustAsHtml(markdown.toHTML(scope.description.toString()));
        }
    };
}]);
