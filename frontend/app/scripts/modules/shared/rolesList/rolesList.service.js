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
            getAllRoles: getAllRoles,
            changeRoleState: changeRoleState
        };

        function getAllRoles() {
            var deferred = $q.defer();
            $http.get(API_URL + 'getAllRoles/').success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function changeRoleState(role) {
            var deferred = $q.defer();
            $http.put(API_URL + 'changeRoleState/', role).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}());
