(function () {
    'use strict';

    angular.module('miApp')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);
    function ResetPasswordCtrl($rootScope, $scope, $stateParams, $mdToast, $mdDialog, $state, $http, $localStorage, $sessionStorage, AuthenticationService) {
        var rp = this;
        console.log("keepo", $stateParams);
        $scope.message = "Please enter the new password.";
        $scope.loading = false;
        $scope.submitable = true;

        rp.submit = function () {
            $scope.loading = true;
            AuthenticationService.resetPassword($scope.password, $stateParams.token).then(function (data) {
                console.log(data);
                if ((typeof data.data.non_field_errors != "undefined") && (data.data.non_field_errors[0] == "this token is expired")) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Link expired.')
                            .hideDelay(3000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                } else {
                    $scope.message = "Please follow the instructions sent on the email entered below.";
                    $scope.submitable = false;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Password Changed!')
                            .hideDelay(2000)
                            .parent("#card-content")
                            .position("bottom")
                    );
                    $state.go("Basic.Login");
                }
                $scope.loading = false;
            });
        }

    }
})();