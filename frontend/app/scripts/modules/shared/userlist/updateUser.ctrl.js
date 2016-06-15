(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateUserCtrl', updateUserController);
    updateUserController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userApiService', 'rolesApiService'];

    function updateUserController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userApiService, rolesApiService) {

        console.log('userList controller loaded');
        var _self = this;
        this.currentUser = {
            role_id : null
        };
        this.roles = [];

        init();
        function init() {
            if(!$stateParams.email_id){
                $state.go('admin.config');
            }
            getuserByEmail();
        }

        function getuserByEmail() {
            var user = {
                email_id: $stateParams.email_id
            };
            userApiService.getuserByEmail(user).then(function(response) {
                _self.currentUser = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

    }

})();
