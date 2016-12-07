(function () {
    'use strict';

    angular.module('miApp')
        .controller('LoginCtrl', LoginCtrl);
    function LoginCtrl($rootScope, $scope, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var lg = this;
        $scope.loading = false;

        lg.submit = function () {
            $scope.loading = true;
            console.log($scope.loading);
            AuthenticationService.login($scope.username, $scope.password).then(function (data) {
                if (data.hasOwnProperty('token')) {
                    $localStorage.username = $scope.username;
                    $localStorage.password = $scope.password;
                    $localStorage.token = data.data.token;
                    $state.go("Main.Home");
                } else {
                    console.log("Invalid baby!", data);
                    $scope.loading = false;
                }

            });
        }

    }
})();