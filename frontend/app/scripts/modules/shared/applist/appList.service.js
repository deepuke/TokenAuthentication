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
    .factory('appListApiService', appListApiService);

    appListApiService.$inject = ['$q', '$http', '$timeout', 'API_URL'];

    function appListApiService($q, $http, $timeout, API_URL) {

        return {
            getAllApps : getAllApps
        };

        function getAllApps() {
            
        }
    }
}());
