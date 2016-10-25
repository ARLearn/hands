// This module depends on the google CryptoJS library, you can load it by adding:
// <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
// to your page

angular.module('Gravatar', [])
    .provider('$gravatar', function() {
        var avatarSize = 80; // Default size
        var avatarUrl = "https://www.gravatar.com/avatar/";

        this.setSize = function(size) {
            avatarSize = size;
        }

        this.$get = function(){
            return {
                generate: function(email){
                    return avatarUrl + CryptoJS.MD5(email) + "?size=" + avatarSize.toString()
                }
            }
        }
    });