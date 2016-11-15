(function () {
    'use strict';

    angular.module('miApp').factory('APIInterceptor', function($rootScope, AuthenticationService) {
        var service = this;
        service.request = function(config) {
            token = AuthenticationService.getToken();
            if (token) {
                config.headers.authorization = 'Token' + token;
            }
            return config;
        };
        service.responseError = function(response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return response;
        };
    }).config(['$httpProvider', function ($httpProvider) {
        // $httpProvider.defaults.useXDomain = true;
        // delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.interceptors.push('APIInterceptor');

    }]);


    angular.module('miApp').factory('AuthenticationService', function ($rootScope, $http, $q) {
        return {
            getToken: function () {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api-token-auth/', {'username':'my4', 'password':'flexipassword'}, {'method':'POST', 'headers':{'Content-Type':'application/json'}})
                    .success(function (data) {
                        deferred.resolve({
                            title: data.token,

                        });
                    }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
                return deferred.promise;
            }
        }

    });


    angular.module('miApp').factory('CompanyDataService', function ($http, $q) {
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
