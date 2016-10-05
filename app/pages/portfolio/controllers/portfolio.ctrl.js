(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $mdSidenav) {
        var vm = this;
        vm.isSideNavOpen= false;
        vm.toggleLeft = buildToggler('left');
        vm.showInfo = showInfo;
        console.log(window);
        var windowHeight = window.innerHeight - 80;
        var result = angular.element(document.getElementsByClassName("md-sidenav-left"))[0];
        result.style.height = windowHeight + 'px';

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
        function showInfo(index) {

        }
    }
})();
