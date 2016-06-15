(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('appList', appListDirective);

    function appListDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/applist/appList.html',
            scope: {
                edit: '=',
                permission: '='
            },
            controller: 'appListCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
