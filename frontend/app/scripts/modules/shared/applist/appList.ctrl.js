(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('appListCtrl', appListController);
    appListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'applicationApiServices'];

    function appListController($scope, $log, $rootScope, alert, $http, $state, applicationApiServices) {
        var _self = this;

        this.apps = [];
        this.gotoApp = gotoApp;
        this.editApp = editApp;

        init();

        function init() {
            getAllApps();
        }

        function getAllApps() {
            applicationApiServices.getAllApps().then(function(response) {
                _self.apps = response.apps;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            })
        }

        function gotoApp(app_id) {
            console.log(app_id);
            $state.go('appDetails', {'app_id' : app_id});
        }

        function editApp(app_id) {
            console.log(app_id);

        }
    }

})();
