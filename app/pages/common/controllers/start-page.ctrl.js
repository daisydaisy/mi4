(function () {
    'use strict';

    angular.module('miApp')
        .controller('StartPageCtrl', StartPageCtrl);

    function StartPageCtrl($scope, $mdDialog) {
        var vm = this;
        vm.showTabDialog = showTabDialog;
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
        ];

        function showTabDialog(ev) {
            $mdDialog.show({
                controller: 'CompaniesDialogCtrl',
                controllerAs: 'vm',
                disableParentScroll: true,
                templateUrl: 'app/pages/common/templates/companies-dialog.html',
                // parent: angular.element(document.body),
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
