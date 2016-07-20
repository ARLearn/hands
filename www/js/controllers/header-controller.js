angular.module('ARLearn').controller('HeaderController', function ($scope, Session, $translate, AccountService, $gravatar) {
    $scope.test = "foo";
    $scope.setLanguage = function(lang) {
        $translate.use(lang);
    };

    $scope.getLang = function() {
        return $translate.use();
    };

    $scope.name = "your name";

    $scope.loggedIn =  function(){
        return Session.getAccessToken();
    }
    if (Session.getAccessToken() ) {
        AccountService.myDetails().then(
            function(data){
                $scope.name = data.name;
                $scope.accountLevel = data.accountLevel;
                switch(data.accountlevel) {
                    case 1:
                        $scope.accountRights = "Administrator";
                        
                        break;
                    case 2:
                        $scope.accountRights = "Advanced ARLearn user";
                        
                        break;
                    case 3:
                        $scope.accountRights = "ARLearn user";
                        break;
                }
                $scope.gravatarUrl = $gravatar.generate(data.email);


            }
        );
    }
    
    $scope.showPrevious = function() {
        return Session.hasAccessToken();
    }

    $scope.signout = function() {
        Session.reset();
        document.cookie =  'arlearn.AccessToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';

    }


});