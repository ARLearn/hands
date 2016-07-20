angular.module('ARLearn')
    .factory('Game', function GameFactory($resource, config) {
            return $resource(config.server + '/rest/myGames', {}, {
                access: {
                    params: {id: 'gameAccess'},
                    method: 'GET',
                    isArray: false
                },
                gameAccess: {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames/access/gameId/:gameId'
                },
                'query': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames'
                },
                'resume': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames?resumptionToken=:resumptionToken&from=:from'
                },
                'getGameById': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames/gameId/:id'
                },
                'create': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/myGames'
                },
                'addContributor': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames/access/gameId/:gameId/account/:accountFullId/accessRight/:type'
                },
                'removeContributor': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames/removeAccess/gameId/:gameId/account/:accountFullId'
                },
                'gameAssets': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/myGames/gameContent/gameId/:gameId'
                }
                // removeAccess/gameId/4600356650614784/account/2:103657434009291559846:2147483647
            });
        }
    );

