angular.module('ARLearn')
    .factory('Session', function SessionFactory($http,CacheFactory ) {
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        } //temp function
        var date = new Date();
        date.setTime(date.getTime()+(2*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();

        return {
            getOauthType : function(){
                if (getCookie('arlearn.OauthType')) {
                    this.setOauthType(getCookie('arlearn.OauthType'));
                }
                return localStorage.getItem('oauth')
            },
            setOauthType : function(value){
                return localStorage.setItem('oauth', value)
                document.cookie = "arlearn.OauthType="+value+expires+"; path=/old";
                
            },
            getAccessToken: function() {
                var service = this;
                if (getCookie('arlearn.AccessToken')) {
                    service.setAccessToken(getCookie('arlearn.AccessToken'));
                }
                return localStorage.getItem('accessToken')
            },
            setAccessToken: function(value) {
                $http.defaults.headers.common['Authorization'] = 'GoogleLogin auth='+value;

                document.cookie = "arlearn.AccessToken="+value+expires+"; path=/old";
                document.cookie = "arlearn.AccessToken="+value+expires+"; path=/";
                document.cookie = "redirectAfterOauth=";
                return localStorage.setItem('accessToken', value)
            },
            reset: function(){
                $http.defaults.headers.common['Authorization'] = '';

                localStorage.removeItem('oauth');
                localStorage.removeItem('accessToken');
                CacheFactory.clearAll();
            },
            hasAccessToken: function() {
                if (getCookie('arlearn.AccessToken')) return true;
                return false;
            },
            storePathAfterLogin: function(path) {
                localStorage.setItem('pathAfterLogin', path);
            },
            retrievePathAfterLogin: function() {
                var path = localStorage.getItem('pathAfterLogin');
                if (path) localStorage.removeItem('pathAfterLogin');
                return path;
            }
        }
    });