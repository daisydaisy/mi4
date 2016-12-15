(function () {
    'use strict';

    angular.module('miApp')
        .controller('AccountCtrl', AccountCtrl);
    function AccountCtrl($rootScope, $scope, $mdToast, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var ac = this;
        $scope.loading = false;
        $scope.fname = $localStorage.firstName;
        $scope.lname = $localStorage.lastName;
        $scope.email = $localStorage.email;
        $scope.password = "defaultPass";
        $scope.cpassword = "defaultPass";
        ac.resetError = function (form) {
            form.email.$setValidity('exist', true);
        }
        ac.submit = function (form) {
            $scope.loading = true;
            console.log($scope.loading);
            AuthenticationService.updateUser($scope.fname, $scope.lname, $scope.email, $scope.password).then(function (data) {
                console.log("controller function", data);
                if (typeof data.data.email[0] != "undefined" && data.data.email[0] == "This field must be unique.") {
                    console.log("existing email!", form);
                    form.email.$setValidity('exist', false);
                } else if (data.data.email === $scope.email) {
                    AuthenticationService.getCurrentUser().then(function (data) {
                        console.log("inside login ctrl:", data);
                        $localStorage.email = data.data.results[0].email;
                        $localStorage.firstName = data.data.results[0].first_name;
                        $localStorage.lastName = data.data.results[0].last_name;
                    });
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Account details updated!')
                            .hideDelay(1000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                }
            });
            $scope.loading = false;
        }


    }
})();