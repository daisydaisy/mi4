(function () {
    'use strict';


    angular.module('miApp').service('PortfolioDataService', function ($http, $q, $localStorage) {
        return {
            addCompany: function (company, username) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/portfolio/', {'company':company, 'username':username})
                    .success(function (data) {
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
                return deferred.promise;
            } ,
            getPortfolio: function () {
                var deferred = $q.defer();
                $http.get('http://68.171.153.8/api/my4app/portfolio/')
                    .success(function (data) {
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                    deferred.reject(msg);
                    $log.error(msg, code);
                });
                return deferred.promise;
            },
            removePortfolio: function (portfolio_id) {
                var deferred = $q.defer();
                $http.delete('http://68.171.153.8/api/my4app/portfolio/'+ portfolio_id +'/')
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
