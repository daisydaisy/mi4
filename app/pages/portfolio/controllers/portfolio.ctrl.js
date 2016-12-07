(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $http, $mdSidenav, $mdDialog, $timeout, $rootScope, $mdMedia, $localStorage, ChartJs,
        CompanyDataService, PortfolioDataService) {
        var vm = this;
        vm.currentCorp = {};
        var color = '#faf8f5';
        var currentIndex = $rootScope.selectedCompany || 0;
        vm.isSideNavOpen = true;
        var wentFromAnotherState = false;
        vm.baseurl = 'http://localhost:2020'
        ChartJs.Chart.defaults.global.defaultFontFamily = 'Open Sans';
        ChartJs.Chart.defaults.global.defaultFontSize = 11;
        vm.maxVisibleDescrLength = 800;
        vm.porfolioCorps = [];
        vm.corps_all = [];
        vm.corps = [];

        PortfolioDataService.getPortfolio().then(function (response) {

            vm.porfolioCorps = response.data.results;


        }, function (err) {
            console.log(err);
        });


        // if ($localStorage.corps === undefined) {
        CompanyDataService.getAll().then(function (response) {
            vm.corps_all = response.data.results;

            for (var i = 0; i < vm.porfolioCorps.length; i++) {
                var idx = getIndexIfObjWithOwnAttr(vm.corps_all, 'company_id', vm.porfolioCorps[i].company);
                if (idx > -1) {

                    vm.corps.push(setValues(vm.corps_all[idx]));

                }
            }
            if(currentIndex !== 0) {
                currentIndex = getIndexIfObjWithOwnAttr(vm.corps_all, 'company_id', currentIndex);
                console.log('curent', currentIndex);
                vm.corps_all[currentIndex].bgdColor = color;
                vm.currentCorp = vm.corps_all[currentIndex];
                vm.currentCorp['disabled'] = false;
            }
            vm.corps[currentIndex].bgdColor = color;
            vm.currentCorp = vm.corps[currentIndex];

        }, function (err) {
            console.log(err);
        });
        // }
        $scope.addToPorfolio = function addToPorfolio(company){

            PortfolioDataService.addCompany(company.company_id, 2).then(function (response) {
                currentIndex = getIndexIfObjWithOwnAttr(vm.corps_all, 'company_id', company.company_id);
                console.log('curent', currentIndex);
                vm.corps_all[currentIndex].bgdColor = color;
                vm.currentCorp = vm.corps_all[currentIndex];
                vm.corps.push(setValues(vm.currentCorp));
                vm.currentCorp['disabled'] = true;

            }, function (err) {
                console.log(err);
            });

        }
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
                    vm.corps.splice(idx, 1);
                    vm.currentCorp = vm.corps[0];
                    vm.currentCorp.bgdColor = color;
                    return vm.porfolioCorps[i].id;
                }
            }
            return -1;
        }
        vm.toggleLeft = buildToggler('left');
        vm.getCurrentImage = getCurrentImage;
        vm.showVideo = showVideo;
        vm.showInfo = showInfo;
        vm.chartLabels = ["", "Jun 2016", "Jul 2016", "Aug 2016", "Sept 2016", "Oct 2016"];
        vm.chartSeries = ['This company'];
        vm.chartData = [
            [56, 54, 52, 50, 47, 44]
        ];
        vm.datasetOverride = [{
            yAxisID: 'y-axis-1',
            xAxisID: 'x-axis-1',
            fill: false
        }];
        vm.chartOptions = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 100,
                            stepSize: 50
                        },
                        gridLines: {
                            display: true,
                            zeroLineWidth: 0.01,
                            drawTicks: false
                        }
                    }
                ],
                xAxes: [
                    {
                        id: 'x-axis-1',
                        display: true,
                        position: 'bottom',
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            zeroLineWidth: 0.01
                        }
                    }
                ]
            }
        };

        $rootScope.$on('changedSearch', function (event, value) {
            showInfo(value, true);
            console.log(value)
        });

        $rootScope.$watch($rootScope.selectedCompany, function (evebt, newValue, oldValue) {
            if (vm.corps) {
                showInfo(newValue, true);
            }
        });
        function setValues(obj) {
            obj.percentColor = getPercentColor(obj.transparency_reporting);
            // obj.overalColor = getMarkColor(obj.ratings);
            obj.overalColor = getMarkColor(getGradeFromPercent(obj.overall));
            obj.personalColor = getMarkColor(getGradeFromPercent(obj.overall));
            obj['overall_rating'] = getGradeFromPercent(obj.overall);
            obj.communityColor = getMarkColor(obj.community);
            obj.governanceColor = getMarkColor(obj.governance);
            obj.employmentColor = getMarkColor(obj.employees);
            obj.environmentColor = getMarkColor(obj.environment);
            obj['disabled'] = true;

            obj.bgdColor = 'white';
            obj['img_url'] = '/images/no_photo.png';

            if (obj.logo) {
                obj['img_url'] = obj.logo;
            }

            return obj;

        }
        function getCurrentImage() {
            vm.currentCorp.imgUrl = '/images/round-no-image.png';
            if (vm.currentCorp.logo) {
                vm.currentCorp.imgUrl = vm.currentCorp.logo;
            }
            return 'url(' + vm.currentCorp.imgUrl + ')';
            //return 'url(' + vm.currentCorp.imgUrl + ')';
        }

        function buildToggler(componentId) {
            return function () {

                if (vm.isSideNavOpen) {
                    $mdSidenav(componentId).close();
                }
                else {
                    $mdSidenav(componentId).open();
                }
                vm.isSideNavOpen = !vm.isSideNavOpen;
            }
        }
        function showInfo(index, notToggle) {

            if (vm.corps[currentIndex] && 'bgdColor' in vm.corps[currentIndex]) {
                vm.corps[currentIndex].bgdColor = 'white';
                vm.corps[index].bgdColor = color;

                currentIndex = index;
                vm.currentCorp = vm.corps[index];
            }
            if (!notToggle && !$mdMedia('gt-sm')) {
                vm.toggleLeft();
            }
        }
        function showVideo(ev) {
            $mdDialog.show({
                controller: 'VideoDialogCtrl',
                controllerAs: 'vm',
                templateUrl: 'app/pages/portfolio/templates/video-dialog.tpl.html',
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (data) {
                console.log(data)
            }, function (canceled) {
                console.log('canceled')
            });
        }
        function getMarkColor(mark) {
            if (mark !== null) {
                var mark = mark.charAt(0).toLowerCase();
                return mark + '-color';
            }
        }

        function getPercentColor(percent) {
            if (percent !== null) {
                var symbol = percent.charAt(0);

                return symbol === '+';
            }
        }
        function getGradeFromPercent(percent) {
            var grade = "";
            switch (true) {
                case percent >= 80:
                    grade = 'A+';
                    break;
                case percent < 80 && percent >= 70:
                    grade = "A";
                    break;
                case percent < 70 && percent >= 60:
                    grade = "A-";
                    break;
                case percent < 60 && percent >= 56:
                    grade = "B+";
                    break;
                case percent < 56 && percent >= 53:
                    grade = "B";
                    break;
                case percent < 53 && percent >= 50:
                    grade = "B-";
                    break;
                case percent < 50 && percent >= 46:
                    grade = "C+";
                    break;
                case percent < 46 && percent >= 43:
                    grade = "C";
                    break;
                case percent < 43 && percent >= 40:
                    grade = "C-";
                    break;
                case percent < 40 && percent >= 36:
                    grade = "D";
                    break;
                case percent < 36 && percent >= 33:
                    grade = "D+";
                    break;
                case percent < 33 && percent >= 30:
                    grade = "D-";
                    break;
                case percent < 30:
                    grade = "F";
                    break;
                default:
                    grade = "NR";
                    break;

            }
            return grade;

        }
        function getIndexIfObjWithOwnAttr(array, attr, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }
    }
})();
