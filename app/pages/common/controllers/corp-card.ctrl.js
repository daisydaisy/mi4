(function () {
    'use strict';

    angular.module('miApp')
        .controller('CorpCardCtrl', CorpCardCtrl);

    function CorpCardCtrl($scope) {
        var vm = this;
        vm.isPositive = isPositive;
        vm.markColor = markColor;

        function isPositive() {
            return 'negative';
        }

        function markColor() {
            return 'excellent';
        }
    }
})();
