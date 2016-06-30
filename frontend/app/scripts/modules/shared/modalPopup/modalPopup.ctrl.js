(function() {
    'use strict';

    angular.module('angularNodeTokenAuthApp').controller('modalPopupCtrl', modalPopupController);
    modalPopupController.$inject = ['$scope', '$log', '$rootScope', 'alert', '$http', '$state', 'userApiService'];

    function modalPopupController($scope, $log, $rootScope, alert, $http, $state, userApiService) {

        console.log('userList controller loaded');
        var _self = this;

        this.users = [];
        this.updateUser = updateUser;

        init();

        function init() {
            console.log('Modal popup initialized.');
        }

        _self.open = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'scripts/modules/shared/modalPopup/modalPopup.html',
                controller: 'modalPopupCtrl',
                size: size ? size : 'sm',
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


    }

})();
