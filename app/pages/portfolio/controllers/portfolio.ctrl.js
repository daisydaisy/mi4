(function () {
    'use strict';

    angular.module('portfolio')
        .controller('PortfolioCtrl', PortfolioCtrl);

    function PortfolioCtrl($scope, $mdSidenav, ChartJs) {
        console.log(ChartJs);
        ChartJs.Chart.defaults.global.defaultFontFamily = 'Open Sans';
        ChartJs.Chart.defaults.global.defaultFontSize = 11;
        ChartJs.Chart.defaults.global.tooltips.xAlign = 'right';
        var vm = this;
        vm.isSideNavOpen = false;
        vm.toggleLeft = buildToggler('left');
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
                            beginAtZero:true,
                            min: 0,
                            max: 100,
                            stepSize: 50
                        },
                        gridLines : {
                            display : true,
                            zeroLineWidth:0.01,
                            drawTicks: false
                        }
                    }
                ],
                xAxes: [
                    {
                        id: 'x-axis-1',
                        display: true,
                        position: 'bottom',
                        gridLines : {
                            display : true,
                            drawOnChartArea: false,
                            zeroLineWidth:0.01
                        }
                    }
                ]
            }
        };
        var windowHeight = window.innerHeight - 80;
        var result = angular.element(document.getElementsByClassName("md-sidenav-left"))[0];
        result.style.height = windowHeight + 'px';

        vm.corps = [
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            },
            {
                title: 'Southwest Airlines Co.',
                nyse: 'LUV',
                description: 'Southwest Airlines (NYSE: LUV) continues to differentiate itself from other carriers with exemlaplary',
                overalMark: 'B+',
                personalMark: 'B-'
            }
        ];

        function buildToggler(componentId) {
            return function () {
                vm.isSideNavOpen = !vm.isSideNavOpen;
                $mdSidenav(componentId).toggle();
            }
        }
        function showInfo(index) {

        }
    }
})();
