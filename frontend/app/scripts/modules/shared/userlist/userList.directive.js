(function(){
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('userList', userListDirective);

    function userListDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/userlist/userList.html',
            scope: {},
            controller: 'userListCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
