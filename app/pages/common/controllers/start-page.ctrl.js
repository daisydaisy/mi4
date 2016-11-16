(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl',  StartPageCtrl);
    function StartPageCtrl($rootScope, $scope, $mdDialog, $http, CompanyDataService) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
        vm.corps = [];
        // pulling company data
        CompanyDataService.getAll().then(function (response) {
                vm.corps = response.data.results;
                for (var i = 0; i < vm.corps.length; i++) {
                    vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                    vm.corps[i].overalColor = getMarkColor(vm.corps[i].ratings);
                    vm.corps[i].personalColor = getMarkColor(vm.corps[i].overall);
                }
            }, function (err) {
                console.log(err);
            });
        // });



        function showTabDialog(ev) {
            $mdDialog.show({
                controller: 'CompaniesDialogCtrl',
                controllerAs: 'vm',
                disableParentScroll: true,
                templateUrl: 'app/pages/common/templates/companies-dialog.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (data) {
                console.log(data)
            }, function (canceled) {
                console.log('canceled')
            });
        }

         function getMarkColor(mark) {
            var mark = mark.charAt(0).toLowerCase();
            return mark + '-color';
        }

        function getPercentColor(percent) {
            var symbol = percent.charAt(0);
            return symbol === '+';
        }
    }
})();
