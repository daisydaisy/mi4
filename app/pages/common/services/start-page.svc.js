(function () {
    'use strict';

    angular.module('miApp').service('AuthenticationService', function ($rootScope, $http, $q, $localStorage) {
        return {
            getToken: function () {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api-token-auth/', { 'username': 'my4', 'password': 'flexipassword' }, { 'method': 'POST', 'headers': { 'Content-Type': 'application/json' } })
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
            createUser: function (fName, lName, email, password) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/accounts/create/', { 'first_name': fName, 'last_name': lName, 'email': email, 'password': password }, { 'method': 'POST', 'headers': { 'Content-Type': 'application/json' } })
                    .success(function (data) {
                        console.log("create User service", data);
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            },
            forgotPassword: function (mail) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/user/forgot_password/', { 'email': mail }, { 'method': 'POST', 'headers': { 'Content-Type': 'application/json' } })
                    .success(function (data) {
                        console.log("create User service", data);
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            },
            resetPassword: function (password, token) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/user/reset_password/', { 'token':token, "password":password }, { 'method': 'POST', 'headers': { 'Content-Type': 'application/json' } })
                    .success(function (data) {
                        console.log("create User service", data);
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            },
            updateUser: function (fName, lName, email, password) {
                console.log(password);
                
                var userInfo = {'first_name': fName, 'last_name': lName, 'email': email};
                if(password != "defaultPass"){
                    userInfo.password = password;
                    console.log("userinfo", userInfo);
                }
                var deferred = $q.defer();
                $http.patch('http://68.171.153.8/api/my4app/accounts/create/'+$localStorage.id+'/', userInfo, { 'method': 'PATCH', 'headers': { 'Content-Type': 'application/json' } })
                    .success(function (data) {
                        console.log("Update User service", data);
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            },
            getCurrentUser: function () {
                var deferred = $q.defer();
                $http.get('http://68.171.153.8/api/my4app/accounts/create/')
                    .success(function (data) {
                        console.log("git current user", data);
                        deferred.resolve({
                            data: data,
                        });
                    }).error(function (msg, code) {
                        deferred.reject(msg);
                        $log.error(msg, code);
                    });
                return deferred.promise;
            },
            login: function (email, password) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/user/login/', { 'email': email, 'password': password }, { 'method': 'POST', 'headers': { 'Content-Type': 'application/json' } })
                    .success(function (data) {
                        deferred.resolve({
                            data: data,
                        })
                        console.log("inside success", data);
                    }).error(function (data) {
                        console.log("inside error", data);
                        deferred.resolve({
                            data: "invalid credentials",
                        });
                    });
                return deferred.promise;
            },
        }

    });

    angular.module('miApp').factory('myInterceptor', ['$q', '$injector', function ($q, $injector) {
        // var service = this;
        // console.log('aya ha g');
        return {
            request: function (config) {
                if (!$injector.get('$localStorage').hasOwnProperty('token')) {
                    if (config.url.indexOf('http://68.171.153.8/api-token-auth/') === -1) {
                        return $injector.get('AuthenticationService').getToken().then(function (response) {
                            // $injector.get('AuthenticationService').login().then(function(response){
                            //     $localStorage.user = response;
                            // });
                            config.headers.authorization = 'Token ' + response.data.token;
                            return config;
                        }).then(function () {

                            return config; // <-- token is refreshed, reissue original request
                        });
                    }
                }
                else {
                    config.headers.authorization = 'Token ' + $injector.get('$localStorage').token;
                }
                return config;
            }
            ,
            responseError: function (response) {
                // console.log('aya ha g');
                return response;
            }
        };




    }]);

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
            },
            search: function (searchString) {
                var deferred = $q.defer();
                $http.get('http://68.171.153.8/api/my4app/company/?company=' + searchString)
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
            getValues: function () {
                var deferred = $q.defer();
                $http.get('http://68.171.153.8/api/my4app/user/values/')
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
            putValues: function (values) {
                var deferred = $q.defer();
                $http.put('http://68.171.153.8/api/my4app/user/values/' + values.id + '/', values)
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
            createValues: function (values) {
                var deferred = $q.defer();
                $http.post('http://68.171.153.8/api/my4app/user/values/', values)
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
