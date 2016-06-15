(function(){
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('appDetailsCtrl', appDetailsController);

    appDetailsController.$inject=['$state', '$stateParams'];

    function appDetailsController(state, $stateParams){
        var self = this;
        this.app_id = $stateParams.app_id;
        console.log('appDetailsCtrl loaded');
        console.log($stateParams.app_id);

    }
})();
