(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog, $http, $timeout) {
        var vm = this;
        vm.selectedTab = 0;
        vm.questions = [];
        vm.selectNextTab = selectNextTab;
        vm.selectBackTab = selectBackTab;
        vm.selectRange = selectRange;
        vm.countOfTabs = 0;
        vm.disabledTabs = [false];

        $http.get('/json/questions.json').then(function(response) {
            vm.questions = response.data;
            vm.countOfTabs = vm.questions.length;

            for (var i = 1; i < vm.countOfTabs; i++) {
                vm.disabledTabs.push(true);
            }
        }, function(err) {
            console.log(err);
        });

        $scope.$watch('vm.selectedTab', function() {
        });

        function selectNextTab(tab) {
            if (!tab || tab === vm.countOfTabs) {
                $mdDialog.hide(vm.questions);
            }
            vm.disabledTabs[tab] = false;
            
            //For some reason we can't switch to next tab from the first time.
            $timeout(function(){ 
                vm.selectedTab = tab;
                $timeout(function(){
                    vm.selectedTab = tab;
                });
            });
        }
        function selectBackTab(tab) {
            vm.selectedTab = tab;
        }
        function selectRange(qId, rIndex, range) {
            vm.questions[qId].sliders[rIndex].range = range;
        }
    }
})();
