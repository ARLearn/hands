angular.module('ARLearn')
    .factory('Player', function GameFactory($resource, $http, config) {
            return $resource(config.server + '/rest/users', {}, {
                'getPlayersByRunId': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/users/runId/:id'
                }
                ,
                'createPlayer': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/users'
                },
                'deletePlayer': {
                    method: 'DELETE',
                    isArray: false,
                    url: config.server + '/rest/users/runId/:runId/email/:type::localId'
                }

            });
        }
    );

angular.module('ARLearn')
    .factory('Team', function GameFactory($resource, $http, config) {
            return $resource(config.server + '/rest/team', {}, {
                'getTeamsByRunId': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/team/runId/:id'
                },
                'createTeam': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/team'
                }

            });
        }
    );