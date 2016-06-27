(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:applicationsCtrl
     * @description
     * # applicationsCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp').controller('applicationsCtrl', applicationsController);

    applicationsController.$inject = ['$scope', '$log', '$rootScope', '$timeout', 'alert', '$http', '$state', '$stateParams', 'applicationApiServices'];

    function applicationsController($scope, $log, $rootScope, $timeout, alert, $http, $state, $stateParams, applicationApiServices) {

        var _self = this;
        this.app_name = '';
        this.submit = submit;
        this.editFlag = false;
        this.currentApp = {};

        init();

        function init(){
            if($stateParams.app_id){
                console.log($stateParams.app_id);
                getAppByAppID($stateParams.app_id);
            }
        }

        function getAppByAppID(app_id){
            var app = {
                app_id : app_id
            };
            applicationApiServices.getAppByAppID(app).then(function(response) {
                _self.editFlag = true;
                _self.currentApp = response.apps[0];
                _self.app_name = _self.currentApp.app_name;
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }

        function submit() {
            if(_self.editFlag){
                _self.currentApp.app_name = _self.app_name;
                updateApp(_self.currentApp);
            } else {
                var app = {
                    app_name: _self.app_name
                };
                saveNewApp(app)
            }
        }

        function saveNewApp(app){
            applicationApiServices.addApplication(app).then(function(response) {
                if (!response.Error) {
                    _self.app_name = '';
                    alert('sucess', 'App Registration!', 'sucessfully completed');
                } else {
                    alert('warning', 'Oops!', 'Something is wrong!, check and try again.');
                }
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }

        function updateApp(app){
            applicationApiServices.updateApplication(app).then(function(response) {
                alert('sucess', 'App Registration!', 'sucessfully Updated');
                $timeout(function(){
                    $state.go('admin.config');
                }, 10);

            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }
    }
})();
