(function(){
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('updateApp', updateAppDirective);

    function updateAppDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/updateApp/updateApp.html',
            scope: {
                user : '='
            },
            controller: 'updateAppCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
