(function() {
	'use strict';

	angular.module('angularNodeTokenAuthApp').controller('updateUserCtrl', updateUserController);
	updateUserController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userApiService', 'rolesApiService'];

	function updateUserController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userApiService, rolesApiService) {

		console.log('userList controller loaded');
		var _self = this;
		this.userObject = null;
		this.roles = [];

		init();
		function init() {
			if (!!$stateParams.email_id) {
				getuserByEmail();
			} else {
				$state.go('admin.config');
			}
		}

		function getuserByEmail() {
			var user = {
				email_id : $stateParams.email_id
			};
			userApiService.getuserByEmail(user).then(function(response) {
				_self.userObject = response.Users;
			}).catch(function(error) {
				alert('warning', 'Oops!', 'Couldn\'t register');
			});
		}

	}

})();
