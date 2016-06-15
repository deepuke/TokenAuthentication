(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('menu', menuDirective);

    function menuDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/menu/menu.html',
            scope: {
                
            },
            controller: 'menuCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
