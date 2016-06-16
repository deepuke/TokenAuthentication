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
    .factory('updateUserRoleApiService', updateUserRoleApiService);

    updateUserRoleApiService.$inject = ['$q', '$http', 'API_URL'];

    function updateUserRoleApiService($q, $http, API_URL) {



        return {
            updateUserRole : updateUserRole
        };

        function updateUserRole(user){
            var deferred = $q.defer();
            $http.put(API_URL +'updateUserRoles/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}());
