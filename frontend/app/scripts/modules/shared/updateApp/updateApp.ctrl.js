(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateAppCtrl', updateAppController);
    updateAppController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userApiService', 'applicationApiServices', 'updateUserAppApiService'];

    function updateAppController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userApiService, applicationApiServices, updateUserAppApiService) {

        console.log('updateApp controller loaded');
        var _self = this;
        this.apps = [];
        this.appModel = {};
        this.updateUserApp = updateUserApp;

        this.data = {
            singleSelect: null,
            multipleSelect: [],
            apps : []
        };

        init();

        function init() {
            
            getApps();
        }

       

         function getApps() {
            applicationApiServices.getApps().then(function(response) {
                _self.data.apps = response.apps;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function updateUserApp() {
            //console.log(_self.emaild);
           // console.log(_self.data.multipleSelect);
            var updatedUser = {
                user_id : _self.user.user_id,
                app_ids : _self.data.multipleSelect
            };
            debugger;
            updateUserAppApiService.updateUserApp(updatedUser).then(function(response){
                console.log(response);
                $state.go('admin.config');
            }).catch(function(err){

            });
        }
    }
})();
