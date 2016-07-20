angular.module('ARLearn').service('RunService', function ($q, Run, CacheFactory) {

    CacheFactory('runsCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });

    var gameToRuns = {};
    var runs = {};
    var dataCache = CacheFactory.get('runsCache');
    var runIds = dataCache.keys();
    for (i=0; i < runIds.length; i++) {
        var run = dataCache.get(runIds[i]);
        if (!run.deleted) {
            var gameId = dataCache.get(runIds[i]).gameId;
            gameToRuns[gameId] = gameToRuns[gameId] || {};
            gameToRuns[gameId][runIds[i]] = run;
            runs[runIds[i]] = run;
        }

    };

    return {
        getRunById: function (id) {
            var deferred = $q.defer();
            if (runs[id]) {
                deferred.resolve(runs[id]);
            } else {

                Run.getRun({id: id}).$promise.then(
                    function (data) {
                        gameToRuns[data.gameId] = gameToRuns[data.gameId] || {};

                        if (data.deleted) {
                            delete gameToRuns[data.gameId][id];
                            delete runs[id];
                            dataCache.remove(id);
                        } else {
                            dataCache.put(id, data);
                            gameToRuns[data.gameId][id] = data;
                            runs[id] = data;
                        }

                    }
                );
            }
            return deferred.promise;
        },

        getOwnedRunsForGame: function (gameId) {
            var service = this;
            gameToRuns[gameId] = gameToRuns[gameId] || {};
            Run.getOwnedRunsForGame({id: gameId}).$promise.then(
                function (data) {
                    var runAccess={};
                    if (!data.error) {
                        for (var i = 0; i < data.runAccess.length; i++) {
                            runAccess['id' + data.runAccess[i].runId] = data.runAccess[i];
                            service.getRunById(data.runAccess[i].runId);
                            //    .then(function (runObject) {
                            //    runAccess['id' + runObject.runId].run = runObject;
                            //});
                        }
                    }

                }
            );

            return gameToRuns[gameId];
        },
        newRun: function(runAsJson){
            var newrun = new Run(runAsJson);
            newrun.$save().then(
                function (data) {
                    gameToRuns[data.gameId] = gameToRuns[data.gameId] || {};
                    gameToRuns[data.gameId][data.runId] = data;
                    runs[data.runId] = data;
                }
            );

        },
        delete: function(runId) {
            Run.delete({runId: runId}).$promise.then(
                function (data) {
                    delete gameToRuns[data.gameId][data.runId];
                    delete runs[data.runId];
                }
            );
        }
    }

});