(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $mdSidenav) {
        var vm = this;
        vm.isSideNavOpen= false;
        vm.toggleLeft = buildToggler('left');

        vm.corps = [
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            }
        ];

        function buildToggler(componentId) {
            return function () {
                vm.isSideNavOpen=!vm.isSideNavOpen;
                $mdSidenav(componentId).toggle();
            }
        }
    }
})();
