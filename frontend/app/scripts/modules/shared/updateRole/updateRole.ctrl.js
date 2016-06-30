(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateRoleCtrl', updateRoleController);
    updateRoleController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userApiService', 'rolesApiService', 'updateUserRoleApiService'];

    function updateRoleController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userApiService, rolesApiService, updateUserRoleApiService) {

        console.log('updateRole controller loaded');
        var _self = this;
        this.roles = [];
        this.roleModel = {};
        this.updateUserRole = updateUserRole;

        this.data = {
            singleSelect: null,
            multipleSelect: [],
            roles: []
        };

        init();

        function init() {
            getAllRoles();
        }

        function getAllRoles() {
            rolesApiService.getAllRoles().then(function(response) {
                for (var i = 0, j = response.roles.length; i < j; i++) {
                    if (response.roles[i].active) {
                        _self.data.roles.push(response.roles[i]);
                    }
                }
                //_self.data.roles = response.roles;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function updateUserRole() {
            var updatedUser = {
                user_id: _self.user.user_id,
                role_ids: _self.data.multipleSelect
            };
            updateUserRoleApiService.updateUserRole(updatedUser).then(function(response) {
                console.log(response);
                $state.go('admin.config');
            }).catch(function(err) {

            });
        }
    }
})();
