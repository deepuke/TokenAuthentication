(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('rolesList', rolesListDirective);

    function rolesListDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/roleslist/rolesList.html',
            scope: {
            },
            controller: 'rolesListCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
