(function () {
    'use strict';

    angular.module('portfolio')
        .directive('bbPortfolioCorpFinance', bbPortfolioCorpFinance);

    function bbPortfolioCorpFinance() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/portfolio/templates/portfolio-corp-finance.tpl.html',
            replace: true
        };
    }
})();