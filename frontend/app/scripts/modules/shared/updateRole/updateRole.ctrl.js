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
            roles : []
        };

        init();

        function init() {
            getAllRoles();
        }

        function getAllRoles() {
            rolesApiService.getAllRoles().then(function(response) {
                _self.data.roles = response.roles;
            }).catch(function(error) {
                console.log(error);
            });
        }

        function updateUserRole() {
            console.log(_self.emaild);
            console.log(_self.data.multipleSelect);
            var user = {
                email_id : _self.emaild,
                role_ids : _self.data.multipleSelect
            };
            debugger;
            updateUserRoleApiService.updateUserRole(user).then(function(response){
                console.log(response);
                $state.go('admin.config');
            }).catch(function(err){

            });
        }
    }
})();
