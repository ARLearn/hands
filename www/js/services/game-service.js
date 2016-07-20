angular.module('ARLearn').service('GameService', function ($q, $sce, Game, CacheFactory) {

    CacheFactory('gamesCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });
    var games = {};
    var dataCache = CacheFactory.get('gamesCache');
    var gameIds = dataCache.keys();
    for (i=0; i < gameIds.length; i++) {
        games[gameIds[i]] = dataCache.get(gameIds[i]);
    };


    var resumptionToken;
    var serverTime= 0;
    var serverTimeFirstInvocation;
    return {
        resumeLoadingGames: function(){
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('gamesCache');

            Game.resume({resumptionToken: resumptionToken, from:serverTime})
                .$promise.then(function (data) {
                if (data.error) {
                    deferred.resolve(data);

                } else {
                    for (i = 0; i < data.games.length; i++) {
                        if (data.games[i].deleted) {
                            delete games[data.games[i].gameId];
                        } else {
                            dataCache.put(data.games[i].gameId, data.games[i]);
                            games[data.games[i].gameId] = data.games[i];
                            games[data.games[i].gameId].description = $sce.trustAsHtml(data.games[i].description);
                        }
                    }
                    resumptionToken = data.resumptionToken;
                    serverTimeFirstInvocation = serverTimeFirstInvocation || data.serverTime;
                    if (!data.resumptionToken){
                        serverTime = serverTimeFirstInvocation;
                        serverTimeFirstInvocation = undefined;
                    }


                    deferred.resolve(data);
                }
            });
            return deferred.promise;

        },
        getGames: function () {
            return games;
        },
        getGameById: function (id) {
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('gamesCache');
            if (dataCache.get(id)) {
                deferred.resolve(dataCache.get(id));
            } else {

                Game.getGameById({id: id}).$promise.then(
                    function (data) {
                        if (!data.error){
                            if (data.deleted) {
                                delete games[id];
                                dataCache.remove(id);

                            } else {
                                dataCache.put(id, data);
                                games[id] = data;
                            }

                        }

                        deferred.resolve(data);
                    }
                );
            }
            return deferred.promise;
        },
        refreshGame: function(id) {
            var dataCache = CacheFactory.get('gamesCache');
            if (dataCache.get(id)) {
                delete games[id];
                dataCache.remove(id);
            }
            return this.getGameById(id);
        },

        access: function (gameId) {
            var deferred = $q.defer();
            Game.gameAccess({gameId:gameId}).$promise.then(
                function (data) {
                    deferred.resolve(data.gamesAccess);
                }
            );
            return deferred.promise;
        },
        getGameFromCache: function (id) {
            var dataCache = CacheFactory.get('gamesCache');
            return dataCache.get(id);
        },
        storeInCache: function (game) {
            var dataCache = CacheFactory.get('gamesCache');
            dataCache.put(game.gameId, game);

        },


        newGame: function(gameAsJson){
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('gamesCache');
            if (gameAsJson.gameId){
                dataCache.put(gameAsJson.gameId, gameAsJson);
            }
            var newGame = new Game(gameAsJson);
            newGame.$save().then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        },
        addGameContributor: function(accountFullId, gameId, type) {
            return Game.addContributor({gameId:gameId, accountFullId:accountFullId, type:type});

        },
        removeContributor: function(accountFullId, gameId) {
            return Game.removeContributor({gameId:gameId, accountFullId:accountFullId});

        },
        getGameAssets: function(gameId) {
            var deferred = $q.defer();
            Game.gameAssets({gameId:gameId}).$promise.then(
                function (data) {
                    deferred.resolve(data.gameFiles);
                }
            );
            return deferred.promise;
        }

    }

});