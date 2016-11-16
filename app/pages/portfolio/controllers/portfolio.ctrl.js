(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $http, $mdSidenav, $mdDialog, $timeout, $rootScope, $mdMedia,$localStorage,  ChartJs, CompanyDataService) {
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
        if ($localStorage.corps === undefined) {
            CompanyDataService.getAll().then(function (response) {
                vm.corps = response.data.results;

                for (var i = 0; i < vm.corps.length; i++) {

                    vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                    vm.corps[i].overalColor = getMarkColor(vm.corps[i].ratings);
                    vm.corps[i].personalColor = getMarkColor(vm.corps[i].ratings);
                    vm.corps[i].communityColor = getMarkColor(vm.corps[i].community);
                    vm.corps[i].governanceColor = getMarkColor(vm.corps[i].governance);
                    vm.corps[i].employmentColor = getMarkColor(vm.corps[i].employees);
                    vm.corps[i].environmentColor = getMarkColor(vm.corps[i].environment);
                    vm.corps[i].bgdColor = 'white';
                    vm.corps[i]['img_url'] = '/images/no_photo.png';
                }
                console.log('json')
                vm.corps[currentIndex].bgdColor = color;
                vm.currentCorp = vm.corps[currentIndex];
            }, function (err) {
                console.log(err);
            });
        }
        else{

            vm.corps = $localStorage.corps;

            for (var i = 0; i < vm.corps.length; i++) {

                vm.corps[i].percentColor = getPercentColor(vm.corps[i].transparency_reporting);
                vm.corps[i].overalColor = getMarkColor(vm.corps[i].ratings);
                vm.corps[i].personalColor = getMarkColor(vm.corps[i].ratings);
                vm.corps[i].communityColor = getMarkColor(vm.corps[i].community);
                vm.corps[i].governanceColor = getMarkColor(vm.corps[i].governance);
                vm.corps[i].employmentColor = getMarkColor(vm.corps[i].employees);
                vm.corps[i].environmentColor = getMarkColor(vm.corps[i].environment);
                vm.corps[i].bgdColor = 'white';
                vm.corps[i]['img_url'] = '/images/no_photo.png';
            }
            console.log('json')
            if ('bgdColor' in vm.corps[currentIndex]) {
                vm.corps[currentIndex].bgdColor = color;
            }
            else{
                vm.corps[currentIndex]['bgdColor'] = color;
            }
            vm.currentCorp = vm.corps[currentIndex];

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
        })

        function getCurrentImage() {
            vm.currentCorp.imgUrl  = '/images/round-no-image.png';
            return 'url(' + vm.currentCorp.imgUrl + ')';
            //return 'url(' + vm.currentCorp.imgUrl + ')';
        }

        function buildToggler(componentId) {
            return function () {
                vm.isSideNavOpen = !vm.isSideNavOpen;
                $mdSidenav(componentId).toggle();
            }
        }
        function showInfo(index, notToggle) {

            vm.corps[currentIndex].bgdColor = 'white';
            vm.corps[index].bgdColor = color;
            currentIndex = index;
            vm.currentCorp = vm.corps[index];
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
    }
})();
