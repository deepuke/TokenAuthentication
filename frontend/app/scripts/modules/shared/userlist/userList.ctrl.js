(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('userListCtrl', userListController);
    userListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$stateParams', 'userApiService'];

    function userListController($scope, $log, $rootScope, alert, $http, $state, $stateParams, userApiService) {

        console.log('userList controller loaded');
        var _self = this;

        this.users = [];
        this.currentUser = {};
        this.updateUser = updateUser;

        init();

        function init() {
            getAllUsers();
            if ($stateParams.email_id) {
                getuserByEmail();
            }
        }

        function getuserByEmail() {
            var user = {
                email_id: $stateParams.email_id
            };
            userApiService.getuserByEmail(user).then(function(response) {
                debugger;
                _self.currentUser = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function getAllUsers() {
            console.log($stateParams);
            userApiService.getAllUsers().then(function(response) {
                if(response.status === 403){
                    alert('warning', 'Oops!', 'Access Denied!');
                    $state.go('main');
                }
                _self.users = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }

        function updateUser(email_id) {
            console.log(email_id);
            $state.go('admin.updateUser', {
                "email_id": email_id
            });
        }

        function submitUpdatedDetails() {
            userApiService.updateUser().then(function(response) {
                _self.users = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            });
        }
    }

})();
