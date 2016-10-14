(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl', StartPageCtrl);

    function StartPageCtrl($scope, $mdDialog, $http) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
        vm.corps = [];

        $http.get('/json/corps.json').then(function (response) {
            vm.corps = response.data;
            for (var i = 0; i < vm.corps.length; i++) {
                vm.corps[i].overalColor = getMarkColor(vm.corps[i].overalMark);
                vm.corps[i].personalColor = getMarkColor(vm.corps[i].personalMark);
            }
        }, function (err) {
            console.log(err);
        });

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
    }
})();
