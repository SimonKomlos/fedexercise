angular.module('MainController', [
        'MainService',
        'MainDirective',
    ])
    .controller('MainCtrl', function($scope, $http, Main, $mdDialog, $mdMedia) {

        var self = this;
        self.fabIsOpen = false;
        self.subheaderStatus = true;
        self.limitImages = 20;
        const NASA_USER_ID = "24662369@N07";

        Main.get(NASA_USER_ID)
            .success(function(data) {
                self.imageResults = data.photos.photo;
                console.log(self.imageResults);
            }).error(function(data) {
                console.log(data);
            });

        self.showAbout = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('body')))
                .clickOutsideToClose(true)
                .title('What is this project?')
                .textContent('This is a coding challenge provided by IBM for a front end developer position! This was built by Simon Komlos')
                .ariaLabel('About this project')
                .ok('Got it!')
                .targetEvent(ev)
            );
        };

        self.loadMore = function() {
            self.limitImages += 20;
        };

        self.showLargerImage = function(ev, photo) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
            $mdDialog.show({
            	locals: {photoData: photo},
                controller: DialogController,
                templateUrl: 'template/large-image.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            });
        };

        function DialogController($scope, $mdDialog, photoData) {
        	$scope.photoData = photoData;  
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
    })
    .config(function($mdThemingProvider) {
        // Configure a dark theme with primary foreground yellow
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('light-green')
            .dark();
    });
