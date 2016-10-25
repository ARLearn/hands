angular.module('ARLearn')
    .factory('ActivityFeed', function ActivityFeedFactory($resource, $http, config) {
            return $resource(config.server+'/rest/activityFeed', {}, {
                'get': {
                    method: 'GET',
                    isArray: false,
                    url: config.server+'/rest/activityFeed/get'
                },
                'game': {
                    method: 'GET',
                    isArray: false,
                    url: config.server+'/rest/activityFeed/game/:gameId'
                }

            });
        }
    );