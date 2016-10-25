angular.module('ARLearn')
    .factory('Action', function ItemFactory($resource, config ) {
            return $resource(config.server + '/rest/actions', {}, {
                'create': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/actions'
                }
            });
        }
    );