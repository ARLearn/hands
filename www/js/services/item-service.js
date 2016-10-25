angular.module('ARLearn').service('GeneralItemService', function ($q, Item,ItemVisibility, CacheFactory) {


    CacheFactory('itemsCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });

    var generalItems = {};
    var dataCache = CacheFactory.get('itemsCache');
    var itemIds = dataCache.keys();
    for (i=0; i < itemIds.length; i++) {
        var generalItem = dataCache.get(itemIds[i]);
        if (!generalItems[generalItem.gameId]){
            generalItems[generalItem.gameId] = {};
        }
        generalItems[generalItem.gameId][generalItem.id] = generalItem;
    };

    return {
        loadItems: function (gameId) {
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('itemsCache');
            Item.getGeneralItemsByGameId({gameId: gameId}).$promise.then(
                function (data) {
                    // var returnElements=[];
                    generalItems[gameId] = generalItems[gameId] || {};
                    for (i = 0; i < data.generalItems.length; i++) {
                        if (!data.generalItems[i].deleted) {
                            dataCache.put(data.generalItems[i].id, data.generalItems[i]);
                            generalItems[gameId][data.generalItems[i].id] = data.generalItems[i];
                            // returnElements.push(data.generalItems[i])
                        }


                    }
                     deferred.resolve(generalItems[gameId]);
                    //deferred.resolve(data1);
                }
            );
            return deferred.promise;
        },
        refreshItem: function(gameId, id) {
            var dataCache = CacheFactory.get('itemsCache');
            if (dataCache.get(id)) {
                delete generalItems[gameId][id];
                dataCache.remove(id);
            }
            return this.getItemById(gameId, id);
        },
        getItemById: function (gameId, itemId) {
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('itemsCache');
            if (dataCache.get(itemId)) {
                deferred.resolve(dataCache.get(itemId));
            } else {

                Item.getGeneralItemsByGameIdItemId({gameId: gameId, itemId:itemId}).$promise.then(
                    function (data) {
                        if (!data.error){
                            if (data.deleted) {
                                delete generalItems[gameId][itemId];
                                dataCache.remove(itemId);

                            } else {
                                dataCache.put(itemId, data);
                                generalItems[gameId][itemId] = data;
                            }

                        }

                        deferred.resolve(data);
                    }
                );
            }
            return deferred.promise;
        },
        saveItem: function(item){
            var deferred = $q.defer();

            var dataCache = CacheFactory.get('itemsCache');
            if (item.id) dataCache.remove(item.id);
            Item.create(item).$promise.then(
                function (data) {
                    dataCache.put(data.id, data);
                    generalItems[data.gameId][data.id] = data;
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        },
        deleteItem: function(item) {
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('itemsCache');
            dataCache.remove(item.id);
            Item.delete({gameId:item.gameId, itemId:item.id}).$promise.then(
                function (data) {
                    deferred.resolve(data);
                    delete generalItems[item.gameId][item.id];
                }
            );
            return deferred.promise;
        },
        deleteFilePath: function(gameId, path) {
            var deferred = $q.defer();
            Item.deleteFilePath({gameId:gameId, path:path}).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        },
        getItemFromCache: function(id) {
            var dataCache = CacheFactory.get('itemsCache');
            return dataCache.get(id);
        },
        visibleItems: function(runId) {
            var deferred = $q.defer();
            ItemVisibility.getVisibilityStatements({runId:runId}).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        },
        
        pictureUploadUrl: function(gameId, itemId, key) {
            return Item.pictureUploadUrl({gameId:gameId, itemId:itemId, key:key});
        },

        handleNotification: function(notification) {
            console.log('time to handle');
        }
    }

});