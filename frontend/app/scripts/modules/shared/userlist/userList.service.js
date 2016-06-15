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
    .factory('userListApiService', userListApiService);

    userListApiService.$inject = ['$q', '$http', 'API_URL'];

    function userListApiService($q, $http, API_URL) {
        
        return {

        };
    }
}());
