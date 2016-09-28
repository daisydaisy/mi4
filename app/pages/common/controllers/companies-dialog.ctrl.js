(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog) {
        var vm = this;
        vm.selectedTab = 0;
    }
})();
