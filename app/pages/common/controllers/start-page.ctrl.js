(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl', StartPageCtrl);

    function StartPageCtrl($scope) {
        var vm = this;
        console.log('StartPageCtrl');
    }
})();
