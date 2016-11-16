(function () {
    'use strict';

    angular.module('miApp').service('AuthenticationService', function ($rootScope, $http, $q) {
        return {
            getToken: function () {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api-token-auth/', {'username':'my4', 'password':'flexipassword'}, {'method':'POST', 'headers':{'Content-Type':'application/json'}})
                    .success(function (data) {
                        deferred.resolve({
                            data: data,

                        });
                    }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
                return deferred.promise;
            }
        }

    });

    angular.module('miApp').factory('myInterceptor', ['$q', '$injector', function($q, $injector) {
        var service = this;
        console.log('aya ha g');
            return {
                request: function (config) {
                    if (config.url.indexOf('http://68.171.153.8/api-token-auth/') === -1) {
                        return $injector.get('AuthenticationService').getToken().then(function (response) {


                            // $cookies.put('access_token', response.token);
                            // $cookies.put('refresh_token', response.data.refreshToken.value);
                            console.log(response);
                            config.headers.authorization = 'Token ' + response.data.token;
                            return config;
                        }).then(function () {

                            return config; // <-- token is refreshed, reissue original request
                        });
                    }
                    return config;
                }
         };

        return {
            responseError: function (response) {
                console.log('aya ha g');
                return response;
            }
        };


    }]);
    //
    // angular.module('miApp').service('APIInterceptor', function($rootScope,$injector) {
    //     var service = this;
    //     service.request = function(config) {
    //         // var deferred = $q.defer();
    //         var $http = $injector.get('$http');
    //         $http.post('http://68.171.153.8/api-token-auth/', {'username':'my4', 'password':'flexipassword'}, {'method':'POST', 'headers':{'Content-Type':'application/json'}})
    //             .then(function (data) {// token =  ;
    //                 if (data.token) {
    //                     config.headers.authorization = 'Token' + token;
    //                 }
    //
    //             });
    //         // return deferred.promise;
    //
    //
    //         return config;
    //     };
    //     service.responseError = function(response) {
    //         if (response.status === 401) {
    //             $rootScope.$broadcast('unauthorized');
    //         }
    //         return response;
    //     };
    //
    //     return
    // }).config(function($httpProvider) {
    //     $httpProvider.interceptors.push('APIInterceptor');
    // })

    //     .config(['$httpProvider', function ($httpProvider) {
    //     // $httpProvider.defaults.useXDomain = true;
    //     // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //     $httpProvider.interceptors.push('APIInterceptor');
    //
    // }]);




    angular.module('miApp').service('CompanyDataService', function ($http, $q) {
        return {
            getAll: function () {
                var deferred = $q.defer();
                $http.get('http://68.171.153.8/api/my4app/company/all/')
                    .success(function (data) {
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
                return deferred.promise;
            }
        }

    });


})();
