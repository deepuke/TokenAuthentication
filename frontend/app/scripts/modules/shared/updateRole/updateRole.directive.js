(function(){
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('updateRole', updateRoleDirective);

    function updateRoleDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/updateRole/updateRole.html',
            scope: {
                user : '='
            },
            controller: 'updateRoleCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
