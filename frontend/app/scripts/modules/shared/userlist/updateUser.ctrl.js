(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateUserCtrl', updateUserController);
    updateUserController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'authToken', 'userListApiService'];

    function updateUserController($scope, $log, $rootScope, alert, $http, $state, $stateParams, authToken, userListApiService) {

        console.log('userList controller loaded');
        var _self = this;
        this.userObject = null;
        this.roles = [];

        init();

        function init() {
            console.log($stateParams.username);
            var loggedUser = authToken.getLoggedUser();
            if ($stateParams.username) {
                var user = {
                    username: $stateParams.username
                }
                getUserIdByUserName(user);
            } else {
                $state.go('admin.config');
            }
        }

        function getUserIdByUserName(user) {
            userListApiService.getUserIdByUserName(user).then(function(response) {
                _self.userObject = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

    }

})();
