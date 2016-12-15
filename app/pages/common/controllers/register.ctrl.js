(function () {
    'use strict';

    angular.module('miApp')
        .controller('RegisterCtrl', RegisterCtrl);
    function RegisterCtrl($rootScope, $scope, $mdToast, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var re = this;
        $scope.loading = false;
        re.resetError = function (form) {
            form.email.$setValidity('exist', true);
        }
        re.submit = function (form) {
            $scope.loading = true;
            console.log($scope.loading);
            AuthenticationService.createUser($scope.fname, $scope.lname, $scope.email, $scope.password).then(function (data) {
                console.log("controller function", data);
                if (typeof data.data.email[0] != "undefined" && data.data.email[0] == "This field must be unique.") {
                    console.log("existing email!", form);
                    form.email.$setValidity('exist', false);
                } else if (data.data.email === $scope.email) {
                    AuthenticationService.login($scope.email, $scope.password).then(function (data) {
                        if (data.data.hasOwnProperty("token")) {
                            $localStorage.token = data.data.token;
                            AuthenticationService.getCurrentUser().then(function (data) {
                                console.log("inside register ctrl:", data);
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

            });
            $scope.loading = false;
        }


    }
})();