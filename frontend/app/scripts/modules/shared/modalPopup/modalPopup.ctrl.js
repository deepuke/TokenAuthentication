(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('modalPopupCtrl', modalPopupController);
    modalPopupController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'userApiService'];

    function modalPopupController($scope, $log, $rootScope, alert, $http, $state, userApiService) {

        console.log('userList controller loaded');
        var _self = this;

        this.users = [];
        this.updateUser = updateUser;

        init();

        function init() {
            getAllUsers();
        }

        function getAllUsers() {
            userApiService.getAllUsers().then(function(response) {
                _self.users = response.Users;
            }).catch(function(error) {
                alert('warning', 'Oops!', 'Couldn\'t register');
            })
        }

        function updateUser(email_id){
            console.log(email_id);
        }
    }

})();
