(function () {
    'use strict';

    angular.module('miApp')
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);
    function ForgotPasswordCtrl($rootScope, $scope, $mdToast, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var fp = this;
        $scope.message = "Please enter your email to start the process of resetting password.";
        $scope.loading = false;
        $scope.submitable = true;

        fp.submit = function () {
            $scope.loading = true;
            AuthenticationService.forgotPassword($scope.email).then(function (data) {
                console.log(data);
                if ((typeof data.data.non_field_errors != "undefined") && (data.data.non_field_errors["0"] == "this email doesnot exists in the system")) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There is no account associated with provided email.')
                            .hideDelay(3000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                } else {
                    $scope.message = "Please follow the instructions sent on the email entered below.";
                    $scope.submitable = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Email sent to the aforementioned Email address.')
                            .hideDelay(2000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                }
                $scope.loading = false;
            });
        }

    }
})();