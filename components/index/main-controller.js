angular.module('MainController', [
        'MainService',
        'MainDirective',
    ])
    .controller('MainCtrl', function($scope, $http, Main, $mdDialog, $mdMedia) {

    	//Declating my variables
        var self = this;
        self.fabIsOpen = false;
        self.subheaderStatus = true;
        self.limitImages = 20;
        const NASA_USER_ID = "24662369@N07";

        //Main GET. (main-service.js)
        Main.get(NASA_USER_ID)
            .success(function(data) {
                self.imageResults = data.photos.photo;
            }).error(function(data) {
                console.log(data);
            });

        //Dialog for when a user clicks on the "About" button
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

        //Function for when a user wishes to see more than 20 images.
        self.loadMore = function() {
            self.limitImages += 20;
        };

        //Dialog for when a user clicks on an image to see a larger version
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

        //Controller for self.showLargerImage
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
    	//Theme for input fields in the subheader section.
        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('light-green')
            .dark();
    });
