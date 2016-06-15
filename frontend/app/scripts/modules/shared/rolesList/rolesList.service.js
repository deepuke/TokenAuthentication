(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name angularNodeTokenAuthApp.alert
     * @description
     * # alert
     * Service in the angularNodeTokenAuthApp.
     */
    angular.module('angularNodeTokenAuthApp')
        .factory('rolesListApiService', rolesListApiService);

    rolesListApiService.$inject = ['$q', '$http', '$timeout', 'API_URL'];

    function rolesListApiService($q, $http, $timeout, API_URL) {

        return {
            getAllRoles: getAllRoles
        };

        function getAllRoles() {
            var deferred = $q.defer();
            $http.get(API_URL + '/getusers/').success(function(response) {

                deferred.resolve(response)

            }).error(function(error) {
                deferred.reject(error);

            });

            return deferred.promise;
        }
    }
}());
