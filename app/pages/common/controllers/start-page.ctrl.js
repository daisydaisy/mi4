(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl',  StartPageCtrl);

    function StartPageCtrl($rootScope, $scope, $mdDialog, $http, CompanyDataService) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
        vm.corps = [];
        // Restangular.all('http://68.171.153.8/api-token-auth/').post("", {'username':'my4', 'password':'flexipassword'});
        // $http.post('http://68.171.153.8/api-token-auth/', {'username':'my4', 'password':'flexipassword'}, {'method':'POST', 'headers':{'Content-Type':'application/json'}} ).then(function(response){
        //
        //     $http.defaults.headers.common['Authorization'] = 'Token ' + response.data['token'];
        CompanyDataService.getAll().then(function (response) {
                vm.corps = response.data;
                for (var i = 0; i < vm.corps.length; i++) {
                    vm.corps[i].percentColor = getPercentColor(vm.corps[i].percent);
                    vm.corps[i].overalColor = getMarkColor(vm.corps[i].overalMark);
                    vm.corps[i].personalColor = getMarkColor(vm.corps[i].personalMark);
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
