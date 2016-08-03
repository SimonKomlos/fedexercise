angular.module('MainService', [])
    .factory('Main', function ($http) {
        return {
            get: function (user_id) {
                return $http.get('https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&format=json&api_key=a5e95177da353f58113fd60296e1d250&user_id='+user_id);
            }
        }
    });
