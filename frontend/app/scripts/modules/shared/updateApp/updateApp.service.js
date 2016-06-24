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
    .factory('updateUserAppApiService', updateUserAppApiService);

    updateUserAppApiService.$inject = ['$q', '$http', 'API_URL'];

    function updateUserAppApiService($q, $http, API_URL) {

        return {
            updateUserApp : updateUserApp
        };

        function updateUserApp(user){
            debugger;

            var deferred = $q.defer();
            $http.put(API_URL +'updateUserApps/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}());
