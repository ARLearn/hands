angular.module('ARLearn').service('ActionService', function ($q, Action, CacheFactory) {



    return {

        createAction: function(runId, action, generalItemId, generalItemType) {
            var actionAsJson =   {
                "type": "org.celstec.arlearn2.beans.run.Action",
                "generalItemId": generalItemId,
                "generalItemType": generalItemType,
                "action": "read"
            };
            if (runId) actionAsJson.runId = runId;
            if (generalItemId) actionAsJson.generalItemId = generalItemId;
            if (generalItemType) actionAsJson.generalItemType = generalItemType;
            if (action) actionAsJson.action = action;
            var newAction = new Action(actionAsJson);
            newAction.$save().then(
                function (data) {
                    console.log("action saved "+data);
                }
            );
            //return deferred.promise;

        }
    }

});

