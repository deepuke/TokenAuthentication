(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateAppCtrl', updateAppController);
    updateAppController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'authToken', 'userApiService', 'applicationApiServices', 'updateUserAppApiService'];

    function updateAppController($scope, $log, $rootScope, alert, $http, $state, $stateParams, authToken, userApiService, applicationApiServices, updateUserAppApiService) {

        console.log('updateApp controller loaded');
        var _self = this;
        this.apps = [];
        this.appModel = {};
        this.updateUserApp = updateUserApp;

        this.data = {
            singleSelect: null,
            multipleSelect: [],
            apps: []
        };

        init();

        function init() {
            getAllActiveApps();
        }
        
        function getAllActiveApps() {
            updateUserAppApiService.getAllActiveApps().then(function(response) {
                _self.data.apps = response.apps;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function updateUserApp() {
            var updatedUser = {
                user_id: _self.user.user_id,
                app_ids: _self.data.multipleSelect
            };
            debugger;
            updateUserAppApiService.updateUserApp(updatedUser).then(function(response) {
                console.log(response);
                $state.go('admin.config');
            }).catch(function(err) {

            });
        }
    }
})();
