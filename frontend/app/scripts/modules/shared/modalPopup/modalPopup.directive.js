(function(){
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .directive('modalPopup', modalPopupDirective);

    function modalPopupDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'scripts/modules/shared/modalPopup/modalPopup.html',
            scope: {
                user : '='
            },
            controller: 'modalPopupCtrl',
            controllerAs: 'ctrl',
            bindToController: true
        };

        return directive;
    }

})();
