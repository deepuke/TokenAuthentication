(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name angularNodeTokenAuthApp.alert
     * @description
     * # alert
     * Service in the angularNodeTokenAuthApp.
     */
    angular.module('angularNodeTokenAuthApp')
    .service('alert', Alert);

    Alert.$inject = ['$rootScope', '$timeout'];

    function Alert($rootScope, $timeout) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var alertTimeout;
        return function (type, title, message, timeout) {

            $rootScope.alert = {
                hasBeenShown: true,
                show: true,
                type: type,
                message: message,
                title: title
            };

            $timeout.cancel(alertTimeout);

            alertTimeout = $timeout(function () {
                $rootScope.alert.show = false;
            }, timeout || 2000);

        };
    }
}());
