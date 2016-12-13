(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl',  StartPageCtrl);
    function StartPageCtrl($rootScope, $scope, $state, $mdDialog, $http,$localStorage, CompanyDataService,
                           PortfolioDataService) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
        vm.corps = [];
        vm.communityTopRatedCorps = [];
        vm.environmentTopRatedCorps = [];
        vm.employeesTopRatedCorps = [];
        vm.governanceTopRatedCorps = [];

        PortfolioDataService.getPortfolio().then(function(response){

            vm.porfolioCorps = response.data.results;


        }, function (err) {
            console.log(err);
        });

        // pulling company data
        CompanyDataService.getAll().then(function (response) {
            vm.corps = response.data.results;
            vm.corps = vm.corps.slice(0, 20);
            console.log(vm.corps);
            for (var i = 0; i < vm.corps.length; i++) {
                vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                vm.corps[i].overalColor = getMarkColor(getGradeFromPercent(vm.corps[i].overall));
                vm.corps[i].personalColor = getMarkColor(getGradeFromPercent(vm.corps[i].overall));
                vm.corps[i]['overall_rating'] = getGradeFromPercent(vm.corps[i].overall);
                vm.corps[i]['imgUrl'] = '/images/round-no-image.png';
                if (vm.corps[i].logo){
                    vm.corps[i]['imgUrl'] =  vm.corps[i].logo+'?size=80';
                }
                vm.corps[i]['disabled'] = checkIfAddedToCorp(vm.corps[i], vm.porfolioCorps);
                }

            // sorting and making top rated rows
            var community = vm.corps.slice();
            vm.communityTopRatedCorps = community.sortBy('community');


            var employeesTopRatedCorps = vm.corps.slice();
            vm.employeesTopRatedCorps = employeesTopRatedCorps.sortBy('employees');

            var environmentTopRatedCorps = vm.corps.slice();
            vm.environmentTopRatedCorps = environmentTopRatedCorps.sortBy('environment');

            var governanceTopRatedCorps = vm.corps.slice();
            vm.governanceTopRatedCorps = governanceTopRatedCorps.sortBy('governance');
            }, function (err) {
                console.log(err);
        });


        vm.removeFromPorfolio = function removeFromPorfolio(company) {
            var portfolio_id = get_portfolio_id(company);
            if (portfolio_id > 0) {
                PortfolioDataService.removePortfolio(portfolio_id).then(function (response) {

                }, function (err) {
                    console.log(err);
                });
            }

        }


        function get_portfolio_id(company) {
            for (var i = 0; i < vm.porfolioCorps.length; i++) {
                if (vm.porfolioCorps[i].company == company.company_id) {
                    var idx = getIndexIfObjWithOwnAttr(vm.corps, 'company_id', vm.porfolioCorps[i].company);
                    vm.corps[idx].disabled = false;
                    return vm.porfolioCorps[i].id;
                }
            }
            return -1;
        }

       // vm.community.sortBy('community');

        function getIndexIfObjWithOwnAttr(array, attr, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
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

         function getMarkColor(mark) {
            if (mark) {
                var mark = mark.charAt(0).toLowerCase();
                return mark + '-color';
            }
        }

        function getPercentColor(percent) {
            if (percent) {
                var symbol = percent.charAt(0);
                return symbol === '+';
            }
        }

        function getGradeFromPercent(percent) {
            var grade = "";
            switch(true) {
                case percent >= 80:
                    grade = 'A+';
                    break;
                case percent < 80 && percent >=70:
                    grade = "A";
                    break;
                case percent < 70 && percent >=60:
                    grade = "A-";
                    break;
                case percent < 60 && percent >=56:
                    grade = "B+";
                    break;
                case percent < 56 && percent >=53:
                    grade = "B";
                    break;
                case percent < 53 && percent >=50:
                    grade = "B-";
                    break;
                case percent < 50 && percent >=46:
                    grade = "C+";
                    break;
                case percent < 46 && percent >=43:
                    grade = "C";
                    break;
                case percent < 43 && percent >=40:
                    grade = "C-";
                    break;
                case percent < 40 && percent >=36:
                    grade = "D";
                    break;
                case percent < 36 && percent >=33:
                    grade = "D+";
                    break;
                case percent < 33 && percent >=30:
                    grade = "D-";
                    break;
                case percent < 30 :
                    grade = "F";
                    break;
                default:
                    grade = "NR";
                    break;

            }
            return grade;

        }

        function checkIfAddedToCorp(corp, portfolioCorps) {
            for(var i=0; i < portfolioCorps.length; i++){
                if (portfolioCorps[i].company == corp.company_id){
                    return true;
                }
            }
            return false;
        }
        vm.openCompanyPage = function openCompanyPage(company) {
            if (company) {
                console.log(company);
                $rootScope.selectedCompany = company.company_id;
                // $rootScope.$emit("changedSearch", company.index);
                $state.go('Main.Portfolio');
            }

        }
        $scope.addToPorfolio = function addToPorfolio(company){

            PortfolioDataService.addCompany(company.company_id, 7).then(function (response) {
                    company['disabled'] = true;

            }, function (err) {
                console.log(err);
            });

        }
    }
})();

//Map implementation for older browsers
[].map||(Array.prototype.map=function(a){for(var b=this,c=b.length,d=[],e=0,f;e<b;)d[e]=e in b?a.call(arguments[1],b[e],e++,b):f;return d})

!function() {
    function _dynamicSortMultiple(attr) {
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while(result === 0 && i < numberOfProperties) {
                result = _dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }
    function _dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1, property.length - 1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    Array.prototype.sortBy = function() {
        return this.sort(_dynamicSortMultiple.apply(null, arguments));
    }
}();