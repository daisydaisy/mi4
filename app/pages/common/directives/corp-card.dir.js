(function () {
    'use strict';

    angular.module('miApp')
        .directive('bbCorpCard', bbCorpCard);

    function bbCorpCard() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/common/templates/corp-card.tpl.html',
            // controller: 'CorpCardCtrl',
            // controllerAs: 'vm',
            replace: true
        };
    }
})();