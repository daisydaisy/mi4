(function () {
    'use strict';

    angular.module('portfolio')
        .directive('bbPortfolioCorpCard', bbPortfolioCorpCard);

    function bbPortfolioCorpCard() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/portfolio/templates/portfolio-corp-card.tpl.html',
            replace: true,
            scope: {
                corpList: '='
            }
        };
    }
})();