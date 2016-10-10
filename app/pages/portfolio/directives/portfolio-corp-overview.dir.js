(function () {
    'use strict';

    angular.module('portfolio')
        .directive('bbPortfolioCorpOverview', bbPortfolioCorpOverview);

    function bbPortfolioCorpOverview() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/portfolio/templates/portfolio-corp-overview.tpl.html',
            replace: true
        };
    }
})();