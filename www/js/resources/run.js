angular.module('ARLearn')
    .factory('Run', function RunFactory($resource, config) {
            return $resource('/rest/myRuns', {}, {
                getRun: {
                    method: 'GET',
                    isArray: false,
                    url: config.server +'/rest/myRuns/runId/:id'

                },
                getParticipateRunsForGame: {
                    method: 'GET',
                    isArray: false,
                    url: config.server +'/rest/myRuns/participate/gameId/:id'
                },
                getOwnedRunsForGame: {
                    method: 'GET',
                    isArray: false,
                    url: config.server +'/rest/myRuns/runAccess/gameId/:id'
                },
                'delete': {
                    method: 'DELETE',
                    isArray: false,
                    url: config.server + '/rest/myRuns/runId/:runId'
                }
            });
        }
    );

