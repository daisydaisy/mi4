(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog) {
        var vm = this;
        vm.selectedTab = 0;
        vm.countOfTabs = 4;
        vm.disabledTabs = [false];

        for (i = 1; i < vm.countOfTabs; i++) {
            vm.disabledTabs.push(true);
        }

        $scope.$watch('vm.selectedTab', function() {
            
        });
    }
})();
