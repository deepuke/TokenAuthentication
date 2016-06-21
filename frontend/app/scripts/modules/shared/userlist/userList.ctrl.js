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

        init();

        function init() {
            var loggedUser = authToken.getLoggedUser();
            getAllUsers(loggedUser);
            // if ($stateParams.email_id) {
            //     getuserByEmail();
            // }
        }

        // function getuserByEmail() {
        //     var user = {
        //         email_id: $stateParams.email_id
        //     };
        //     userApiService.getuserByEmail(user).then(function(response) {
        //         debugger;
        //         _self.currentUser = response.Users;
        //     }).catch(function(error) {
        //         alert('warning', 'Oops!', 'Couldn\'t register');
        //     });
        // }

        function getAllUsers(user) {
            userListApiService.getAllUsers(user).then(function(response) {
                if(response.status === 403){
                    alert('warning', 'Oops!', 'Access Denied!');
                    $state.go('main');
                }
                _self.users = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function updateUser(username) {
            $state.go('admin.updateUser', {
                username : username
            });
        }

        // function submitUpdatedDetails() {
        //     userApiService.updateUser().then(function(response) {
        //         _self.users = response.Users;
        //     }).catch(function(error) {
        //         alert('warning', 'Oops!', 'Couldn\'t register');
        //     });
        // }
    }

})();
