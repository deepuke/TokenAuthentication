(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name angularNodeTokenAuthApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the angularNodeTokenAuthApp
     */
    angular.module('angularNodeTokenAuthApp')
        .controller('MainCtrl', MainController);

    MainController.$inject = ['$state', 'authToken'];

    function MainController($state, authToken) {
        console.log(authToken.getToken());
        if (!authToken.getToken()) {
            $state.go('login');
        }
    }

})();
