angular.module('ARLearn').factory('audio', function ($document) {
    var audio = $document[0].createElement('audio');
    return audio;
});
angular.module('ARLearn').factory('player', function (audio, $rootScope) {
    paused = false;
    var player = {



        playing: false,

        play: function () {


           // if (!paused) audio.src = "https://streetlearn.appspot.com/game/5887902462509056/generalItems/6329853506748416/audio"
            audio.play();
            player.playing = true;
            paused = false;
        },

        setSource: function(source) {
            audio.src = source;
            console.log("src " +audio.src);
        },

        pause: function () {
            if (player.playing) {
                audio.pause();
                player.playing = false;
                paused = true;
            }
        },

        reset: function () {
            player.pause();

        }



    }
    return player;

});

angular.module('ARLearn').controller('PlayAudioController', function ($scope, player) {
    $scope.player = player;
    player.setSource("https://streetlearn.appspot.com/game/"+$scope.item.gameId+"/generalItems/"+$scope.item.id+"/audio");


});
