(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog, $http) {
        var vm = this;
        vm.selectedTab = 0;
        vm.questions = [];
        vm.selectNextTab = selectNextTab;
        vm.countOfTabs = 0;
        vm.disabledTabs = [false];

        $http.get('/json/questions.json').then(function(response) {
            vm.questions = response.data;
            vm.countOfTabs = vm.questions.length;

            for (var i = 1; i < vm.countOfTabs; i++) {
                vm.disabledTabs.push(true);
            }
        }, function(err) {
            console.log(err);
        });

        $scope.$watch('vm.selectedTab', function() {
        });

        function selectNextTab(tab) {
            if (!tab || tab === vm.countOfTabs) {
                $mdDialog.hide('done');
            }

            vm.disabledTabs[tab] = false;
            vm.selectedTab = tab;
        }
    }
})();
