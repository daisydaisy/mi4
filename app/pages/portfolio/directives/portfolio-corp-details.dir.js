(function () {
    'use strict';

    angular.module('portfolio')
        .directive('bbPortfolioCorpDetails', bbPortfolioCorpDetails);

    function bbPortfolioCorpDetails() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/portfolio/templates/portfolio-corp-details.tpl.html',
            replace: true
        };
    }
})();