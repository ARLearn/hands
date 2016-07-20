angular.module('ARLearn').controller('PhoneGapLoginController', function ($scope, Session, $location) {
    var ref;
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

// http://streetlearn.appspot.com/oauth.html?accessToken=ya29.Ci8mA1f2s2g2dqPqyGXLQtFKWW6D42aThimfr-Q7nuoNK6jajQVn2-F4O8lCwa_YnQ&type=2&exp=604800#
    function checkUrl(url) {
        if (url.indexOf("accessToken=") > -1) {
            ref.removeEventListener('loadstart', eventListener);
            var accessToken = getParameterByName("accessToken", url);
            Session.setAccessToken(accessToken);
            ref.close();
            console.log("session query:"+Session.getAccessToken());

            cordova.InAppBrowser.open('index.html#/splash', '_self', 'location=no');
        }
    }

    var eventListener = function(event) { checkUrl(event.url); };
    $scope.openGoogle = function() {
        ref = cordova.InAppBrowser.open('https://accounts.google.com/o/oauth2/auth?redirect_uri=http://streetlearn.appspot.com/oauth/google&response_type=code&client_id=594104153413-8ddgvbqp0g21pid8fm8u2dau37521b16.apps.googleusercontent.com&approval_prompt=force&scope=https://www.googleapis.com/auth/userinfo.profile%20%20https://www.googleapis.com/auth/userinfo.email', '_self', 'location=yes');
        ref.addEventListener('loadstart', eventListener );
    }

});
