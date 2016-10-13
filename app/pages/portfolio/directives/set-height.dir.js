(function () {
    'use strict';
    angular
        .module('portfolio')
        .directive('setHeight', ['$window', function ($window) {
            return {
                link: function (scope, element, attrs) {
                    var w = angular.element($window);
                    var cardContent = angular.element(document.querySelector('.card-content'))[0];
                    if (cardContent.clientWidth === 0) {
                        console.log(w[0].innerWidth);
                        element[0].style.height = (w[0].innerWidth * 180 / 620) + 'px';
                    } else {
                        console.log('!0');
                        
                        element[0].style.height = (cardContent.clientWidth * 180 / 440) + 'px';
                    }

                    w.bind('resize', function () {
                        console.log('resize');
                        element[0].style.height = (cardContent.clientWidth * 180 / 440) + 'px';
                    });

                    element.bind('setHeight', function () {
                        console.log('setHeight');
                        element[0].style.height = (cardContent.clientWidth * 180 / 440) + 'px';
                        scope.$apply();
                    });
                }
            };
        }]);
})();