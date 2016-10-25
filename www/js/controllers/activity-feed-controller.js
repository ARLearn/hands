angular.module('ARLearn').controller('ActivityFeedController', function ($scope, $gravatar, ActivityFeed, Account) {
    ActivityFeed.get({gameId:5508553255157760}).$promise.then(
        function (data) {
            $scope.stream = data.items;
            $scope.authors = $scope.authors || {};
            data.items.forEach(function(entry) {
                $scope.authors[entry.actor.account.name] = $scope.authors[entry.actor.account.name] || {};
            });
            for(var author in $scope.authors) {

                console.log(author);
                if (Object.keys($scope.authors[author]).length == 0) {
                    Account.accountDetailsById({fullId:author}).$promise.then(
                        function(data) {
                            $scope.authors[author] = data;
                            $scope.authors[author].grav = $gravatar.generate(data.email)
                        }
                    );
                }
            };

        }
    );

    $scope.getVerb = function(item){
        return "authored";
    };

    $scope.getObject = function(item){
        return item.arlearnBean.name;
    };

    $scope.gethref = function(item){
        return item.object.id;
    }
});

angular.module('ARLearn').controller('GameActivityFeedController', function ($scope,$routeParams, $gravatar, ActivityFeed, Account) {
    ActivityFeed.game({gameId:$routeParams.gameId}).$promise.then(
        function (data) {
            $scope.stream = data.items;
            $scope.authors = $scope.authors || {};
            data.items.forEach(function(entry) {
                $scope.authors[entry.actor.account.name] = $scope.authors[entry.actor.account.name] || {};
            });
            for(var author in $scope.authors) {

                console.log(author);
                if (Object.keys($scope.authors[author]).length == 0) {
                    Account.accountDetailsById({fullId:author}).$promise.then(
                        function(data) {
                            $scope.authors[author] = data;
                            $scope.authors[author].grav = $gravatar.generate(data.email)
                        }
                    );
                }
            };

        }
    );

    $scope.getVerb = function(item){
        return "authored";
    };

    $scope.getObject = function(item){
        return item.arlearnBean.name;
    };

    $scope.gethref = function(item){
        return item.object.id;
    }
});