(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp').controller('applicationsCtrl', applicationsController);

    applicationsController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'applicationApiServices'];

    function applicationsController($scope, $log, $rootScope, alert, $http, $state, applicationApiServices) {

        var _self = this;
        this.app_id = '';
        this.app_name = '';
        this.submit = submit;

        function submit() {
            var app = {
                app_id: _self.app_id,
                app_name: _self.app_name
            };

            applicationApiServices.addApplication(app).then(function(response) {
                if (!response.Error) {
                    _self.app_id = '';
                    _self.app_name = '';
                    alert('sucess', 'App Registration!', 'sucessfully completed');
                } else {
                    alert('warning', 'Oops!', 'Something is wrong!, check and try again.');
                }
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }

        this.tabs = [{
            title: 'Dynamic Title 1',
            content: 'Dynamic content 1'
        }, {
            title: 'Dynamic Title 2',
            content: 'Dynamic content 2',
            disabled: true
        }];

        _self.alertMe = function() {
            setTimeout(function() {
                $window.alert('You\'ve selected the alert tab!');
            });
        };

        _self.model = {
            name: 'Tabs'
        };
    }

})();
