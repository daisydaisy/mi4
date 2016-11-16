(function () {
    'use strict';

    angular.module('miApp')
        .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl($scope, $state, $timeout, $q, $http, $rootScope, $localStorage, CompanyDataService) {
        var vm = this;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        var selectedCompany = 0;
        vm.goHome = goHome;
        vm.companies = [];
        vm.querySearch = querySearch;
        vm.corps = [];
        $localStorage.corps = undefined;
        vm.openCompanyPage = openCompanyPage;

        CompanyDataService.getAll().then(function (response) {
            console.log(response);
            vm.corps = response.data.results;
            $localStorage.corps = vm.corps;
            vm.companies = loadAll();
        }, function (err) {
            console.log(err);
        });

        function querySearch(query) {
            var results = query ? vm.companies.filter(createFilterFor(query)) : vm.companies,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function loadAll() {
            var allCompanies = [
                'Apple',
                'Hewlett-Packard Company',
                'IBM',
                'Amazon',
                'Microsoft',
                'Google',
                'Intel',
                'Cisco Systems',
                'Oracle',
                'Qualcomm',
                'EMC',
                'Xerox',
                'Danaher',
                'eBay'
            ];

            return vm.corps.map(function (company, index) {
                return {
                    value: company.name.toLowerCase(),
                    display: company.name,
                    index: index
                };
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(company) {
                return (company.value.indexOf(lowercaseQuery) === 0);
            };

        }
        function openCompanyPage(company) {
            if (company) {
                $rootScope.selectedCompany = company.index;
                $rootScope.$emit("changedSearch", company.index);
                $state.go('Main.Portfolio');
            }
            
        }

        function goHome() {
            $state.go('Main.Home');
        }
    }
})();