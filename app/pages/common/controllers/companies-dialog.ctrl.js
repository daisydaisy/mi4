(function () {
    'use strict';

    angular.module('miApp')
        .controller('CompaniesDialogCtrl', CompaniesDialogCtrl);

    function CompaniesDialogCtrl($scope, $mdDialog, $http, $timeout,$localStorage,  CompanyDataService) {
        var vm = this;
        vm.selectedTab = 0;
        vm.questions = [];
        vm.selectNextTab = selectNextTab;
        vm.selectBackTab = selectBackTab;
        vm.selectRange = selectRange;
        vm.countOfTabs = 0;
        vm.disabledTabs = [false];
        vm.userValues = [] ;
        $http.get('/json/questions.json').then(function(response) {
            vm.questions = response.data;
            vm.countOfTabs = vm.questions.length;
            vm.questions = makeObjectForSlider(vm.questions)


            for (var i = 1; i < vm.countOfTabs; i++) {
                vm.disabledTabs.push(true);
            }
        }, function(err) {
            console.log(err);
        });

        $scope.$watch('vm.selectedTab', function() {
        });
        function saveAllValues(questions) {

            if (vm.userValues){
                vm.userValues = makeObjectFromSlider(questions, vm.userValues);
                $localStorage.personal_values = get_personal_values(vm.userValues);
                CompanyDataService.putValues(vm.userValues).then(function(response) {

                }, function(err) {
                    console.log(err);
                });
            }
            else {
                vm.userValues = makeNewObjectFromSlider(questions, vm.userValues);
                $localStorage.personal_values = get_personal_values(vm.userValues);
                vm.userValues['user'] = 2;
                CompanyDataService.createValues(vm.userValues).then(function(response) {


                }, function(err) {
                    console.log(err);
                });
            }

        }
        function selectNextTab(tab) {
            if (!tab || tab === vm.countOfTabs) {
                $mdDialog.hide(vm.questions);
            }
            vm.disabledTabs[tab] = false;

            if (tab >= vm.questions.length){
                saveAllValues(vm.questions);
            }
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
        function makeObjectForSlider(data){
            CompanyDataService.getValues().then(function (response) {
                // console.log(response);
                var userValues = response.data.results[0];
                console.log(userValues);
                vm.userValues = userValues;

                var arrOFObj = []
                if (userValues) {
                    vm.objExists = true;
                    for (var i = 0; i < data.length; i++) {
                        for (var j=0; j < data[i].sliders.length ; j++){
                            if (i==0) {
                                if (j==0){
                                    data[i].sliders[j].range = parseInt(userValues.community_dev);
                                }
                                if (j==1){
                                    data[i].sliders[j].range = parseInt(userValues.community_philanthropy);
                                }
                                if (j==2){
                                    data[i].sliders[j].range = parseInt(userValues.community_women_girls);
                                }
                            }
                            if (i==1) {
                                if (j==0){
                                    data[i].sliders[j].range = parseInt(userValues.employment_diversity_labor_rights);
                                }
                                if (j==1){
                                    data[i].sliders[j].range = parseInt(userValues.employment_lbgt_policy);
                                }
                                if (j==2){
                                    data[i].sliders[j].range = parseInt(userValues.employment_equal_pay);
                                }

                            }
                            if (i==2) {
                                if (j==0){
                                    data[i].sliders[j].range = parseInt(userValues.enviornment_climate_change);
                                }
                                if (j==1){
                                    data[i].sliders[j].range = parseInt(userValues.enviornment_renewable_energy);
                                }
                                if (j==2){
                                    data[i].sliders[j].range = parseInt(userValues.enviornment_water_resource_usage);
                                }

                            }
                            if (i==3) {
                                if (j==0){
                                    data[i].sliders[j].range = parseInt(userValues.governance_compensation_benefits);
                                }
                                if (j==1){
                                    data[i].sliders[j].range = parseInt(userValues.governance_leadership_ethics);
                                }
                                if (j==2){
                                    data[i].sliders[j].range = parseInt(userValues.governance_management_diversity);
                                }

                            }
                        }
                    }
                }

                $localStorage.personal_values = get_personal_values(userValues);

            });

        return data;
        }

        function makeObjectFromSlider(data, values){
                // console.log(response);
                var userValues = values;
                console.log(userValues);
                vm.userValues = userValues;

                var arrOFObj = []
                if (userValues) {
                    vm.objExists = true;
                    for (var i = 0; i < data.length; i++) {
                        for (var j=0; j < data[i].sliders.length ; j++){
                            if (i==0) {
                                if (j==0){
                                    userValues.community_dev = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues.community_philanthropy = "" + data[i].sliders[j].range ;
                                }
                                if (j==2){
                                    userValues.community_women_girls = "" + data[i].sliders[j].range ;
                                }
                            }
                            if (i==1) {
                                if (j==0){
                                    userValues.employment_diversity_labor_rights = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues.employment_lbgt_policy = data[i].sliders[j].range;
                                }
                                if (j==2){
                                    userValues.employment_equal_pay = "" + data[i].sliders[j].range;
                                }

                            }
                            if (i==2) {
                                if (j==0){
                                    userValues.enviornment_climate_change = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues.enviornment_renewable_energy = "" + data[i].sliders[j].range ;
                                }
                                if (j==2){
                                    userValues.enviornment_water_resource_usage = "" + data[i].sliders[j].range;
                                }

                            }
                            if (i==3) {
                                if (j==0){
                                    userValues.governance_compensation_benefits = "" + data[i].sliders[j].range ;
                                }
                                if (j==1){
                                    userValues.governance_leadership_ethics = "" + data[i].sliders[j].range;
                                }
                                if (j==2){
                                    userValues.governance_management_diversity = "" + data[i].sliders[j].range;
                                }

                            }
                        }
                    }
                }

        return userValues;
        }

        function makeNewObjectFromSlider(data, values){
                // console.log(response);
                var userValues = values;
                console.log(userValues);
                // vm.userValues = userValues;

                var userValues = {};


                    for (var i = 0; i < data.length; i++) {
                        for (var j=0; j < data[i].sliders.length ; j++){
                            if (i==0) {
                                if (j==0){
                                    userValues['community_dev'] = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues['community_philanthropy'] = "" + data[i].sliders[j].range ;
                                }
                                if (j==2){
                                    userValues['community_women_girls'] = "" + data[i].sliders[j].range ;
                                }
                            }
                            if (i==1) {
                                if (j==0){
                                    userValues['employment_diversity_labor_rights'] = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues['employment_lbgt_policy'] = data[i].sliders[j].range;
                                }
                                if (j==2){
                                    userValues['employment_equal_pay'] = "" + data[i].sliders[j].range;
                                }

                            }
                            if (i==2) {
                                if (j==0){
                                    userValues['enviornment_climate_change'] = "" + data[i].sliders[j].range;
                                }
                                if (j==1){
                                    userValues['enviornment_renewable_energy'] = "" + data[i].sliders[j].range ;
                                }
                                if (j==2){
                                    userValues['enviornment_water_resource_usage'] = "" + data[i].sliders[j].range;
                                }

                            }
                            if (i==3) {
                                if (j==0){
                                    userValues['governance_compensation_benefits'] = "" + data[i].sliders[j].range ;
                                }
                                if (j==1){
                                    userValues['governance_leadership_ethics'] = "" + data[i].sliders[j].range;
                                }
                                if (j==2){
                                    userValues['governance_management_diversity'] = "" + data[i].sliders[j].range;
                                }

                            }
                        }
                    }


        return userValues;
        }
        function selectRange(qId, rIndex, range) {
            vm.questions[qId].sliders[rIndex].range = range;
        }

        function get_personal_values(userValues) {
            var personal_values = 0;


            personal_values += parseInt(userValues.community_dev);

            personal_values += parseInt(userValues.community_philanthropy);

            personal_values += parseInt(userValues.community_women_girls);

            personal_values += parseInt(userValues.employment_diversity_labor_rights);

            personal_values += parseInt(userValues.employment_lbgt_policy);

            personal_values += parseInt(userValues.employment_equal_pay);

            personal_values += parseInt(userValues.enviornment_climate_change);

            personal_values += parseInt(userValues.enviornment_renewable_energy);

            personal_values += parseInt(userValues.enviornment_water_resource_usage);

            personal_values += parseInt(userValues.governance_compensation_benefits);

            personal_values += parseInt(userValues.governance_leadership_ethics);

            personal_values += parseInt(userValues.governance_management_diversity);

            return personal_values/12.0;

        }
    }


})();
