(function () {
    'use strict';

    angular.module('miApp')
        .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl($scope, $timeout, $q) {
        var vm = this;
        vm.simulateQuery = false;
        vm.isDisabled = false;

        vm.companies = loadAll();
        vm.querySearch = querySearch;

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

            return allCompanies.map(function (company) {
                return {
                    value: company.toLowerCase(),
                    display: company
                };
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(company) {
                return (company.value.indexOf(lowercaseQuery) === 0);
            };

        }
    }
})();