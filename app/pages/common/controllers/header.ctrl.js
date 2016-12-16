(function () {
    'use strict';

    angular.module('miApp')
        .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl($scope,$mdDialog, $state, $timeout, $q, $http, $rootScope, $localStorage, CompanyDataService) {
        var vm = this;
        vm.simulateQuery = false;
        vm.showTabDialog = showTabDialog;
        vm.isDisabled = false;
        var selectedCompany = 0;
        vm.goHome = goHome;

        vm.companies = [];
        vm.querySearch = querySearch;
        vm.corps = [];

        $localStorage.corps = ('corps' in $localStorage)? $localStorage.corps: undefined;
        vm.openCompanyPage = openCompanyPage;

        CompanyDataService.getAll().then(function (response) {

                vm.corps = response.data.results;
                $localStorage.corps = vm.corps;
                vm.companies = loadAll();
            }, function (err) {
                console.log(err);
            });

        vm.logout = function(){
            delete $localStorage.token;
            delete $localStorage.id;
            delete $localStorage.email;
            delete $localStorage.firstName;
            delete $localStorage.lastName;
            $state.go("Basic.Login");
        }

        vm.search = function search(queryString) {
            CompanyDataService.search(queryString).then(function (response) {
                vm.corps = [];
                vm.corps.push.apply(vm.corps, response.data.results);
                // $localStorage.corps = vm.corps;
                vm.companies = loadAll();
            }, function (err) {
                console.log(err);
            });
        }
        function querySearch(query) {
            var results = query ? vm.companies.filter(createFilterFor(query)) : vm.companies,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 100, false);
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
                    company: company,
                    value: company.name.toLowerCase(),
                    display: company.name,
                    company_id : company.company_id,
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
                console.log('header', company);
                $rootScope.selectedCompany = company;
                $rootScope.$emit("changedSearch", company.index, company);
                $state.go('Main.Portfolio');
            }
            
        }

        function goHome() {
            $state.go('Main.Home');
        }
        function showTabDialog(ev) {
            $mdDialog.show({
                controller: 'CompaniesDialogCtrl',
                controllerAs: 'vm',
                disableParentScroll: true,
                templateUrl: 'app/pages/common/templates/companies-dialog.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (data) {
                console.log(data)
            }, function (canceled) {
                console.log('canceled')
            });
        }
    }
})();