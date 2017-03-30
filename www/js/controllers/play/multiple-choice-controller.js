angular.module('ARLearn').controller('GeneralItemController', function ($scope,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {
    $scope.runId = $routeParams.runId;

    GeneralItemService.getItemById($routeParams.gameId, $routeParams.itemId).then(function(data){
        $scope.item = data;
        ActionService.createAction($scope.runId, "read", $scope.item.id, $scope.item.type);
        $scope.richText = $sce.trustAsHtml($scope.item.richText);

    });

    GameService.getGameById($routeParams.gameId).then(function(game){
        $scope.changeTheme(game.theme);
    });
    // $scope.arlearn = {};
    $scope.submitAction = function(act){
        ActionService.createAction($scope.runId, act, $scope.item.id, $scope.item.type);
    }


});

arlearn = {
    submitAction : function (action) {
        var scope = angular.element(document.getElementById("content")).scope();
        scope.$apply(function () {
            scope.submitAction(action);
        });
    }
};


angular.module('ARLearn').controller('VideoObjectController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });



});

angular.module('ARLearn').controller('SingleChoiceController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });

    $scope.select = function(id) {
        $scope.selection = id;
    };

    $scope.answerSelected = function(answer){
        return answer.id == $scope.selection;
    };

    $scope.submit = function() {
        var response;
        ActionService.createAction($scope.runId, "answer_"+$scope.selection, $scope.item.id, $scope.item.type);
        ActionService.createAction($scope.runId, "answer_given", $scope.item.id, $scope.item.type);
        for (var i= 0; i< $scope.item.answers.length; i++) {
            var answer  = $scope.item.answers[i];
            if ($scope.selection == answer.id) {
                response = {
                    "type": "org.celstec.arlearn2.beans.run.Response",
                    "runId": $scope.runId,
                    "generalItemId": $scope.item.id,
                    "responseValue": "{\"isCorrect\":true,\"answer\":\""+$scope.selection+"\"}"
                }
            }

        }
        if (response) {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
        } else {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
            response = {
                "type": "org.celstec.arlearn2.beans.run.Response",
                "runId": $scope.runId,
                "generalItemId": $scope.item.id,
                "responseValue": "{\"isCorrect\":false,\"answer\":\""+$scope.selection+"\"}"
            }
        }
        ResponseService.createResponse(response);
        $window.history.back();
    };

});

angular.module('ARLearn').controller('MultipleChoiceController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });

    $scope.select = function(id) {
        $scope.selection = id;
    };

    $scope.answerSelected = function(answer){
        return answer.id == $scope.selection;
    };

    $scope.submit = function() {
        var response;
        ActionService.createAction($scope.runId, "answer_"+$scope.selection, $scope.item.id, $scope.item.type);
        ActionService.createAction($scope.runId, "answer_given", $scope.item.id, $scope.item.type);
        for (var i= 0; i< $scope.item.answers.length; i++) {
            var answer  = $scope.item.answers[i];
            if ($scope.selection == answer.id) {
                response = {
                    "type": "org.celstec.arlearn2.beans.run.Response",
                    "runId": $scope.runId,
                    "generalItemId": $scope.item.id,
                    "responseValue": "{\"isCorrect\":true,\"answer\":\""+$scope.selection+"\"}"
                }
            }

        }
        if (response) {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
        } else {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
            response = {
                "type": "org.celstec.arlearn2.beans.run.Response",
                "runId": $scope.runId,
                "generalItemId": $scope.item.id,
                "responseValue": "{\"isCorrect\":false,\"answer\":\""+$scope.selection+"\"}"
            }
        }
        ResponseService.createResponse(response);
        $window.history.back();
    };

});

angular.module('ARLearn').controller('SingleChoiceImageController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });
    GeneralItemService.getItemById($routeParams.gameId, $routeParams.itemId).then(function(data){
        console.log(data);


    });

});