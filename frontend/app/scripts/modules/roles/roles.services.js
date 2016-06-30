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
        .factory('rolesApiService', rolesApiService);

    rolesApiService.$inject = ['$q', '$http', 'API_URL'];

    function rolesApiService($q, $http, API_URL) {

        return {
            getAllRoles: getAllRoles,
            addNewRoles: addNewRoles,
            getRoleByRoleID: getRoleByRoleID,
            updateRole: updateRole
        };

        function getRoleByRoleID(role) {
            var deferred = $q.defer();
            $http.post(API_URL + 'getRoleByRoleID/', role).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function getAllRoles() {
            var deferred = $q.defer();
            $http.get(API_URL + 'getAllRoles/').success(function(response) {
                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function addNewRoles(role) {
            var deferred = $q.defer();
            $http.post(API_URL + 'addRole/', role).success(function(response) {
                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function updateRole(role) {
            var deferred = $q.defer();
            $http.put(API_URL + 'updateRole/', role).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}());
