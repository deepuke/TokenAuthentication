
(function(){
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('rolesCtrl', rolesController);
    rolesController.$inject=['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'rolesApiService'];
    function rolesController($scope, $log, $rootScope, alert, $http,  $state, rolesApiService) {

        console.log('rolesController controller loaded');

        var _self = this;
		//this.role_id = '';
		this.role_name = '';
		this.submit  = submit;

		function submit(){
			var newRole = {
				//role_id : _self.role_id,
				role_name: _self.role_name
			};
			rolesApiService.addNewRoles(newRole).then(function(response) {
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
    }

})();
