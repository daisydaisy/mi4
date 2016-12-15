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
                        template: '<ui-view layout="column" flex layout-fill/>'
                    },
                    footer: {
                        // templateUrl: 'app/pages/common/templates/main-footer.tpl.html'
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
            .state('Main.Account', {
                url: '/account',
                templateUrl: 'app/pages/common/templates/account.tpl.html',
                controller: 'AccountCtrl',
                controllerAs: 'ac',
                data: {
                    requireLogin: true
                }
            })
            .state('Basic', {
                abstract: true,
                views: {
                    header: {
                        templateUrl: 'app/pages/common/templates/basic-header.tpl.html',
                    },
                    '': {
                        template: '<ui-view layout="row" layout-align="center" flex id="card-content"/>'
                    },
                    footer: {
                        // templateUrl: 'app/pages/common/templates/basic-footer.tpl.html'
                    }
                },
                data: {
                    requireLogin: false
                }
            })
            .state('Basic.ForgotPassword', {
                url: '/forgotpassword',
                templateUrl: 'app/pages/common/templates/forgot-password.tpl.html',
                controller: 'ForgotPasswordCtrl',
                controllerAs: 'fp',
                data: {
                    requireLogin: false
                }
            })
            .state('Basic.ResetPassword', {
                url: '/resetpassword?token',
                templateUrl: 'app/pages/common/templates/reset-password.tpl.html',
                controller: 'ResetPasswordCtrl',
                controllerAs: 'rp',
                data: {
                    requireLogin: false
                }
            })
            .state('Basic.Login', {
                url: '/login',
                templateUrl: 'app/pages/common/templates/login.tpl.html',
                controller: 'LoginCtrl',
                controllerAs: 'lg',
                data: {
                    requireLogin: false
                }
            })
            .state('Basic.Register', {
                url: '/register',
                templateUrl: 'app/pages/common/templates/register.tpl.html',
                controller: 'RegisterCtrl',
                controllerAs: 're',
                data: {
                    requireLogin: false
                }
            });


    }
    angular.module('miApp')
        .run(function ($rootScope, $state, $location, $localStorage, AuthenticationService) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                
                $rootScope.stateIsLoading = true;
                var requireLogin = toState.data.requireLogin;
                // console.log($localStorage.token);
                if (requireLogin && ($localStorage.token === undefined)) {
                    event.preventDefault();
                    $state.go("Basic.Login");
                }
                if (!requireLogin && ($localStorage.token !== undefined)) {
                    event.preventDefault();
                    $state.go("Main.Home");
                }
                // AuthenticationService.login($localStorage.username, $localStorage.password).then(function (data) {
                //     if (data.data.token !== $localStorage.token) {
                //         console.log("token has expired");
                //     }
                // });

                // $localStorage.$reset(); //logout with this


                // console.log("im running");
            });


            $rootScope.$on('$stateChangeSuccess', function () {
                $rootScope.stateIsLoading = false;
            });
        });
})();
