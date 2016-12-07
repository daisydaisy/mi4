(function () {
    'use strict';

    angular.module('miApp')
        .config(miAppConfig);

    function miAppConfig($stateProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('myInterceptor');
        $stateProvider
            .state('Main', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: 'app/pages/common/templates/main-header.tpl.html',
                        controller: 'HeaderCtrl',
                        controllerAs: 'vm'
                    },
                    '': {
                        template: '<ui-view layout="column"/>'
                    },
                    footer: {
                        templateUrl: 'app/pages/common/templates/main-footer.tpl.html'
                    }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('Main.Home', {
                url: '/',
                templateUrl: 'app/pages/common/templates/start-page.tpl.html',
                controller: 'StartPageCtrl',
                controllerAs: 'vm'
            })
            .state('Login', {
                url: '/login',
                templateUrl: 'app/pages/common/templates/login.tpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'lg',
                data: {
                    requireLogin: false
                }
            });


    }
    angular.module('miApp')
        .run(function ($rootScope, $state, $location, $localStorage, AuthenticationService) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                console.log(toState);
                var requireLogin = toState.data.requireLogin;
                console.log($localStorage.token);
                if (requireLogin && ($localStorage.token === undefined)) {
                    event.preventDefault();
                    $state.go("Login");
                }
                if (!requireLogin && ($localStorage.token !== undefined)){
                    event.preventDefault();
                    $state.go("Main.Home");
                }
                // AuthenticationService.login($localStorage.username, $localStorage.password).then(function (data) {
                //     if (data.data.token !== $localStorage.token) {
                //         console.log("token has expired");
                //     }
                // });

                // $localStorage.$reset(); //logout with this


                console.log("im running");
            });
        });
})();
