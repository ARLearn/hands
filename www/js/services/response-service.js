angular.module('ARLearn').service('ResponseService', function ($q, Response, CacheFactory) {

    CacheFactory('responseCache', {
        maxAge: 24 * 60 * 60 * 1000, // Items added to this cache expire after 1 day
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.

    });
    var images = {};
    function updateImages(response) {
        images[response.runId] = images[response.runId] || {};
        json = JSON.parse(response.responseValue);
        if (json.imageUrl) images[response.runId][response.responseId] = json.imageUrl;
        // if (json.videoUrl) images[response.runId][response.responseId] = json.videoUrl;
    }
    var responses = {};
    var dataCache = CacheFactory.get('responseCache');
    var responseIds = dataCache.keys();
    for (i=0; i < responseIds.length; i++) {
        var response = dataCache.get(responseIds[i]);
        responses[response.runId] = responses[response.runId] || {};
        responses[response.runId][response.responseId] = response;
        updateImages(response);
    };

    return {
        getResponsesByRunId: function (runId, from, resumptionToken) {
            responses[runId] = responses[runId] || {};
            if (!from) {
                from = 0; 
            }
            
            var service = this;
            if (resumptionToken){
                Response.getResponseByRunIdResumption({runId: runId, from: from, resumptionToken:resumptionToken}).$promise.then(
                    function (data) {
                        if (data.error) {
                            deferred.resolve(data);

                        } else {

                            for (i = 0; i < data.responses.length; i++) {
                                if (data.responses[i].revoked) {
                                    delete responses[runId][data.responses[i].responseId];
                                } else {
                                    responses[runId][data.responses[i].responseId] =data.responses[i];
                                    dataCache.put(data.responses[i].responseId, data.responses[i]);
                                    updateImages(data.responses[i]);
                                }
                            }
                            if (data.resumptionToken){
                                service.getResponsesByRunId(runId, from,data.resumptionToken);

                            }
                        }

                    }
                );
            } else {
                Response.getResponseByRunId({runId: runId, from: 0}).$promise.then(
                    function (data) {
                        if (data.error) {
                            deferred.resolve(data);

                        } else {

                            for (i = 0; i < data.responses.length; i++) {
                                if (data.responses[i].revoked) {
                                    delete responses[runId][data.responses[i].responseId];
                                } else {
                                    responses[runId][data.responses[i].responseId] =data.responses[i];
                                    dataCache.put(data.responses[i].responseId, data.responses[i]);
                                    updateImages(data.responses[i]);
                                }
                            }
                            if (data.resumptionToken){
                                service.getResponsesByRunId(runId, from,data.resumptionToken);
                            }
                        }

                    }
                );    
            }

            
            return responses[runId];
        },
        
        getImageResponsesByRunId: function (runId) {
            return images[runId];
        },
        createResponse: function(responseAsJson) {
                var newGame = new Response(responseAsJson);
                newGame.$save().then(
                    function (data) {
                        responses[data.runId][data.responseId] =data;
                        dataCache.put(data.responseId, data);
                        updateImages(data);
                    }
                );
                //return deferred.promise;

        }
    }

});

