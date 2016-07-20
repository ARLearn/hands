angular.module('ARLearn').controller("ModalMessagesAppearController", function ($scope, $uibModalInstance, GeneralItemService ) {


    var coreActions = [
        {"action":"read", "name":"reads"}
    ];

    $scope.actions = coreActions.slice();

    $scope.selection = {};
    $scope.selection.action = "";



    $scope.updateActions = function(item) {
        if (item.type == 'org.celstec.arlearn2.beans.generalItem.NarratorItem') {
            $scope.actions = coreActions.slice();
        } else if (item.type == 'org.celstec.arlearn2.beans.generalItem.VideoObject') {
            $scope.actions = coreActions.slice();
            $scope.actions.push({"action":"complete", "name":"completes watching the video in"})
        }  else if (item.type == 'org.celstec.arlearn2.beans.generalItem.AudioObject') {
            $scope.actions = coreActions.slice();
            $scope.actions.push({"action":"complete", "name":"completes listening to the audio fragment in"})
        }  else if (item.type == 'org.celstec.arlearn2.beans.generalItem.MultipleChoiceTest') {
            $scope.actions = coreActions.slice();
            $scope.actions.push({"action":"correct", "name":"gives a correct answer to"});
            $scope.actions.push({"action":"wrong", "name":"gives a wrong answer to"});
            for (answerIndex in item.answers) {
                $scope.actions.push({"action":"answer_"+item.answers[answerIndex].id, "name":"answers '"+item.answers[answerIndex].answer+"' to"});
            }
        }  else if (item.type == 'org.celstec.arlearn2.beans.generalItem.SingleChoiceTest') {
            $scope.actions = coreActions.slice();
            $scope.actions.push({"action":"correct", "name":"gives a correct answer to"});
            $scope.actions.push({"action":"wrong", "name":"gives a wrong answer to"});
            for (answerIndex in item.answers) {
                $scope.actions.push({"action":"answer_"+item.answers[answerIndex].id, "name":"answers '"+item.answers[answerIndex].answer+"' to"});
            }
        }
    };

    function setAction(action) {
        for (actionObject in $scope.actions){
            if ($scope.actions[actionObject].action == action) {
                $scope.dependsOn.action = $scope.actions[actionObject];
            }
        }
    }

    GeneralItemService.loadItems($scope.gameId).then(function(data){
        $scope.messages = [];
        $scope.qrmessages = [];
        for (var m in data) {
            $scope.messages.push(data[m]);
            if (data[m].type =="org.celstec.arlearn2.beans.generalItem.ScanTag"){
                $scope.qrmessages.push(data[m]);
            }
            if ($scope.dependsOn.generalItemId && $scope.dependsOn.generalItemId == data[m].id) {
                $scope.selection.message = data[m];
                $scope.updateActions(data[m]);
                setAction($scope.dependsOn.action);
            }
        }

    });


    
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.ok = function() {
        $scope.dependsOn.generalItemId = $scope.selection.message.id;
        if ($scope.dependsOn.action.action) {
            $scope.dependsOn.action =$scope.dependsOn.action.action;
        }
        $uibModalInstance.close();
    }
});

angular.module('ARLearn').controller("ModalMessagesProximityAppearController", function ($rootScope, $scope, $uibModalInstance, GeneralItemService ) {
    $rootScope.currentMap = 'proxDep';
    $scope.options ={labelClass:'marker_labels',labelAnchor:'22 0',labelContent:$scope.item.name };
    $scope.map = {
        center: { latitude: 50, longitude: 5 },
        zoom: 15,

    };
    $scope.c =
    {
        id: 1,
        //center: {
        //    latitude: 50,
        //    longitude: 5
        //},
        radius: 40,
        stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
        },
        fill: {
            color: '#08B21F',
            opacity: 0.5
        },
        geodesic: true, // optional: defaults to false
        draggable: true, // optional: defaults to false
        clickable: true, // optional: defaults to true
        editable: true, // optional: defaults to false
        visible: true, // optional: defaults to true
        control: {}
    };

    if ($scope.dependsOn.lat && $scope.dependsOn.lng) {
        $scope.c.center = {};
        $scope.c.center.latitude = $scope.dependsOn.lat;
        $scope.c.center.longitude = $scope.dependsOn.lng;
        $scope.c.radius = $scope.dependsOn.radius;
    }


    if ($scope.item.lat && $scope.item.lng) {
        $scope.showMarker =true;

        $scope.markerCoords = {
            latitude:$scope.item.lat,
            longitude: $scope.item.lng
        };
        $scope.map.center.latitude = $scope.item.lat;
        $scope.map.center.longitude = $scope.item.lng;
        if (!$scope.c.center) {
            $scope.c.center = {};
            $scope.c.center.latitude = $scope.item.lat;
            $scope.c.center.longitude = $scope.item.lng;
        }
    } else {
        $scope.showMarker =false;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                $scope.$apply(function(){
                    $scope.position = position;
                    console.log("position");
                    console.log(position);
                    $scope.map.center.latitude = position.coords.latitude;
                    $scope.map.center.longitude = position.coords.longitude;
                    if (!$scope.c.center) {
                        $scope.c.center = {};
                        $scope.c.center.latitude = position.coords.latitude;
                        $scope.c.center.longitude = position.coords.longitude;
                    }

                });
            });
        }
    }




    $scope.cancel = function () {

        $uibModalInstance.dismiss();
    };

    $scope.ok = function() {
        $scope.dependsOn.lat = $scope.c.center.latitude;
        $scope.dependsOn.lng = $scope.c.center.longitude;
        $scope.dependsOn.radius = $scope.c.radius;
        $uibModalInstance.close();
    }

});