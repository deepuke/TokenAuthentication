(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('appListCtrl', appListController);
    appListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'appListApiService', 'authToken'];

    function appListController($scope, $log, $rootScope, alert, $http, $state, appListApiService, authToken) {
        var _self = this;

        this.apps = [];
        this.gotoApp = gotoApp;
        this.changeAppState = changeAppState;
        this.modify = modify;
        _self.isAuthenticated = authToken.isAuthenticated;
        _self.isAdmin = authToken.isAdmin;

        init();

        function init() {
            var loggedUser = authToken.getLoggedUser();
            if(_self.permission){
                getApps(loggedUser);
            } else {
                getAllApps(loggedUser);
            }

        }

        function getApps(user) {
            appListApiService.getApps(user).then(function(response) {
                _self.apps = response.apps;
                for (var i = 0, j = _self.apps.length; i < j; i++) {
                    _self.apps[i].active = !!_self.apps[i].active;
                }

            }).catch(function(error) {
                alert('warning', 'Oops!', error);
            });
        }

        function getAllApps(user) {
            appListApiService.getAllApps(user).then(function(response) {
                _self.apps = response.apps;
                for (var i = 0, j = _self.apps.length; i < j; i++) {
                    _self.apps[i].active = !!_self.apps[i].active;
                }

            }).catch(function(error) {
                alert('warning', 'Oops!', error);
            });
        }


        function modify(app_id){
            $state.go('admin.applications', {app_id : app_id});
        }

        function gotoApp(app_id) {
            console.log(app_id);
            $state.go('appDetails', {
                'app_id': app_id
            });
        }

        function changeAppState(app) {
            console.log(app);
            if (app.active === true) {
                app.active = 1
            } else {
                app.active = 0
            }

            appListApiService.changeAppState(app).then(function(response) {
                init();
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });

        }
    }

})();
