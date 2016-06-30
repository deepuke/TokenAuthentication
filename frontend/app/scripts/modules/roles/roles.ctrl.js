
(function(){
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('rolesCtrl', rolesController);
    rolesController.$inject=['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'rolesApiService'];
    function rolesController($scope, $log, $rootScope, alert, $http,  $state, $stateParams, rolesApiService) {

        console.log('rolesController controller loaded');

        var _self = this;
		//this.role_id = '';
		this.role_name = '';
		this.submit  = submit;
        this.editFlag = false;
        this.currentRole = {};
        init();

        function init(){
            if($stateParams.role_id){
                console.log($stateParams.role_id);
                getRoleByRoleID($stateParams.role_id);
            }
        }

        function getRoleByRoleID(role_id){
            var role = {
                role_id : role_id
            };
            rolesApiService.getRoleByRoleID(role).then(function(response) {
                _self.editFlag = true;
                _self.currentRole = response.roles[0];
                _self.role_name = _self.currentRole.role_name;
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }

        function submit() {
            if(_self.editFlag){
                _self.currentRole.role_name = _self.role_name;
                updateRole(_self.currentRole);
            } else {
                var role = {
                    role_name: _self.role_name
                };
                saveNewRole(role)
            }
        }


        function saveNewRole(role){
            rolesApiService.addNewRoles(role).then(function(response) {
                if(!response.Error){
                    //_self.role_id = '';
                    _self.role_name = '';
                    alert('sucess', 'Role Registration!', 'sucessfully completed');
                } else {
                    alert('warning', 'Oops!', 'Something is wrong!, check and try again.');
                }
            }).catch(function(err){
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }

        function updateRole(role){
            rolesApiService.updateRole(role).then(function(response) {
                alert('sucess', 'Role Updation', 'sucessfully Updated');
                $state.go('admin.config');
            }).catch(function(err) {
                alert('warning', 'Oops!', 'Something is wrong!, try again later.');
            });
        }		
    }

})();
