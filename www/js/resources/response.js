angular.module('ARLearn')
    .factory('Response', function GameFactory($resource, $http, config) {
            return $resource(config.server + '/rest/response', {}, {
                'getResponseByRunId': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/response/runId/:runId?from=:from'
                },
                'getResponseByRunIdResumption': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/response/runId/:runId?from=:from&resumptionToken=:resumptionToken'
                }
                //,
                //'create': {
                //    method: 'POST',
                //    isArray: false,
                //    url: config.server + '/rest/response'
                //}
            });
        }
    );