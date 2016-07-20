angular.module('ARLearn').controller('RunController', function ($scope, $routeParams, ResponseService,  RunService, PlayerService, $uibModal,$gravatar, $window) {

    RunService.getRunById($routeParams.runId).then(function (data) {
        $scope.runTitle = data.title;
        $scope.runId = data.runId;

    });

    //PlayerService.getPlayersByRunId($routeParams.runId).then(function (data) {
    //
    //    $scope.players = data;
    //    for (var i = 0;i< data.length;i++){
    //        data[i].gravatarUrl = $gravatar.generate(data[i].email);
    //
    //    }
    //
    //
    //});

    $scope.players = PlayerService.getPlayersByRunId($routeParams.runId);

    PlayerService.getTeamsByRunId($routeParams.runId).then(function (data) {

        $scope.teams = data;


    });

    $scope.removePlayer = function(player) {
        $scope.modalText = "Remove player";
        $uibModal.open({
            templateUrl:'/templates/modals/confirm.html',
            controller: 'GamesMessageConfirmDeleteController',
            scope: $scope

        }).result.then(
            function (result) {
                PlayerService.removePlayer($routeParams.runId, player.accountType, player.localId);

            },
            function () {
            }
        );

    }

    $scope.addTeam = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/run/addTeam.html',
            controller: 'ModalAddTeamCtrl',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function (data) {
            console.log(data);
        }, function () {
            //user dismissed
        });
    };

    $scope.addPlayer = function (size) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/modals/run/addPlayer.html',
            controller: 'ModalAddPlayerCtrl',
            size: size,
            scope: $scope
        });

        modalInstance.result.then(function (data) {
            console.log(data);
        }, function () {
            //user dismissed
        });
    };

    $scope.deleteRun = function() {
        RunService.delete($routeParams.runId);
        $window.history.back();//.then(function (data) {
            //$scope.runTitle = data.title;
            //$scope.runId = data.runId;

        //});
    }

    $scope.responses = ResponseService.getResponsesByRunId($routeParams.runId);
    $scope.responseImages = ResponseService.getImageResponsesByRunId($routeParams.runId);
    $scope.getPlayer = function(playerId) {
        for (var i = 0; i< $scope.players.length; i++){
            if (playerId == $scope.players[i].accountType+':'+$scope.players[i].localId) {
                return $scope.players[i].name;
            }
        }
        return "---";
    };

    $scope.getResponseString= function(response) {
         var json = JSON.parse(response.responseValue);
        if (json.answer) return json.answer;
        if (json.text) return json.text;
        if (json.videoUrl) return "watch video";
        if (json.imageUrl) return "watch picture";
        if (json.audioUrl) return "watch audio"
    };

    $scope.clickResponse = function (response) {
        var json = JSON.parse(response.responseValue);

        // if (json.videoUrl) {
        //     function fireClickEvent(element) {
        //         var evt = new window.MouseEvent('click', {
        //             view: window,
        //             bubbles: true,
        //             cancelable: true
        //
        //         element.dispatchEvent(evt);
        //     }
        //
        //     var a = document.createElement('a');
        //     a.href = json.videoUrl;
        //     a.target = '_blank'; // now it will open new tab/window and bypass any popup blocker!
        //
        //     fireClickEvent(a);
        // } else
        if (json.audioUrl || json.imageUrl||json.videoUrl) {
            $scope.response = json;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/templates/modals/run/showResponse.html',
                controller: 'ModalShowResponseCtrl',
                scope: $scope
            });

            modalInstance.result.then(function (data) {
                console.log(data);
            }, function () {
                //user dismissed
            });
        }
    };

    

    //uib carrousel

    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function(key) {
        var newWidth = 600 + slides.length + 1;
        slides.push({
            // image: 'http://lorempixel.com/' + newWidth + '/300',
            image: $scope.responseImages[key],
            text: '',
            id: currIndex++
        });
    };

    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    // for (var i = 0; i < 4; i++) {
    //     $scope.addSlide();
    // }

    $scope.$watch("responseImages", function(newValue, oldValue) {
        slides = $scope.slides = [];
        if (newValue){
            var keys = Object.keys(newValue);
            for (var i=0;i<keys.length;i++) {
                console.log(keys[i]);
                $scope.addSlide(keys[i]);
            }
        }

    });



});

