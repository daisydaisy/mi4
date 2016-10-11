(function () {
    'use strict';

    angular.module('portfolio')
        .directive('bbPortfolioCorpRating', bbPortfolioCorpRating);

    function bbPortfolioCorpRating() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/portfolio/templates/portfolio-corp-rating.tpl.html',
            replace: true
        };
    }
})();