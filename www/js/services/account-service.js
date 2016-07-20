angular.module('ARLearn').service('AccountService', function ($q, Account, CacheFactory) {

    CacheFactory('accountCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });

    return {
        myDetails: function () {
            var deferred = $q.defer();
            var dataCache = CacheFactory.get('accountCache');
            if (dataCache.get('me')) {
                deferred.resolve(dataCache.get('me'));
            } else {
                Account.accountDetails().$promise.then(
                    function(accountData){
                        dataCache.put('me', accountData);
                        deferred.resolve(accountData);
                    }
                );
            }
            return deferred.promise;
        }
    }

});