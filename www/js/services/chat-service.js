angular.module('ARLearn').service('ChatService', function ($q, Chat) {

    var messages = {}; //runId-> messagearray

    var threads = {};

    return {
        loadRecentMessages: function(runId) {
            var deferred = $q.defer();
            Chat.getRecentMessages({runId:runId, amount:10}).$promise.then(
                function (data) {
                    messages.runId = data.messages;
                    deferred.resolve(messages.runId);
                }
            );
            return deferred.promise;

        },
        loadRecentMessagesThread: function(runId, threadId) {
            var deferred = $q.defer();
            Chat.getRecentMessagesForThread({runId:runId, threadId:threadId, amount:10}).$promise.then(
                function (data) {
                    messages.runId = data.messages;
                    deferred.resolve(messages.runId);
                }
            );
            return deferred.promise;

        },
        sendMessage: function(message){
            var deferred = $q.defer();
            Chat.create(message).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        },
        getMessage: function(messageId){
            var deferred = $q.defer();
            Chat.getMessage({messageId:messageId}).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        },
        getThreads: function(runId){
            var deferred = $q.defer();
            if (threads[runId]) {
                deferred.resolve(threads[runId]);
            }
            Chat.getThreads({runId:runId}).$promise.then(
                function (data) {
                    threads[runId] = data.threads;
                    deferred.resolve(data.threads);
                }
            );
            return deferred.promise;

        },
        createThread: function (runId, name) {
            var deferred = $q.defer();
            Chat.createThread({
                "type": "org.celstec.arlearn2.beans.run.Thread",
                "name": name,
                "runId": runId
            }).$promise.then(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        }
    }
});
