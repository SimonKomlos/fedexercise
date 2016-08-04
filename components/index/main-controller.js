angular.module('MainController', [
        'MainService',
        'MainDirective',
    ])
    .controller('MainCtrl', function($scope, $http, Main) {

        var self = this;
        const NASA_USER_ID = "24662369@N07";

        Main.get(NASA_USER_ID)
            .success(function(data) {
            	self.imageResults = data.photos.photo;
            	console.log(self.imageResults);
            }).error(function(data) {
                console.log(data);
            });

    });
