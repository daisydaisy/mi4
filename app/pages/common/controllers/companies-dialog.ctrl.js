(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog) {
        var vm = this;
        vm.selectedTab = 0;
        vm.selecNextTab = selecNextTab;
        vm.countOfTabs = 4;
        vm.disabledTabs = [false];

        for (var i = 1; i < vm.countOfTabs; i++) {
            vm.disabledTabs.push(true);
        }

        $scope.$watch('vm.selectedTab', function() {
               
        });

        function selecNextTab(tab) {
            if (!tab) {
                $mdDialog.hide('done');
            }

            vm.disabledTabs[tab] = false;
            vm.selectedTab = tab;
        }
    }
})();
