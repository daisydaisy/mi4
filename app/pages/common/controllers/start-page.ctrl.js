(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl', StartPageCtrl);

    function StartPageCtrl($scope) {
        var vm = this;

        vm.corps = [
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
                
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
                
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            },
            {
                title: 'Starbucks Corporation',
                sbux: '$55.80',
                percent: '-0.52 (-0.93%)',
                percentClass: 'positive',
                description: 'Starbucks is an international chain of restaurants that retails handcrafted coffee, tea, and fresh food items.',
                mark: 'B',
                markClass: 'excellent'
            }
        ]
    }
})();
