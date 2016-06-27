(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('updateUserCtrl', updateUserController);
    updateUserController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'authToken', 'userListApiService'];

    function updateUserController($scope, $log, $rootScope, alert, $http, $state, $stateParams, authToken, userListApiService) {

        console.log('userList controller loaded');
        var _self = this;
        this.userObject = {
            user : {},
            role_ids : [],
            apps : []
        };
        this.roles = [];

        init();

        function init() {
            console.log($stateParams.username);
            var loggedUser = authToken.getLoggedUser();
            if ($stateParams.username) {
                var user = {
                    username: $stateParams.username
                }
                getUserByUserName(user);
                getAssignedApp(user);
            } else {
                $state.go('admin.config');
            }
        }

        function getUserByUserName(user) {
            userListApiService.getUserByUserName(user).then(function(response) {
                _self.userObject.user = response.Users.user;
                _self.userObject.role_ids = response.Users.role_ids;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function getAssignedApp(user) {
            userListApiService.getAssignedApp(user).then(function(response) {
                for (var i = 0, j = response.apps.length; i < j; i++) {
                    _self.userObject.apps.push(response.apps[i].app_id);
                }
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

    }

})();
