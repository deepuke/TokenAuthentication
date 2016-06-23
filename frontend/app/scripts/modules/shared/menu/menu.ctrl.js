(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('menuCtrl', menuController);
    menuController.$inject = ['authToken'];

    function menuController(authToken) {
        var _self = this;
        _self.isAuthenticated = authToken.isAuthenticated;
        _self.isAdmin = authToken.isAdmin;
    }

})();
