(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $http, $mdSidenav, $mdDialog, $timeout, $rootScope, ChartJs) {
        var vm = this;
        vm.currentCorp = {};
        var color = '#faf8f5';
        var currentIndex = 0;
        var selectedIndex = 0;
        vm.isSideNavOpen = true;
        var wentFromAnotherState = false;
        vm.baseurl = 'http://localhost:2020'
        ChartJs.Chart.defaults.global.defaultFontFamily = 'Open Sans';
        ChartJs.Chart.defaults.global.defaultFontSize = 11;
        vm.maxVisibleDescrLength = 800;

        $http.get('/json/corps.json').then(function (response) {
            vm.corps = response.data;
            for (var i = 0; i < vm.corps.length; i++) {
                vm.corps[i].overalColor = getMarkColor(vm.corps[i].overalMark);
                vm.corps[i].personalColor = getMarkColor(vm.corps[i].personalMark);
                vm.corps[i].bgdColor = 'white';
            }
            console.log('json')
            vm.corps[0].bgdColor = color;
            vm.currentCorp = vm.corps[0];
        }, function (err) {
            console.log(err);
        });
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
        $rootScope.$on('selectedCompany', function (event, index) {
            console.log(index);
            selectedIndex = index;
            vm.corps[currentIndex].bgdColor = 'white';
            vm.corps[index].bgdColor = color;
            currentIndex = index;
            vm.currentCorp = vm.corps[index];
        });

        function getCurrentImage() {
            return 'url(' + vm.currentCorp.imgUrl + ')';
        }

        function buildToggler(componentId) {
            return function () {
                vm.isSideNavOpen = !vm.isSideNavOpen;
                $mdSidenav(componentId).toggle();
            }
        }
        function showInfo(index) {
            vm.corps[currentIndex].bgdColor = 'white';
            vm.corps[index].bgdColor = color;
            currentIndex = index;
            vm.currentCorp = vm.corps[index];
            vm.toggleLeft();
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
            var mark = mark.charAt(0).toLowerCase();
            return mark + '-color';
        }
    }
})();
