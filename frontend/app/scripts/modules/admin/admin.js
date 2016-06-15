(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:RegisterCtrl
     * @description
     * # RegisterCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp').controller('adminCtrl', AdminController);

    AdminController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'userApiService', 'authToken'];

    function AdminController($scope, $log, $rootScope, alert, $http, $state, userApiService, authToken) {

        if (!authToken.getToken()) {
            $state.go('login');
        }
    }

}());
