angular.module('ARLearn')
    .factory('Item', function ItemFactory($resource, config ) {
            return $resource('/rest/generalItems/:id', {}, {
                'getGeneralItemsByGameId': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/generalItems/gameId/:gameId'
                },
                'getGeneralItemsByGameIdItemId': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/generalItems/gameId/:gameId/generalItem/:itemId'
                },
                'pictureUploadUrl':{
                    url:config.server + '/rest/generalItems/pictureUrl/gameId/:gameId/generalItem/:itemId/:key'
                },
                'create': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/generalItems'
                },
                'delete': {
                    method: 'DELETE',
                    isArray: false,
                    url: config.server + '/rest/generalItems/gameId/:gameId/generalItem/:itemId'
                },
                'deleteFilePath': {
                    method: 'DELETE',
                    isArray: false,
                    url: config.server + '/rest/generalItems/gameId/:gameId/:path'
                }
            });
        }
    );

angular.module('ARLearn')
    .factory('ItemVisibility', function ItemVisibilityFactory($resource, config) {
            return $resource('/rest/generalItemsVisibility/', {}, {
                getVisibilityStatements: {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/generalItemsVisibility/runId/:runId'
                }
            });
        }
    );

