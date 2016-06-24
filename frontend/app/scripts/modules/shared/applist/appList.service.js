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
        .factory('appListApiService', appListApiService);

    appListApiService.$inject = ['$q', '$http', '$timeout', 'API_URL'];

    function appListApiService($q, $http, $timeout, API_URL) {

        return {
            getAllApps: getAllApps,
            changeAppState: changeAppState
        };

        function changeAppState(app) {
            var deferred = $q.defer();
            $http.put(API_URL + 'changeAppState/', app).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        function getAllApps(user) {
            var deferred = $q.defer();
            $http.post(API_URL + 'getAllApps/', user).success(function(response) {
                deferred.resolve(response);
            }).error(function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
}());
