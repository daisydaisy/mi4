(function () {
    'use strict';

    angular.module('portfolio')
        .config(portfolioConfig);

    function portfolioConfig($stateProvider) {
        $stateProvider
            .state('Main.Portfolio', {
                url: '/portfolio',
                templateUrl: 'app/pages/portfolio/templates/portfolio.tpl.html',
                controller: 'PortfolioCtrl',
                controllerAs: 'vm'
            });
    }
})();
