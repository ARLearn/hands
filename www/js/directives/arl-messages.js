angular.module('ARLearn').directive('arlNarrator', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/narrator.html',
        link: function($scope, element) {
            $scope.richText = $sce.trustAsHtml($scope.item.richText);
            //scope.description = $sce.trustAsHtml(markdown.toHTML(scope.description.toString()));
        }
    };
}]);

angular.module('ARLearn').directive('arlAudio', function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/audio.html',
        controller: 'PlayAudioController'

    };
});

angular.module('ARLearn').directive('arlSingleChoice', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/singleChoice.html',
        link: function($scope, element) {
            $scope.richText = $sce.trustAsHtml($scope.item.richText);
        },
        controller: 'SingleChoiceController'

    };
}]);

angular.module('ARLearn').directive('arlMultipleChoice', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/multipleChoice.html',
        link: function($scope, element) {
            $scope.richText = $sce.trustAsHtml($scope.item.richText);
        },
        controller: 'MultipleChoiceController'

    };
}]);

angular.module('ARLearn').directive('arlImageClickQuestion', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=item",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/imageClickQuestion.html',
        link: function($scope, element) {
            $(function() {
                $("#test").click(function(e) {
                    var offset = $(this).offset();
                    var relativeX = (e.pageX - offset.left) / $(this).width() *100;
                    var relativeY = (e.pageY - offset.top) / $(this).height()*100;

                    $scope.click(relativeX,relativeY);
                });
            });
        },
        controller: 'ImageClickQuestionController'

    };
}]);

angular.module('ARLearn').directive('arlScanTag', ['$sce', function($sce) {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/qrCode.html',
        link: function($scope, element) {
            $scope.richText = $sce.trustAsHtml($scope.item.richText);
        },
        controller: 'ScanTagController'

    };
}]);

angular.module('ARLearn').directive('arlDataCollection', function() {
    return {
        replace: true,
        restrict: "E",
        scope: {
            item: "=",
            runId: "=runid"
        },
        templateUrl: '/templates/directives/messages/dataCollection.html',
        controller: 'DataCollectionController'

    };
});