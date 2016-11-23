(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl',  StartPageCtrl);
    function StartPageCtrl($rootScope, $scope, $mdDialog, $http,$localStorage, CompanyDataService, PortfolioDataService) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
        vm.corps = [];

        // pulling company data
        if ($localStorage.corps === undefined || $localStorage.corps.length === 0) {
            CompanyDataService.getAll().then(function (response) {
                vm.corps = response.data.results;
                vm.corps = vm.corps.slice(0, 20);
                console.log(vm.corps);
                for (var i = 0; i < vm.corps.length; i++) {
                    vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                    vm.corps[i].overalColor = getMarkColor(vm.corps[i].ratings);
                    vm.corps[i].personalColor = getMarkColor(vm.corps[i].overall);
                    vm.corps[i]['imgUrl'] = '/images/round-no-image.png';
                }
            }, function (err) {
                console.log(err);
            });
        }
        else{
            vm.corps = $localStorage.corps;
            vm.corps = vm.corps.slice(0, 20);
            console.log(vm.corps);
            for (var i = 0; i < vm.corps.length; i++) {
                vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                vm.corps[i].overalColor = getMarkColor(vm.corps[i].ratings);
                vm.corps[i].personalColor = getMarkColor(vm.corps[i].overall);
                vm.corps[i]['imgUrl'] = '/images/round-no-image.png';
            }

        }
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
            if (mark) {
                var mark = mark.charAt(0).toLowerCase();
                return mark + '-color';
            }
        }

        function getPercentColor(percent) {
            if (percent) {
                var symbol = percent.charAt(0);
                return symbol === '+';
            }
        }

        $scope.addToPorfolio = function addToPorfolio(company){

            PortfolioDataService.addCompany(company.company_id, 7).then(function (response) {


            }, function (err) {
                console.log(err);
            });

        }
    }
})();
