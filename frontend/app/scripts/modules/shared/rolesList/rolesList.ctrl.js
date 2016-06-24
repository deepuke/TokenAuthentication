(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('rolesListCtrl', rolesListController);
    rolesListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'rolesListApiService', 'authToken'];

    function rolesListController($scope, $log, $rootScope, alert, $http, $state, rolesListApiService, authToken) {
        var _self = this;
        this.roles = [];
        this.changeRoleState = changeRoleState;
        _self.isAuthenticated = authToken.isAuthenticated;
        _self.isAdmin = authToken.isAdmin;

        init()

        function init() {

            rolesListApiService.getAllRoles().then(function(response) {
                _self.roles = response.roles;
                console.log(_self.roles);
                for (var i = 0, j = _self.roles.length; i < j; i++) {
                    _self.roles[i].active = !!_self.roles[i].active;
                }
            }).catch(function(error) {
                console.log(error);
            });
        }

        function changeRoleState(role) {
            console.log(role);
            if (role.active === true) {
                role.active = 1
            } else {
                role.active = 0
            }
            rolesListApiService.changeRoleState(role).then(function(response) {
                init();
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

    }

})();
