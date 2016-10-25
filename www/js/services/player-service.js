angular.module('ARLearn').service('PlayerService', function ($q, Player, Team,CacheFactory,$gravatar) {

    CacheFactory('playersCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });
    var players = {};
    var dataCache = CacheFactory.get('playersCache');
    var runIds = dataCache.keys();
    for (i=0; i < runIds.length; i++) {
        players[runIds[i]] = dataCache.get(runIds[i]);
    };

    return {
        getPlayersByRunId: function (runId) {
            players[runId] = players[runId] || [];


            Player.getPlayersByRunId({id: runId}).$promise.then(
                function (data) {
                    if (data.error) {

                    } else {
                        console.log(data);
                        var playersArray = [];
                        for (i = 0; i < data.users.length; i++) {
                            if (data.users[i].deleted) {
                                //delete players[data.users[i].runId];
                            } else {
                                data.users[i].gravatarUrl = $gravatar.generate(data.users[i].email);
                                playersArray.push(data.users[i]);
                                //games[data.games[i].gameId].description = $sce.trustAsHtml(data.games[i].description);
                            }
                        }
                        dataCache.put(runId, playersArray);
                        players[runId].length = 0;
                        //players[runId].push(...playersArray);
                        players[runId].push.apply(players[runId],playersArray)

                    }

                }
            );
            return players[runId];
        },
        addPlayer: function (runId, accountType, localId) {
            Player.createPlayer(
                {
                    "type": "org.celstec.arlearn2.beans.run.User",
                    "runId": runId,
                    "accountType": accountType,
                    "localId": localId
                }
            ).$promise.then(
                function (data) {
                    data.gravatarUrl = $gravatar.generate(data.email);
                    players[runId].push(data);
                    dataCache.put(runId, players[runId]);
                }
            );

        },
        removePlayer: function(runId, accountType, localId){
            Player.deletePlayer({runId:runId, type:accountType,localId:localId}).$promise.then(
                function (data) {
                    if (!data.error) {
                        var deleteIndex = -1;
                        for (i = 0; i < players[runId].length; i++) {
                            if (players[runId][i].localId == localId && players[runId][i].accountType == accountType){
                                deleteIndex = i;
                            }
                        }
                        if (deleteIndex != -1){
                            players[runId].splice(deleteIndex, 1);
                            dataCache.put(runId, players[runId]);
                        }

                    }
                }
            );
        },

        getTeamsByRunId: function (runId) {
            var deferred = $q.defer();

            Team.getTeamsByRunId({id: runId}).$promise.then(
                function (data) {
                    deferred.resolve(data.teams);
                }
            );
            return deferred.promise;
        },
        createTeam: function (runId, name) {
            var deferred = $q.defer();
            Team.createTeam({
                "type": "org.celstec.arlearn2.beans.run.Team",
                "name": name,
                "runId": runId
            }).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        }

    }

});

