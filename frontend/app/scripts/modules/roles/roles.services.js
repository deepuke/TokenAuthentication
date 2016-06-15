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
    .factory('rolesApiService', rolesApiService);

    rolesApiService.$inject = ['$q', '$http','API_URL'];

    function rolesApiService($q, $http, API_URL) {

        return {
            getAllRoles : getAllRoles,
            addNewRoles : addNewRoles
        };


        function getAllRoles() {
            var deferred = $q.defer();
            $http.get(API_URL+'/getAllRoles/').success(function(response) {
                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function addNewRoles(role) {
            var deferred = $q.defer();
            $http.post(API_URL+'/addRole/', role).success(function(response) {
                deferred.resolve(response);

            }).error(function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }
}());
