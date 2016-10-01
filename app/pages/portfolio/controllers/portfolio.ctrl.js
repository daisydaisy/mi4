(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $mdSidenav) {
        var vm = this;
        vm.isSideNavOpen= false;
        vm.toggleLeft = buildToggler('left');

        function buildToggler(componentId) {
            return function () {
                vm.isSideNavOpen=!vm.isSideNavOpen;
                $mdSidenav(componentId).toggle();
            }
        }
    }
})();
