(function() {
    'use strict';

    angular
        .module('angularNodeTokenAuthApp')
        .controller('rolesListCtrl', rolesListController);
    rolesListController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'rolesApiService'];

    function rolesListController($scope, $log, $rootScope, alert, $http, $state, rolesApiService) {
        var _self = this;
        this.roles = [];
        this.updateRole = updateRole;
        init()

        function init() {
            rolesApiService.getAllRoles().then(function(response) {
                _self.roles = response.roles;
                console.log(_self.roles);
            }).catch(function(error) {
                console.log(error);
            });
        }

        function updateRole(role_id) {
            console.log(role_id);
        }

    }

})();
