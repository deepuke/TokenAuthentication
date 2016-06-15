(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('menuCtrl', menuController);
    menuController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', '$cookieStore', 'authToken'];

    function menuController($scope, $log, $rootScope, alert, $http, $state, $cookieStore, authToken) {
        var _self = this;
        _self.isAuthenticated = authToken.isAuthenticated;
    }

})();
