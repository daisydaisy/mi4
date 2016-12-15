(function () {
    'use strict';

    angular.module('miApp')
        .controller('LoginCtrl', LoginCtrl);
    function LoginCtrl($rootScope, $scope, $mdToast, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var lg = this;
        $scope.loading = false;

        lg.submit = function () {
            $scope.loading = true;
            console.log($scope.loading);
            AuthenticationService.login($scope.email, $scope.password).then(function (data) {
                if (data.data.hasOwnProperty("token")) {
                    $localStorage.token = data.data.token;
                    AuthenticationService.getCurrentUser().then(function (data) {
                        console.log("inside login ctrl:", data);
                        $localStorage.id = data.data.results[0].id;
                        $localStorage.email = data.data.results[0].email;
                        $localStorage.firstName = data.data.results[0].first_name;
                        $localStorage.lastName = data.data.results[0].last_name;
                    });
                    $state.go("Main.Home");
                } else {
                    console.log("Invalid baby!", data);
                    $scope.loading = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Invalid Credentials!')
                            .hideDelay(1000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                }

            });
        }

    }
})();