angular.module('ARLearn')
    .factory('Chat', function ItemFactory($resource, config ) {
            return $resource('/rest/messages/runId/:runId/default', {}, {
                'getRecentMessages': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/messages/runId/:runId/recentFirst/:amount'
                },
                'getRecentMessagesForThread': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/messages/runId/:runId/thread/:threadId/recentFirst/:amount'
                },
                'create': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/messages/message'
                },
                'getMessage': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/messages/message/:messageId'
                },
                'getThreads': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/messages/thread/runId/:runId'
                },
                'createThread': {
                    method: 'POST',
                    isArray: false,
                    url: config.server + '/rest/messages/thread'
                }
            });
        }
    );


angular.module('ARLearn')
    .factory('ChannelApi', function ChannelApiFactory($resource, config ) {
            return $resource('/rest/channelAPI', {}, {
                'token': {
                    method: 'GET',
                    isArray: false,
                    url: config.server + '/rest/channelAPI/token'
                }
            });
        }
    );