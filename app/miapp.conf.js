(function () {
    'use strict';

    angular.module('miApp')
        .config(miAppConfig);

    function miAppConfig($stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('Main', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: 'app/pages/common/templates/main-header.tpl.html'
                    },
                    '': {
                        template: '<ui-view layout="column"/>'
                    },
                    footer: {
                        templateUrl: 'app/pages/common/templates/main-footer.tpl.html'
                    }
                }
            })
            .state('Main.Home', {
                url: '/',
                templateUrl: 'app/pages/common/templates/start-page.tpl.html',
                controller: 'StartPageCtrl',
                controllerAs: 'vm'
            });
    }
})();
