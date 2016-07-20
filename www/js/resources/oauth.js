angular.module('ARLearn')
    .factory('Oauth', function GameFactory($resource, $http, config) {
            return $resource(config.server+'/rest/oauth/', {}, {
                'info': {
                    method: 'GET',
                    isArray: false,
                    url: config.server+'/rest/oauth/getOauthInfo/'
                }
            });
        }
    );

