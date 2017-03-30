angular.module('ARLearn').controller('GeneralItemController', function ($scope,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService, Session) {

    Session.setAccessToken("ya29.GlsWBM12yvfFqWXmGqH97KGEpBQ3hKCjCOY-Apvrx2E7bVcYYLc3QHD_LndboyneXEqzULUD0pvKa_c8oKBIbYsOriCGMytMxUBuvBaE1i5pKpBn-xyV4I2gzcj5");


    $scope.runId = $routeParams.runId;

    GeneralItemService.getItemById($routeParams.gameId, $routeParams.itemId).then(function(data){
        $scope.item = data;
        $scope.item.video = $sce.trustAsResourceUrl("https://streetlearn.appspot.com/game/"+data.gameId+"/generalItems/"+data.id+"/video");
        $scope.item.audio = $sce.trustAsResourceUrl("https://streetlearn.appspot.com/game/"+data.gameId+"/generalItems/"+data.id+"/audio");
        ActionService.createAction($scope.runId, "read", $scope.item.id, $scope.item.type);
        $scope.richText = $sce.trustAsHtml($scope.item.richText.replace('src="game/', 'src="https://streetlearn.appspot.com/game/'));

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

angular.module('ARLearn').controller('AudioObjectController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });

});
angular.module('ARLearn').controller('ScanTagController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });
    $scope.cameraRequested = true;

    $scope.onSuccess = function (action) {
        $scope.action = action;
        ActionService.createAction($scope.runId, $scope.action, $scope.item.id, $scope.item.type);
        $window.history.back();

    }
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
                    "responseValue": "{\"isCorrect\":true,\"answer\":\""+answer.answer+"\"}"
                }
            }

        }
        if (response) {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
        } else {
            ActionService.createAction($scope.runId, "answer_wrong", $scope.item.id, $scope.item.type);
            response = {
                "type": "org.celstec.arlearn2.beans.run.Response",
                "runId": $scope.runId,
                "generalItemId": $scope.item.id,
                "responseValue": "{\"isCorrect\":false,\"answer\":\""+answer.answer+"\"}"
            }
        }
        ResponseService.createResponse(response);
        $window.history.back();
    };

});

angular.module('ARLearn').controller('MultipleChoiceController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });
    $scope.selection = $scope.selection || {};
    $scope.select = function(id) {

        if ($scope.selection[id]){
            $scope.selection[id] = !$scope.selection[id];
        } else {
            $scope.selection[id] =  true;
        }
    };

    $scope.answerSelected = function(answer){

        return $scope.selection[answer.id];
    };

    $scope.submit = function() {
        var response;
        // console.log($scope.selection);
        var allTrue = true;
        for (var i= 0; i< $scope.item.answers.length; i++) {
            var answer  = $scope.item.answers[i]
            // console.log(answer.id + " "+answer.answer + " "+ answer.isCorrect + " allTrue "+allTrue);
            if (answer.isCorrect) {
                allTrue = allTrue && $scope.selection[answer.id];
            } else {
                if (typeof $scope.selection[answer.id] == 'undefined') {
                    console.log(answer.answer +' is undefined');
                } else {
                    //selection should be false
                    if ($scope.selection[answer.id]) allTrue = false;
                }
            }
        }
        ActionService.createAction($scope.runId, "answer_given", $scope.item.id, $scope.item.type);
        if (allTrue) {
            ActionService.createAction($scope.runId, "answer_correct", $scope.item.id, $scope.item.type);
        } else {
            ActionService.createAction($scope.runId, "answer_wrong", $scope.item.id, $scope.item.type);
        }
        if (typeof allTrue == 'undefined') {
            allTrue = false;
        }
        var keys = Object.keys($scope.selection);
        console.log(allTrue);
        for (var i= 0; i< keys.length; i++) {
            ActionService.createAction($scope.runId, "answer_"+keys[i], $scope.item.id, $scope.item.type);
            var answer = "";
            for (var j= 0; j< $scope.item.answers.length; j++) {
                if ($scope.item.answers[j].id == keys[i]) answer = $scope.item.answers[j].answer;
            }

                var response = {
                            "type": "org.celstec.arlearn2.beans.run.Response",
                            "runId": $scope.runId,
                            "generalItemId": $scope.item.id,
                            "responseValue": "{\"isCorrect\":"+allTrue+",\"answer\":\""+answer+"\"}"
                        };
            // console.log(response);
            ResponseService.createResponse(response);


        }
        $window.history.back();
         };

});

angular.module('ARLearn').controller('SingleChoiceImageController', function ($scope,$controller,$routeParams, $sce, GeneralItemService, ActionService,ResponseService, $window, GameService) {


    $controller('GeneralItemController', { $scope: $scope });
    GeneralItemService.getItemById($routeParams.gameId, $routeParams.itemId).then(function(data){
        console.log(data);


    });

});