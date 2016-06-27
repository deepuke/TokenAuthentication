(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('userListCtrl', userListController);
    userListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userListApiService', 'authToken'];

    function userListController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userListApiService, authToken) {

        console.log('userList controller loaded');
        var _self = this;

        this.users = [];
        this.currentUser = {};
        this.updateUser = updateUser;
        this.changeUserState = changeUserState;

        _self.isAuthenticated = authToken.isAuthenticated;
        _self.isAdmin = authToken.isAdmin;

        init();

        function init() {
            var loggedUser = authToken.getLoggedUser();
            getAllUsers(loggedUser);
        }

        function changeUserState(user) {
            if (user.active === true) {
                user.active = 1
            } else {
                user.active = 0
            }
            userListApiService.changeUserState(user).then(function(response) {
                console.log(response);
                init();
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function getAllUsers(user) {
            userListApiService.getAllUsers(user).then(function(response) {
                if (response.status === 403) {
                    alert('warning', 'Oops!', 'Access Denied!');
                    $state.go('main');
                }
                _self.users = response.Users;
                for (var i = 0, j = _self.users.length; i < j; i++) {
                    _self.users[i].active = !!_self.users[i].active;
                }

            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function updateUser(username) {
            $state.go('admin.updateUser', {
                username: username
            });
        }
    }

})();
