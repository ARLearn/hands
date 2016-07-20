angular.module('ARLearn')
    .factory('Store', function StoreFactory($resource, $http, config) {
            return $resource(config.server+'/rest/store/', {}, {

                'getFeaturedByLanguage': {
                    method: 'GET',
                    isArray: false,
                    url: config.server+'/rest/store/games/featured/lang/:lang'
                }
            });
        }
    );

