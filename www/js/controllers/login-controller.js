angular.module('ARLearn').controller('LoginController', function ($scope, Session, Oauth) {
    $scope.oauth = Session.getOauthType;
    $scope.accessToken = Session.getAccessToken;
    $scope.isLoggedIn = function () {
        if ($scope.accessToken() && $scope.oauth()) return true;
        return false;
    };
    var providers = {};
    Oauth.info().$promise.then(
        function (data) {
            for (var i = 0; i < data.oauthInfoList.length; i++) {
                providers['prov' + data.oauthInfoList[i].providerId] = data.oauthInfoList[i];

            }

            console.log(providers);
        }
    );

    $scope.providerExists = function(providerId) {
        return (providers['prov'+providerId]!= null);
    };

    $scope.fbUrl = function(){
        if (!providers.prov1) return "";
        return "https://graph.facebook.com/oauth/authorize?client_id="+providers.prov1.clientId+
            "&display=page&redirect_uri="+providers.prov1.redirectUri+"&scope=email";
    };

    $scope.googleUrl = function(){
        if (!providers.prov2) return "";
        return "https://accounts.google.com/o/oauth2/auth?redirect_uri="+providers.prov2.redirectUri
            +"&response_type=code&client_id="+providers.prov2.clientId+
        "&approval_prompt=force&scope=https://www.googleapis.com/auth/userinfo.profile%20%20https://www.googleapis.com/auth/userinfo.email";
    };

    $scope.wespotUrl = function(){
        if (!providers.prov5) return "";
        return "https://wespot-arlearn.appspot.com/Login.html?client_id="+providers.prov5.clientId
            +"&redirect_uri="+providers.prov5.redirectUri+"&response_type=code&scope=profile+email";
    }


    //$http({method:'GET',url: config.server+'/rest/oauth/getOauthInfo/'}).success(function(data){
    //
    //    for (var i in data.oauthInfoList) {
    //        console.log(data.oauthInfoList[i]);
    //        providers['prov'+i] = data.oauthInfoList[i];
    //
    //    }
    //    console.log(providers);
    //    $scope.providerExists = function(providerId) {
    //        return (providers['prov'+providerId]!= null);
    //    }
    //} );

});

