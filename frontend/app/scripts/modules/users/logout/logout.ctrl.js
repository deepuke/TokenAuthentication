(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:RegisterCtrl
     * @description
     * # RegisterCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp').controller('LogoutCtrl', LogOutController);

    LogOutController.$inject = ['$state','authToken'];

    function LogOutController($state, authToken) {

        var _self = this;
        authToken.removeToken();
        console.log(authToken.getToken());
        $state.go('login');
    }

}());
